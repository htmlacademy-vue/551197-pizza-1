import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  setUser,
  setPizzaItems,
  setAdditionalItems,
} from "@/store/mock";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayoutHeader", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      auth: {
        logout: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders Cart page link that displays total price", async () => {
    createComponent({ localVue, store, mocks, stubs });
    const cartLink = wrapper.find('[data-test="cart-link"]');
    expect(cartLink.exists()).toBeTruthy();
    expect(cartLink.html()).toContain(
      `${store.getters["cart/getTotalPrice"]} ₽`
    );
  });

  it("renders login link if user isn't authenticated", async () => {
    createComponent({ localVue, store, mocks, stubs });
    const loginLink = wrapper.find('[data-test="login-link"]');
    expect(loginLink.exists()).toBeTruthy();
  });

  it("renders logout link if user is authenticated", async () => {
    setUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const logoutLink = wrapper.find('[data-test="logout-link"]');
    expect(logoutLink.exists()).toBeTruthy();
  });
});
