import { SET_ENTITY } from "../mutation-types";
import { DELETE_ENTITY } from "../mutation-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {},
  mutations: {},
  actions: {
    async fetchOrders({ commit }) {
      const orders = await this.$api.orders.query();

      commit(
        SET_ENTITY,
        { module: "orders", entity: "orders", value: orders },
        { root: true }
      );
    },

    async createOrder(context, order) {
      await this.$api.orders.post(order);
    },

    async deleteOrder({ commit }, id) {
      const orders = await this.$api.orders.delete(id);

      commit(
        DELETE_ENTITY,
        { module: "orders", entity: "orders", value: orders },
        { root: true }
      );
    },
  },
};
