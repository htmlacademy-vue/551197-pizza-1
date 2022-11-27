import { cloneDeep } from "lodash";

import { mutations } from "@/store/index";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import { SET_ENTITY } from "@/store/mutation-types";
import pizzaData from "@/static/pizza.json";
import {
  normalizeItems,
  normalizeIngredientsItems,
  normalizeAdditionalItems,
} from "@/common/helpers";

import builder from "@/store/modules/builder";
import cart from "@/store/modules/cart";
import orders from "@/store/modules/orders";
import auth from "@/store/modules/auth";
import addresses from "@/store/modules/addresses";

import user from "@/static/user";
import miscData from "@/static/misc.json";

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

export const setSauces = (store) => {
  const items = pizzaData.sauces.map((item) => normalizeItems(item));

  store.commit(SET_ENTITY, {
    module: "builder",
    entity: "sauces",
    value: items,
  });
  store.commit(
    SET_ENTITY,
    { module: "builder", entity: "currentSauce", value: items[0] },
    { root: true }
  );
};

export const setIngredients = (store) => {
  const items = pizzaData.ingredients.map((item) =>
    normalizeIngredientsItems(item)
  );
  store.commit(
    SET_ENTITY,
    { module: "builder", entity: "ingredientsItems", value: items },
    { root: true }
  );
};

export const setPizzaName = (store) => {
  store.commit(SET_ENTITY, {
    module: "builder",
    entity: "namePizza",
    value: "testPizzaName",
  });
};

export const setPizzaItems = (store) => {
  store.commit(SET_ENTITY, {
    module: "cart",
    entity: "pizza",
    value: [
      {
        id: "1",
        name: "testPizzaName",
        dough: 1,
        sauce: 1,
        size: 1,
        ingredients: [
          { id: 3, count: 3 },
          { id: 5, count: 5 },
        ],
        price: 545,
        quantity: 1,
      },
    ],
  });
};

export const setAddresses = (store) => {
  store.commit(SET_ENTITY, {
    module: "addresses",
    entity: "addresses",
    value: [
      {
        id: 1,
        name: "Школа",
        userId: "1",
        street: "Школьная",
        building: "1",
        flat: "1",
        comment: "Не звонить",
      },
    ],
  });
};
export const setUser = (store) => {
  store.commit(SET_ENTITY, {
    module: "auth",
    entity: "user",
    value: user,
  });
};

export const setAdditionalItems = (store) => {
  store.commit(SET_ENTITY, {
    module: "cart",
    entity: "misc",
    value: miscData.map((item) => normalizeAdditionalItems(item)),
  });
};

export const setOrders = (store) => {
  store.commit(SET_ENTITY, {
    module: "orders",
    entity: "orders",
    value: [
      {
        id: 1,
        userId: "1",
        phone: "+777 777 777",
        addressId: 1,
        orderAddress: {
          id: 1,
          name: "Школа",
          userId: "1",
          street: "Школьная",
          building: "1",
          flat: "1",
          comment: "",
        },
        orderMisc: [{ id: 1, miscId: 1, orderId: 1, quantity: 0 }],
        orderPizzas: [
          {
            id: 1,
            name: "testPizzaТame",
            doughId: 1,
            sauceId: 1,
            sizeId: 1,
            ingredients: [
              { id: 1, ingredientId: 1, pizzaId: 1, quantity: 1 },
              { id: 2, ingredientId: 2, pizzaId: 1, quantity: 1 },
            ],
            quantity: 1,
            orderId: 1,
          },
        ],
      },
    ],
  });
};
