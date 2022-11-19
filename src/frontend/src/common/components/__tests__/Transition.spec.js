import { shallowMount } from "@vue/test-utils";
import Transition from "@/common/components/Transition";

describe("Transition", () => {
  const slots = { default: "content" };
  const propsData = {
    name: "fade",
    appear: false,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Transition, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ slots, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots, propsData });
    expect(wrapper.html()).toContain(slots.default);
  });
});
