import Vue from "vue";
import misc from "@/static/misc.json";
import builder from "@/store/modules/builder";

export default {
  namespaced: true,
  state: {
    misc: misc,
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
      state.misc.forEach((el) => {
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
    setNewMisc(state) {
      state.misc.forEach((el) => {
        Vue.set(el, "count", 0);
        Vue.set(
          el,
          "label",
          el.image.replace(".svg", "").replace("/public/img/", "")
        );
      });
      return state.misc;
    },
    setCountMisc(state, item) {
      state.misc.map((el) => {
        if (item.label === el.label) {
          el.count = item.count;
        }
      });
    },
    setCountPizza(state, item) {
      state.pizza.map((el) => {
        if (item.label === el.label) {
          el.count = item.count;
        }
      });
    },

    setTotalPrice(state, value) {
      state.totalPrice = value;
    },
  },
  actions: {},
};
