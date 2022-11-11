import {
  ADD_ENTITY,
  DELETE_ENTITY,
  SET_ENTITY,
  UPDATE_ENTITY,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    addresses: [],
  },

  getters: {},

  actions: {
    async getAddresses({ commit }) {
      const data = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        { module: "addresses", entity: "addresses", value: data },
        { root: true }
      );
    },
    async deleteAddress({ commit }, id) {
      const data = await this.$api.addresses.delete(id);
      commit(
        DELETE_ENTITY,
        {
          module: "addresses",
          entity: "addresses",
          value: data,
        },
        { root: true }
      );
    },

    async editAddress({ commit }, address) {
      await this.$api.addresses.put(address);
      commit(
        UPDATE_ENTITY,
        {
          module: "addresses",
          entity: "addresses",
          value: address,
        },
        { root: true }
      );
    },

    async addAddress({ commit }, address) {
      const data = await this.$api.addresses.post(address);

      commit(
        ADD_ENTITY,
        {
          module: "addresses",
          entity: "addresses",
          value: data,
        },
        { root: true }
      );
    },
  },
};
