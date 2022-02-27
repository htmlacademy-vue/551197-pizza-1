<template>
  <div class="app">
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
            @dropIngredients="dropIngredients"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

export default {
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      misc: misc,
      user: user,

      ingredientsItems: this.addLabelIngredients(pizza.ingredients),
      dough: this.addLabelDough(pizza.dough),
      sauces: this.addLabelSauce(pizza.sauces),
      sizes: pizza.sizes,

      currentDough: pizza.dough[0],
      currentSauce: pizza.sauces[0],
      currentSize: pizza.sizes[0],
    };
  },
  methods: {
    dropIngredients(drop) {
      this.ingredientsItems.forEach((el) => {
        if (el.label == drop) {
          el.count++;
        }
      });
    },
    changeCount(label, count) {
      this.ingredientsItems = this.ingredientsItems.map((item) => {
        if (item.label === label) {
          item.count = count;
        }
        return item;
      });
    },
    changeSize(size) {
      this.currentSize = size;
    },
    changeDough(dough) {
      this.currentDough = dough;
    },
    changeSauce(sauce) {
      this.currentSauce = sauce;
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
    addLabelIngredients(ingredients) {
      ingredients.forEach((el) => {
        el.count = 0;
        el.label = el.image
          .replace(".svg", "")
          .replace("/public/img/filling/", "");
      });
      return ingredients;
    },
    addLabelDough(dough) {
      dough.forEach((el) => {
        if (el.name == "Толстое") {
          this.$set(el, "label", "big");
        }
        if (el.name == "Тонкое") {
          this.$set(el, "label", "small");
        }
      });
      return dough;
    },
    addLabelSauce(sauces) {
      sauces.forEach((el) => {
        if (el.name == "Томатный") {
          this.$set(el, "label", "tomato");
        }
        if (el.name == "Сливочный") {
          this.$set(el, "label", "creamy");
        }
      });
      return sauces;
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
