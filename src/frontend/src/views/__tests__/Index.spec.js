import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, setIngredients } from "@/store/mock";
import Index from "@/views/Index";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Index", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    actions = {
      builder: {
        getDoughData: jest.fn(),
        getSaucesData: jest.fn(),
      },
      cart: {
        getMiscData: jest.fn(),
      },
    };

    store = generateMockStore(actions);
    setIngredients(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
  });

  it("when dropped, it increases the amount of the ingredient on the pizza", async () => {
    createComponent({ localVue, store });
    const testLabel = "salmon";
    const spyOnAction = jest.spyOn(wrapper.vm, "dropIngredients");
    wrapper.vm.dropIngredients(testLabel);
    expect(spyOnAction).toHaveBeenCalledWith(testLabel);
    expect(
      store.state.builder.ingredientsItems.find(
        (item) => item.label === testLabel
      ).count == 1
    );
  });
});
