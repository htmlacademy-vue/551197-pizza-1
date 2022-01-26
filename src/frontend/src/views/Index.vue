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
            :checkedIngredients="checkedIngredients"
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
      ingredientsItems: this.addLabelIngredients(pizza.ingredients),
      dough: pizza.dough,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      user: user,
      sizePizza: "",

      pizzaSettings: {
        dough: "big",
        sauce: "creamy",
        size: "43 см",
        sizeMultiplier: 3,
        doughPrice: 300,
        saucePrice: 50,
      },

      checkedIngredients: {
        mushrooms: 0,
        cheddar: 0,
        salami: 0,
        ham: 0,
        ananas: 0,
        bacon: 0,
        onion: 0,
        chile: 0,
        jalapeno: 0,
        olives: 0,
        tomatoes: 0,
        salmon: 0,
        mozzarella: 0,
        parmesan: 0,
        blue_cheese: 0,
      },

      prices: [],

      dropsVuewIngredients: {},
      viewIngredients: {},
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
    // console.log(this.prices);
  },
  methods: {
    dropIngredients(drops) {
      console.log(drops);

      for (let i = 0; i < drops.length; i++) {
        let name = drops[i].name;
        let count = drops[i].count;

        this.dropsVuewIngredients = {
          ...this.checkedIngredients,
          [name]: count,
        };
      }
      console.log(this.test1);
      this.sumTest();
    },
    changeCount(item) {
      let itemName = item.name;
      let itemCount = item.count;

      this.viewIngredients = {
        ...this.checkedIngredients,
        [itemName]: itemCount,
      };
      // console.log(this.viewIngredients );
      this.sumTest();
    },
    sumTest() {
      var a = this.dropsVuewIngredients;
      var b = this.viewIngredients;
      var c = {},
        key;
      for (key in a) {
        if (Object.prototype.hasOwnProperty.call(a, key)) {
          c[key] = key in b ? b[key] + a[key] : a[key];
        }
      }
      this.checkedIngredients = c;
      console.log(this.checkedIngredients);
    },
    changeDough(dough) {
      if (dough.name == "Тонкое") {
        dough.label = "small";
      } else if (dough.name == "Толстое") {
        dough.label = "big";
      }
      this.pizzaSettings.dough = dough.label;
      this.pizzaSettings.doughPrice = dough.price;
    },
    changeSize(size) {
      this.pizzaSettings.size = size.name;
      this.pizzaSettings.sizeMultiplier = size.multiplier;
    },
    changeSauce(sauce) {
      if (sauce.name == "Томатный") {
        sauce.label = "tomato";
      } else if (sauce.name == "Сливочный") {
        sauce.label = "creamy";
      }
      this.pizzaSettings.sauce = sauce.label;
      this.pizzaSettings.saucePrice = sauce.price;
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
