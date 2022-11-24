import { createLocalVue, mount } from "@vue/test-utils";
import OrdersItem from "@/modules/orders/OrdersItem";
import {
  generateMockStore,
  setDough,
  setSauces,
  setSizes,
  setIngredients,
  setAdditionalItems,
} from "@/store/mock";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("OrdersItem", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const propsData = {
    order: {
      id: 1,
      phone: "123456",
      userId: "2abe11cc-d563-46cc-b1ab-0c9df9f5ac52",
      addressId: 1,
      orderPizzas: [
        {
          id: 1,
          name: "Сливочный лосось",
          quantity: 1,
          sauceId: 2,
          doughId: 2,
          sizeId: 2,
          orderId: 1,
          ingredients: [{ id: 1, quantity: 3, pizzaId: 1, ingredientId: 4 }],
        },
      ],
      orderMisc: [
        { id: 1, quantity: 1, orderId: 1, miscId: 1 },
        { id: 2, quantity: 1, orderId: 1, miscId: 2 },
        { id: 3, quantity: 1, orderId: 1, miscId: 3 },
      ],
      orderAddress: {
        id: 1,
        name: "ул.Улица, д.73, кв.",
        street: "Улица",
        building: "73",
        flat: "",
        comment: "",
        userId: "2abe11cc-d563-46cc-b1ab-0c9df9f5ac52",
      },
    },
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(OrdersItem, options);
  };

  beforeEach(() => {
    actions = {
      cart: {
        setPizzaSettingsForCart: jest.fn(),
        changeMiscItemQuantity: jest.fn(),
      },
      orders: {
        deleteOrder: jest.fn(),
        createOrder: jest.fn(),
      },
    };

    store = generateMockStore(actions);
    setDough(store);
    setSizes(store);
    setSauces(store);
    setIngredients(store);
    setAdditionalItems(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, mocks, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("deletes order on delete button click", async () => {
    createComponent({ localVue, store, mocks, propsData });
    const deleteBtn = wrapper.find('[data-test="delete-btn"]');
    await deleteBtn.trigger("submit");
    expect(actions.orders.deleteOrder).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      propsData.order.id
    );
  });

  it("adds items to cart on repeat button click", async () => {
    createComponent({ localVue, store, mocks, propsData });
    const repeatBtn = wrapper.find('[data-test="repeat-btn"]');
    await repeatBtn.trigger("click");
    expect(actions.cart.setPizzaSettingsForCart).toHaveBeenCalled();
    expect(actions.cart.changeMiscItemQuantity).toHaveBeenCalled();
  });

  it("redirects to Cart page on repeat button click", async () => {
    createComponent({ localVue, store, mocks, propsData });
    const repeatBtn = wrapper.find('[data-test="repeat-btn"]');
    await repeatBtn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({
      name: "Cart",
      params: { addressId: 1 },
    });
  });
});
