import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mock";
import Vuex from "vuex";
import Orders from "@/views/Orders";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Orders", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(Orders, options);
  };

  beforeEach(() => {
    actions = {
      builder: {
        getSaucesData: jest.fn(),
        getDoughData: jest.fn(),
        getSizesData: jest.fn(),
        getIngredientsData: jest.fn(),
      },
      cart: {
        getMiscData: jest.fn(),
      },
      orders: {
        fetchOrders: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls vuex actions to fetch orders and additional items when mounted", async () => {
    createComponent({ localVue, store });
    await wrapper.vm.$nextTick();
    expect(actions.builder.getSaucesData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(actions.builder.getDoughData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(actions.builder.getSizesData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(actions.builder.getIngredientsData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(actions.cart.getMiscData).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(actions.orders.fetchOrders).toHaveBeenCalled();
  });
});
