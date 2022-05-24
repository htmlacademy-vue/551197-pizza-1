import pizza from "@/static/pizza.json";

export default {
  namespaced: true,
  state: {
    dough: pizza.dough,
    sauces: pizza.sauces,
    sizes: pizza.sizes,
    ingredientsItems: [],

    currentDough: pizza.dough[0],
    currentSauce: pizza.sauces[0],
    currentSize: pizza.sizes[0],
  },
  getters: {
    labeledIngredients(state) {
      state.ingredientsItems.forEach((el) => {
        el.count = 0;
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
