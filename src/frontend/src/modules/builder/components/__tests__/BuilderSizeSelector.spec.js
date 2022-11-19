import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setSizes } from "@/store/mock";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setSizes(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders size name for size item", async () => {
    createComponent({ localVue, store });
    expect(wrapper.html()).toContain("23 см");
  });

  it("changes selected size on on size selector click", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "setCurrentSize");
    const selector = wrapper.find('input[name="diameter"]');
    await selector.trigger("click");
    expect(spyOnMutation).toHaveBeenCalledWith({
      id: 1,
      image: "/public/img/diameter.svg",
      multiplier: 1,
      name: "23 см",
    });
  });
});
