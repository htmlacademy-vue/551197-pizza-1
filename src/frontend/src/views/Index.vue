<template>
  <div class="app">
    <app-layout></app-layout>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector :dough="dough" />

          <BuilderSizeSelector :sizes="sizes" />

          <BuilderIngredientsSelector
            :sauces="sauces"
            :ingredientsItems="ingredientsItems"
          />

          <BuilderPizzaView />
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
  created() {
    console.log(this.sauces);
  },
  data() {
    return {
      misc: misc,
      ingredientsItems: pizza.ingredients,
      dough: pizza.dough,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      user: user,
      sizePizza: "",
    };
  },
  methods: {
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
