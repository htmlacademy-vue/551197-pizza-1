import Vue from "vue";
import Vuex from "vuex";
import builder from "@/store/modules/builder";
import cart from "./modules/cart";
import orders from "./modules/orders";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    builder: builder,
    cart: cart,
    orders: orders,
    auth: auth,
  },
});
