import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  const defaultPropsData = {
    item: {
      count: 0,
      label: "testLabel",
    },
    isOrange: false,
  };

  const getPropsData = (params) => {
    return {
      propsData: {
        ...defaultPropsData,
        ...params,
      },
    };
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets the initial value", () => {
    createComponent(getPropsData());
    expect(wrapper.find("input").element.value).toBe("0");
  });

  it("emits incremented input value when plus button clicked", async () => {
    createComponent(getPropsData());
    const plusBtn = wrapper.find(".counter__button--plus");
    await plusBtn.trigger("click");
    expect(wrapper.emitted("itemCount")[0][1]).toBe(1);
  });

  it("emits decremented input value when minus button clicked", async () => {
    createComponent(getPropsData({ item: { count: 2 } }));
    const minusBtn = wrapper.find(".counter__button--minus");
    await minusBtn.trigger("click");
    expect(wrapper.emitted("itemCount")[0][1]).toBe(1);
  });

  it("plus button is disabled when value is equal to max value", () => {
    createComponent(getPropsData({ item: { count: 3 } }));
    const plusBtn = wrapper.find(".counter__button--plus");
    expect(plusBtn.attributes("disabled")).toBe("disabled");
  });

  it("minus button is disabled when value is equal to min value", () => {
    createComponent(getPropsData({ item: { count: 0 } }));
    const minusBtn = wrapper.find(".counter__button--minus");
    expect(minusBtn.attributes("disabled")).toBe("disabled");
  });

  it("plus button has orange color if prop isOrange is true", () => {
    createComponent(getPropsData({ isOrange: true }));
    expect(wrapper.find(".counter__button--plus").classes()).toContain(
      "counter__button--orange"
    );
  });

  it("plus button has default styles if prop isOrange is false", () => {
    createComponent(getPropsData({ isOrange: false }));
    expect(
      wrapper.find(".counter__button--plus").classes("counter__button--orange")
    ).toBeFalsy();
  });
});
