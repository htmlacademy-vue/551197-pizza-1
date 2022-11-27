import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mock";
import Vuex from "vuex";
import Login from "@/views/Login";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    actions = {
      auth: {
        login: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("redirects to index page on close button click", async () => {
    createComponent({ localVue, store, mocks, stubs });
    const close = wrapper.find('[data-test="close"]');
    await close.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("validation mixin has been called on form submit, invalid form isn't submitted", async () => {
    createComponent({ localVue, store, mocks });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    const spyLogin = jest.spyOn(wrapper.vm, "login");
    await wrapper.find("form").trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(spyLogin).not.toHaveBeenCalled();
  });

  it("calls login and redirects to index page if credentials are valid", async () => {
    createComponent({ localVue, store, mocks });
    const emailInput = wrapper.find('input[name="email"]');
    const passInput = wrapper.find('input[name="pass"]');
    const spyLogin = jest.spyOn(wrapper.vm, "login");

    emailInput.element.value = "test@gmail.com";
    await emailInput.trigger("input");
    passInput.element.value = "123456";
    await passInput.trigger("input");

    await wrapper.find("form").trigger("submit");
    expect(spyLogin).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
