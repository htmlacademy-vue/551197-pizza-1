import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setAddresses, setUser } from "@/store/mock";
import CartOrderForm from "@/modules/cart/CartOrderForm";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartOrderForm", () => {
  const propsData = {
    reorderAddressId: null,
    validations: {
      building: {
        error: "",
        rules: ["required"],
      },
      street: {
        error: "",
        rules: ["required"],
      },
    },
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(CartOrderForm, options);
  };

  beforeEach(() => {
    actions = {
      addresses: {
        getAddresses: jest.fn(),
        resetAddressesState: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("fetch addresses if user is authenticated", async () => {
    setUser(store);
    createComponent({ localVue, store, propsData });
    expect(actions.addresses.getAddresses).toHaveBeenCalled();
  });

  it("form doesn't contain user generated addresses if user isn't authenticated", async () => {
    createComponent({ localVue, store, propsData });
    const userAddress = wrapper.find('[data-test="user-address"]');
    expect(userAddress.exists()).toBeFalsy();
  });

  it("form contains user generated addresses if they exist and user is authenticated", async () => {
    setUser(store);
    setAddresses(store);
    createComponent({ localVue, store, propsData });
    const userAddress = wrapper.find('[data-test="user-address"]');
    expect(userAddress.exists()).toBeTruthy();
    expect(userAddress.html()).toContain("Школа");
  });

  it("inputs for address aren't displayed in form by default", async () => {
    setUser(store);
    setAddresses(store);
    createComponent({ localVue, store, propsData });
    const streetInput = wrapper.find('input[name="street"]');
    expect(streetInput.exists()).toBeFalsy();
  });

  it("inputs for address display if default select value was changed to new address or user address", async () => {
    setUser(store);
    setAddresses(store);
    createComponent({ localVue, store, propsData });
    const select = wrapper.find("select");
    select.element.value = "newAddress";
    await select.trigger("change");
    await wrapper.vm.$nextTick();
    const streetInput = wrapper.find('input[name="street"]');
    expect(streetInput.exists()).toBeTruthy();
    expect(streetInput.element.value).toBe("");
  });

  it("form inputs change emits setAddress event with the current address value", async () => {
    createComponent({ localVue, store, propsData });
    const phoneInput = wrapper.find('input[name="phone"]');
    await phoneInput.trigger("change");
    expect(wrapper.emitted("setAddress")[0][0]).toEqual({
      phone: "",
      address: null,
    });
  });
});
