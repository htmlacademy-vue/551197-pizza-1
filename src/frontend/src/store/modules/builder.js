import { SET_ENTITY } from "../mutation-types";
import { EDIT_PIZZA } from "../mutation-types";
import { RESET_BUILDER_STATE } from "../mutation-types";

import { normalizeItems, normalizeIngredientsItems } from "@/common/helpers.js";

const isEmpty = (obj) => {
  for (let key in obj) {
    return false;
  }
  return true;
};

const initialState = () => ({
  id: null,
  namePizza: "",
  dough: [],
  sauces: [],
  sizes: [],
  ingredientsItems: [],
  currentDough: {},
  currentSauce: {},
  currentSize: {},
  pizzaPrice: 0,

  pizzaForCart: [],
});

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    getPrice(state) {
      var sumPrice = 0;
      for (let i = 0; i < state.ingredientsItems.length; i++) {
        sumPrice =
          sumPrice +
          state.ingredientsItems[i].count * state.ingredientsItems[i].price;
      }
      return (
        (state.currentDough.price + state.currentSauce.price + sumPrice) *
        state.currentSize.multiplier
      );
    },
    labeledIngredients(state) {
      state.ingredientsItems.forEach((el) => {
        el.label = el.image
          .replace(".svg", "")
          .replace("/public/img/filling/", "");
      });
      return state.ingredientsItems;
    },
    labeledDough(state) {
      state.dough.forEach((el) => {
        if (el.name == "Толстое") {
          el.label = "big";
        }
        if (el.name == "Тонкое") {
          el.label = "small";
        }
      });
      return state.dough;
    },
    labeledlSauces(state) {
      state.sauces.forEach((el) => {
        if (el.name == "Томатный") {
          el.label = "tomato";
        }
        if (el.name == "Сливочный") {
          el.label = "creamy";
        }
      });
      return state.sauces;
    },
  },
  mutations: {
    setCountIngredients(state, item) {
      state.ingredientsItems.map((el) => {
        if (item.label === el.label) {
          el.count = item.count;
        }
      });
    },

    setCurrentDough(state, value) {
      state.currentDough = value;
    },

    setCurrentSauce(state, value) {
      state.currentSauce = value;
    },
    setCurrentSize(state, value) {
      state.currentSize = value;
    },
    setCurrentPizzaName(state, value) {
      state.namePizza = value;
    },
    [RESET_BUILDER_STATE](state) {
      Object.assign(state, initialState());
    },

    [EDIT_PIZZA](state, newState) {
      Object.assign(state, newState);
    },
  },
  actions: {
    resetBuilderState({ commit }) {
      commit(RESET_BUILDER_STATE);
    },
    async getDoughData({ state, commit }) {
      const data = await this.$api.builder.fetchDough();
      const items = data.map((item) => normalizeItems(item));

      commit(
        SET_ENTITY,
        { module: "builder", entity: "dough", value: items },
        { root: true }
      );
      if (isEmpty(state.currentDough)) {
        commit(
          SET_ENTITY,
          { module: "builder", entity: "currentDough", value: items[0] },
          { root: true }
        );
      }
    },
    async getSaucesData({ state, commit }) {
      const data = await this.$api.builder.fetchSauces();
      const items = data.map((item) => normalizeItems(item));

      commit(
        SET_ENTITY,
        { module: "builder", entity: "sauces", value: items },
        { root: true }
      );
      if (isEmpty(state.currentSauce)) {
        commit(
          SET_ENTITY,
          { module: "builder", entity: "currentSauce", value: items[0] },
          { root: true }
        );
      }
    },
    async getSizesData({ state, commit }) {
      const data = await this.$api.builder.fetchSizes();

      commit(
        SET_ENTITY,
        { module: "builder", entity: "sizes", value: data },
        { root: true }
      );
      if (isEmpty(state.currentSize)) {
        commit(
          SET_ENTITY,
          { module: "builder", entity: "currentSize", value: data[0] },
          { root: true }
        );
      }
    },

    async getIngredientsData({ commit }) {
      const data = await this.$api.builder.fetchIngredients();
      const items = data.map((item) => normalizeIngredientsItems(item));
      commit(
        SET_ENTITY,
        { module: "builder", entity: "ingredientsItems", value: items },
        { root: true }
      );
    },

    editPizza({ state, commit }, pizza) {
      const newState = {
        namePizza: pizza.label,
        currentDough: pizza.dough,
        currentSauce: pizza.sauce,
        currentSize: pizza.size,
        pizzaPrice: pizza.price,
        ingredientsItems: calcIngredients(
          state.ingredientsItems,
          pizza.ingredients
        ),
        id: pizza.id,
      };
      commit(EDIT_PIZZA, newState);
    },
  },
};

const calcIngredients = (ingredients, currentIngredients) => {
  const arr = ingredients.map((y) =>
    Object.assign(
      y,
      currentIngredients.find((x) => x.id === y.id)
    )
  );
  return arr;
};
