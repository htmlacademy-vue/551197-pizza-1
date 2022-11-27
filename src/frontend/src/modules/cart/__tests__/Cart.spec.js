import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, setPizzaItems } from "@/store/mock";
import Vuex from "vuex";
import Cart from "@/modules/cart/Cart";

const localVue = createLocalVue();
localVue.use(Vuex);

const testAddress = {
  id: null,
  street: "Школьная",
  building: "1",
  flat: "1",
  comment: "",
};

describe("Cart", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $route: {
      params: { addressId: null },
    },
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      orders: {
        createOrder: jest.fn(),
      },
      cart: {
        editPizza: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("displays component for empty if cart is empty", () => {
    createComponent({ localVue, store, mocks });
    const message = wrapper.find('[data-test="cart-empty"]');
    const cartItems = wrapper.find('[data-test="cart-items"]');
    expect(message.exists()).toBeTruthy();
    expect(cartItems.exists()).toBeFalsy();
  });

  it("displays cart items and cart footer if cart isn't empty", () => {
    setPizzaItems(store);
    createComponent({ localVue, store, mocks });
    const cartItems = wrapper.find('[data-test="cart-items"]');
    const cartFooter = wrapper.find('[data-test="cart-footer"]');
    expect(cartItems.exists()).toBeTruthy();
    expect(cartFooter.exists()).toBeTruthy();
  });

  it("makes new order and displays success popup", async () => {
    setPizzaItems(store);
    createComponent({ localVue, store, mocks });
    const addressForm = wrapper.find('[data-test="address-form"]');
    addressForm.vm.$emit("setAddress", { phone: "", address: testAddress });
    await wrapper.vm.$nextTick();
    await wrapper.find('[data-test="order-form"]').trigger("submit");
    expect(actions.orders.createOrder).toHaveBeenCalled();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test="success-popup"]').exists()).toBeTruthy();
  });

  it("success popup isn't displayed after it has been closed", async () => {
    setPizzaItems(store);
    createComponent({ localVue, store, mocks });
    const addressForm = wrapper.find('[data-test="address-form"]');
    addressForm.vm.$emit("setAddress", { phone: "", address: testAddress });
    await wrapper.vm.$nextTick();
    await wrapper.find('[data-test="order-form"]').trigger("submit");
    await wrapper.vm.$nextTick();
    const successPopup = wrapper.find('[data-test="success-popup"]');
    successPopup.vm.$emit("close");
    await wrapper.vm.$nextTick();
    expect(successPopup.exists()).toBeFalsy();
  });

  it("changes pizza on click to edit", async () => {
    setPizzaItems(store);
    createComponent({ localVue, store, mocks });
    const editButton = wrapper.find('[data-test="cart-edit-button"]');
    const spyOnAction = jest.spyOn(wrapper.vm, "editPizza");
    await editButton.trigger("click");
    expect(spyOnAction).toHaveBeenCalled();
  });
});
