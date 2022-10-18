// функция, которую мы используем для создания id-нотификаций
import { uniqueId } from "lodash";

import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "../plugins/vuexPlugins";

// импорт типов мутаций
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutation-types";
// константа для срока жизни нотификаций
import { MESSAGE_LIVE_TIME } from "@/common/constants.js";

import builder from "@/store/modules/builder";
import cart from "@/store/modules/cart";
import orders from "@/store/modules/orders";
import auth from "@/store/modules/auth";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
  userData: null,
});

const actions = {
  async fetchUser({ commit }) {
    const user = await this.$api.user.query();
    //вызываем мутацию для обновления пользователя в хранилище
    //module - в состояние какого модуля произвести изменения
    //entity - какую именно сущность в состоянии нужно изменить
    //value - данные, которые мы получили с сервера (пока из json-файла)

    //при получении данных в action мы будем часто сохранять их в состояние хранилища
    //для того чтобы не дублировать одинаковые мутации, мы сделаем
    //мутации в корневом модуле и будем обращаться к ним из разных модулей
    commit(SET_ENTITY, { module: null, entity: "userData", value: user });
  },
  //ИНИЦИАЛИЗАЦИЯ ПЕРВИЧНЫХ ДАННЫХ ПРИЛОЖЕНИЯ

  async init({ dispatch }) {
    //действие из этого же модуля ^^
    dispatch("fetchUser");
  },

  //РАБОТА С НОТИФИКАЦИЯМИ

  // { ...notification } — нотификация для отображения.
  //Все нотификации мы будем сохранять в список нотификаций
  //в состоянии хранилища. Присвоим нотификации уникальный id.
  //uniqueId — вспомогательная функция из lodash, единственная
  //задача которой — генерировать уникальные id (1, 2, 3...)
  async createNotification({ commit }, { ...notification }) {
    //объект уникальной нотификации
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    //сохраняем в состоянии хранилища
    commit(ADD_NOTIFICATION, uniqueNotification);
    //срок отображенния нотификации
    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

const mutations = {
  [ADD_NOTIFICATION](state, notification) {
    // Добавление нотификации в список
    state.notifications = [...state.notifications, notification];
  },

  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      // Удаление нотификации из списка по id
      (notification) => notification.id !== id
    );
  },
  //присвоение сущности
  //module - в состояние какого модуля произвести изменения
  //entity - какую именно сущность в состоянии нужно изменить
  //value - данные, которые мы получили с сервера (пока из json-файла)
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
  //добавление
  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },
  //удаление
  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },
  //обновление
  //обновляем сущность, только если она есть в списке
  [UPDATE_ENTITY](state, { module, entity, value }) {
    // делаем для указанного модуля
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );

      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    }
    // делаем для корневого модуля
    else {
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
  },
});
