import builder from "@/store/modules/builder";

import { ADD_ENTITY, SET_ENTITY, UPDATE_ENTITY } from "../mutation-types";

import { normalizeAdditionalItems, createUUIDv4 } from "@/common/helpers.js";

export default {
  namespaced: true,

  state: {
    misc: [],
    pizza: builder.state.pizzaForCart,
    totalPrice: 0,
  },
  getters: {
    getPizza(state) {
      return state.pizza;
    },
    getTotalPrice(state) {
      return state.totalPrice;
    },
    labeledMisc(state) {
      state.misc.map((el) => {
        el.label = el.image.replace(".svg", "").replace("/public/img/", "");
      });
      return state.misc;
    },
    getPriceMisc(state) {
      var sumPriceMisc = 0;
      for (let i = 0; i < state.misc.length; i++) {
        sumPriceMisc = sumPriceMisc + state.misc[i].count * state.misc[i].price;
      }
      return sumPriceMisc;
    },
  },
  mutations: {
    setCountMisc(state, item) {
      state.misc.forEach((el) => {
        if (item.label === el.label) {
          el.count = item.count;
        }
      });
    },
    setCountPizza(state, item) {
      state.pizza.forEach((el) => {
        if (item.label === el.label) {
          el.count = item.count;
        }
      });
    },

    setTotalPrice(state, value) {
      state.totalPrice = value;
    },
  },
  actions: {
    async getMiscData({ commit }) {
      const data = await this.$api.misc.query();
      const items = data.map((item) => normalizeAdditionalItems(item));
      commit(
        SET_ENTITY,
        { module: "cart", entity: "misc", value: items },
        { root: true }
      );
    },

    setPizzaSettingsForCart({ state, commit }, pizza) {
      console.log(pizza.id);
      const mutation = pizza.id ? UPDATE_ENTITY : ADD_ENTITY;

      commit(
        mutation,
        {
          module: "cart",
          entity: "pizza",
          value: pizza.id ? pizza : { ...pizza, id: createUUIDv4() },
        },
        { root: true }
      );
      console.log(state.pizza);
    },
  },
};
