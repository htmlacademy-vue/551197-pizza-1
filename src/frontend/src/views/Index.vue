<template>
  <div class="app">
    <app-layout></app-layout>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :dough="dough"
            :currentDough="currentDough"
            @changeDough="changeDough"
          />

          <BuilderSizeSelector
            :sizes="sizes"
            :currentSize="currentSize"
            @changeSize="changeSize"
          />

          <BuilderIngredientsSelector
            :sauces="sauces"
            :currentSauce="currentSauce"
            :ingredientsItems="ingredientsItems"
            @changeCount="changeCount"
            @changeSauce="changeSauce"
          />

          <BuilderPizzaView
            :currentDough="currentDough"
            :currentSauce="currentSauce"
            :currentSize="currentSize"
            :ingredientsItems="ingredientsItems"
            :prices="prices"
            @dropIngredients="dropIngredients"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import BuilderDoughSelector from "./modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "./modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "./modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "./modules/builder/components/BuilderPizzaView";
import misc from "./static/misc.json";
import pizza from "./static/pizza.json";
import user from "./static/user.json";

import AppLayout from "/src/layouts/AppLayout";

export default {
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    AppLayout,
  },
  data() {
    return {
      misc: misc,
      user: user,

      ingredientsItems: this.addLabelIngredients(pizza.ingredients),
      dough: pizza.dough,
      sauces: pizza.sauces,
      sizes: pizza.sizes,

      currentDough: pizza.dough[1],
      currentSauce: pizza.sauces[1],
      currentSize: pizza.sizes[2],

      prices: [],
    };
  },
  created() {
    var prePrices = {};
    for (let i = 0; i < pizza.ingredients.length; i++) {
      prePrices = {
        name: pizza.ingredients[i].label,
        price: pizza.ingredients[i].price,
      };
      this.prices.push(prePrices);
    }
    console.log(this.prices);

    for (let i = 0; i < this.ingredientsItems.length; i++) {
      this.$set(this.ingredientsItems[i], "count", 0);
    }
    if (this.currentDough.name == "Тонкое") {
      this.currentDough = { ...this.currentDough, label: "small" };
    } else if (this.currentDough.name == "Толстое") {
      this.currentDough = { ...this.currentDough, label: "big" };
    }
    if (this.currentSauce.name == "Томатный") {
      this.currentSauce = { ...this.currentSauce, label: "tomato" };
    } else if (this.currentSauce.name == "Сливочный") {
      this.currentSauce = { ...this.currentSauce, label: "creamy" };
    }
  },
  methods: {
    dropIngredients(drop) {
      this.ingredientsItems.forEach((el) => {
        if (el.label == drop) {
          el.count++;
        }
      });
    },
    changeCount(item) {
      console.log(item);
    },
    changeSize(size) {
      this.currentSize = size;
    },
    changeDough(dough) {
      if (dough.name == "Тонкое") {
        dough.label = "small";
      } else if (dough.name == "Толстое") {
        dough.label = "big";
      }
      this.currentDough.label = dough.label;
    },
    changeSauce(sauce) {
      if (sauce.name == "Томатный") {
        sauce.label = "tomato";
      } else if (sauce.name == "Сливочный") {
        sauce.label = "creamy";
      }
      this.currentSauce.label = sauce.label;
    },
    addLabelIngredients(ingredients) {
      ingredients.forEach((el) => {
        el.label = el.image
          .replace(".svg", "")
          .replace("/public/img/filling/", "");
      });
      return ingredients;
    },
    getSizePizza(multiplier) {
      switch (multiplier) {
        case 1:
          return "diameter__input--small";
        case 2:
          return "diameter__input--normal";
        case 3:
          return "diameter__input--big";
        default:
          alert("error get size");
      }
    },
    getDoughPizza(name) {
      switch (name) {
        case "Тонкое":
          return "dough__input--light";
        case "Толстое":
          return "dough__input--large";
        default:
          alert("error get dough");
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
@import "@/assets/scss/fonts";
@import "@/assets/scss/scaffolding";
@import "@/assets/scss/visually-hidden";
</style>
