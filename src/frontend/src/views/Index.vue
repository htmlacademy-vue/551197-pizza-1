<template>
  <div class="app">
    <app-layout></app-layout>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector @changeDough="changeDough" :dough="dough" />

          <BuilderSizeSelector @changeSize="changeSize" :sizes="sizes" />

          <BuilderIngredientsSelector
            @changeCount="changeCount"
            @changeSauce="changeSauce"
            :sauces="sauces"
            :ingredientsItems="ingredientsItems"
          />

          <BuilderPizzaView
            :pizzaSettings="pizzaSettings"
            :ingredients="checkedIngredients"
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
      ingredientsItems: this.addLabelIngredients(pizza.ingredients),
      dough: pizza.dough,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      user: user,
      sizePizza: "",

      checkedIngredients: {},
      pizzaSettings: {},
    };
  },

  methods: {
    changeCount(count) {
      // console.log(count);
      this.checkedIngredients.count = count;
    },
    changeDough(dough) {
      if (dough.name == "Тонкое") {
        dough.label = "light";
      } else if (dough.name == "Толстое") {
        dough.label = "large";
      }
      this.pizzaSettings.dough = dough.label;
    },
    changeSize(size) {
      if (size.name == "23 см") {
        size.label = "small";
      } else if (size.name == "32 см") {
        size.label = "middle";
      } else if (size.name == "45 см") {
        size.label = "big";
      }
      this.pizzaSettings.size = size.label;
    },
    changeSauce(sauce) {
      if (sauce.name == "Томатный") {
        sauce.label = "tomato";
      } else if (sauce.name == "Сливочный") {
        sauce.label = "creamy";
      }
      this.pizzaSettings.sauce = sauce.label;
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
