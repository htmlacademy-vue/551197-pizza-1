import Vue from "vue";
import pizza from "@/static/pizza.json";

export default {
  namespaced: true,
  state: {
    dough: pizza.dough,
    sauces: pizza.sauces,
    sizes: pizza.sizes,
    ingredientsItems: pizza.ingredients,
    currentDough: pizza.dough[0],
    currentSauce: pizza.sauces[0],
    currentSize: pizza.sizes[0],
    pizzaPrice: 0,

    pizzaForCart: [
      {
        label: "Капричоза",
        description:
          "30 см, на тонком тесте Соус: томатный Начинка: грибы, лук, ветчина, пармезан, ананас",
        price: 200,
        count: 1,
      },
      {
        label: "Любимая пицца",
        description:
          "30 см, на толстом тесте Соус: томатный Начинка: помидоры, салями, сыр",
        price: 400,
        count: 1,
      },
    ],
  },
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
    setNewIngredients(state) {
      state.ingredientsItems.forEach((el) => {
        Vue.set(el, "count", 0);
        Vue.set(
          el,
          "label",
          el.image.replace(".svg", "").replace("/public/img/filling/", "")
        );
      });
      return state.ingredientsItems;
    },

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
  },
  actions: {},
};
