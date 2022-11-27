import { shallowMount } from "@vue/test-utils";
import AppInput from "@/common/components/AppInput";

describe("AppInput", () => {
  const propsData = {
    value: "testValue",
    name: "testName",
    type: "text",
    placeholder: "Test",
    errorText: "Error",
    required: true,
    disabled: false,
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets the initial model value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("emits input event when typing", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("emits the current input value when typing", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    input.element.value = "test";
    await input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual("test");
  });

  it("emits change event with the current input value", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    input.element.value = "test";
    await input.trigger("change");
    expect(wrapper.emitted().change[0][0]).toEqual("test");
  });

  it("input name is prop name", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  it("input type is prop type", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe(propsData.type);
  });

  it("input placeholder is prop placeholder", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe(propsData.placeholder);
  });

  it("has error class if error text has been passed in prop", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("class")).toContain("text-field__input--error");
  });

  it("has error message if error text has been passed in prop", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain("span");
  });

  it("does not have error message if error text hasn't been passed in prop", () => {
    propsData.errorText = "";
    createComponent({ propsData });
    expect(wrapper.html()).not.toContain("span");
  });

  it("isn't disabled if prop disabled is false", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("disabled")).toBeUndefined();
  });

  it("is disabled if prop disabled is true", () => {
    propsData.disabled = true;
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("disabled")).toBe("disabled");
  });
});
