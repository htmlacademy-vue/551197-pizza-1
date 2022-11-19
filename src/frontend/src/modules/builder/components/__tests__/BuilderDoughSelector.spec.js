import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setDough } from "@/store/mock";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setDough(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders dough name and description for dough item", () => {
    createComponent({ localVue, store });
    expect(wrapper.html()).toContain("Тонкое");
    expect(wrapper.html()).toContain("Из твердых сортов пшеницы");
  });

  it("changes selected dough on dough selector click", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "setCurrentDough");
    const selector = wrapper.find('input[name="dough"]');
    await selector.trigger("click");
    expect(spyOnAction).toHaveBeenCalledWith({
      description: "Из твердых сортов пшеницы",
      id: 1,
      image: "/public/img/dough-light.svg",
      label: "small",
      name: "Тонкое",
      price: 300,
    });
  });
});
