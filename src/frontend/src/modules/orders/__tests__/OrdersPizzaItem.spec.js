import { shallowMount, createLocalVue } from "@vue/test-utils";
import {
  generateMockStore,
  setDough,
  setSizes,
  setSauces,
  setIngredients,
} from "@/store/mock";
import Vuex from "vuex";
import OrdersPizzaItem from "@/modules/orders/OrdersPizzaItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("OrdersPizzaItem", () => {
  const propsData = {
    pizza: {
      id: 1,
      name: "Пицца",
      quantity: 1,
      sauceId: 2,
      doughId: 2,
      sizeId: 2,
      orderId: 1,
      ingredients: [{ id: 1, quantity: 3, pizzaId: 1, ingredientId: 4 }],
      price: 1000,
    },
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(OrdersPizzaItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setDough(store);
    setSizes(store);
    setSauces(store);
    setIngredients(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out pizza name", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("Пицца");
  });

  it("renders out correct size and dough description", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("32 см, на толстом тесте");
  });

  it("renders out correct sauce description", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("Соус: сливочный");
  });

  it("renders out correct ingredients list", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("Начинка: ветчина");
  });
});
