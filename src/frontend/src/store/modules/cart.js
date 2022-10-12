import Vue from "vue";
import misc from "@/static/misc.json";
import builder from "@/store/modules/builder";

export default {
  namespaced: true,
  state: {
    misc: misc,
    pizzas: builder.state.pizzaForCart,
  },
  getters: {
    getPizza(state) {
      console.log(state.pizzas);
      return state.pizzas;
    },
    labeledMisc(state) {
      state.misc.forEach((el) => {
        el.label = el.image.replace(".svg", "").replace("/public/img/", "");
      });
      return state.misc;
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
      state.pizzas.map((el) => {
        if (item.label === el.label) {
          el.count = item.count;
        }
      });
    },
  },
  actions: {},
};
