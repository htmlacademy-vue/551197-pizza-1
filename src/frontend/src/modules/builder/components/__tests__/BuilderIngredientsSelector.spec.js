import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setSauces, setIngredients } from "@/store/mock";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setSauces(store);
    setIngredients(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders sauce name for sauce selector", () => {
    createComponent({ localVue, store });
    const sauceSelector = wrapper.find('[data-test="sauce"]');
    expect(sauceSelector.html()).toContain("Томатный");
  });

  it("renders ingredient name for ingredient item", () => {
    createComponent({ localVue, store });
    const ingredientItem = wrapper.find('[data-test="ingredients-item"]');
    expect(ingredientItem.html()).toContain("Грибы");
  });

  it("changes ingredient quantity on ingredient counter click", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "setCountIngredients");
    const counter = wrapper.find('[data-test="ingredients-counter"]');
    const inputValue = parseInt(counter.find("input").element.value);
    await counter.vm.$emit("itemCount", inputValue + 1);
    expect(spyOnAction).toHaveBeenCalled();
  });

  it("changes selected sauce on sauce selector click", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "setCurrentSauce");
    const selector = wrapper.find('input[name="sauce"]');
    await selector.trigger("change");
    expect(spyOnAction).toHaveBeenCalledWith({
      id: 1,
      label: "tomato",
      name: "Томатный",
      price: 50,
    });
  });
});
