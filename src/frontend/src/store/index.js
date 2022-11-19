import { uniqueId } from "lodash";

import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "../plugins/vuexPlugins";

import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutation-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants.js";

import builder from "@/store/modules/builder";
import cart from "@/store/modules/cart";
import orders from "@/store/modules/orders";
import auth from "@/store/modules/auth";
import addresses from "@/store/modules/addresses";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
  userData: null,
});

const actions = {
  async fetchUser({ commit }) {
    const user = await this.$api.user.query();
    commit(SET_ENTITY, { module: null, entity: "userData", value: user });
  },

  async init({ dispatch }) {
    dispatch("fetchUser");
  },

  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

export const mutations = {
  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },

  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
  },
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },
  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );

      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);

      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules: {
    builder: builder,
    cart: cart,
    orders: orders,
    auth: auth,
    addresses: addresses,
  },
});
