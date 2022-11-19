import { cloneDeep } from "lodash";

import { mutations } from "@/store/index";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import { SET_ENTITY } from "@/store/mutation-types";
import pizzaData from "@/static/pizza.json";
import { normalizeItems } from "@/common/helpers";

import builder from "@/store/modules/builder";
import cart from "@/store/modules/cart";
import orders from "@/store/modules/orders";
import auth from "@/store/modules/auth";
import addresses from "@/store/modules/addresses";

const initState = () => ({
  notifications: [],
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep({
    builder: builder,
    cart: cart,
    orders: orders,
    auth: auth,
    addresses: addresses,
  });
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }
  return new Vuex.Store({
    state: initState(),
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};

export const setDough = (store) => {
  const items = pizzaData.dough.map((item) => normalizeItems(item));
  store.commit(SET_ENTITY, {
    module: "builder",
    entity: "dough",
    value: items,
  });
  store.commit(
    SET_ENTITY,
    { module: "builder", entity: "currentDough", value: items[0] },
    { root: true }
  );
};

export const setSizes = (store) => {
  const items = pizzaData.sizes.map((item) => item);
  store.commit(SET_ENTITY, {
    module: "builder",
    entity: "sizes",
    value: items,
  });
  store.commit(
    SET_ENTITY,
    { module: "builder", entity: "currentSize", value: items[0] },
    { root: true }
  );
};
