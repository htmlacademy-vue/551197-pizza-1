import { shallowMount } from "@vue/test-utils";
import SelectorItem from "@/common/components/SelectorItem";

describe("AppInput", () => {
  const propsData = {
    name: "testName",
    classItem: "testClass",
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(SelectorItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("get item class", () => {
    createComponent({ propsData });
    expect(
      wrapper.find("span").classes("filling--" + propsData.classItem)
    ).toBe(true);
  });

  it("get name props", () => {
    createComponent({ propsData });
    expect(wrapper.props().name).toBe("testName");
  });
});
