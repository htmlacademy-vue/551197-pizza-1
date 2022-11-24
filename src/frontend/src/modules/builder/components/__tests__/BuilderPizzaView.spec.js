import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setPizzaName } from "@/store/mock";
import { SET_ENTITY } from "@/store/mutation-types";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

const setIngredients = (store) => {
  store.commit(SET_ENTITY, {
    module: "builder",
    entity: "ingredientsItems",
    value: pizzaData.ingredients.map((ingredient) => {
      return {
        ...ingredient,
        count: 3,
      };
    }),
  });
};

describe("BuilderPizzaView", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders input that displays current pizza name", () => {
    setPizzaName(store);
    createComponent({ localVue, store });
    expect(wrapper.find("input").element.value).toBe("testPizzaName");
  });

  it("sets pizza name when typing in input", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "setCurrentPizzaName");
    let input = wrapper.find("input");
    input.element.value = "test";
    await input.trigger("change");
    expect(spyOnAction).toHaveBeenCalled();
  });

  it("renders ingredients if there are selected ingredients", () => {
    setIngredients(store);
    createComponent({ localVue, store });
    const ingredient = wrapper.find(".pizza__filling");
    expect(ingredient.exists()).toBeTruthy();
  });
});
