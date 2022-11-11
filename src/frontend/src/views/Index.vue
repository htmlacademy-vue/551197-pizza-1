<template>
  <div class="app">
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector />

          <BuilderSizeSelector />

          <BuilderIngredientsSelector />

          <BuilderPizzaView @dropIngredients="dropIngredients" />
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
import { mapActions } from "vuex";

export default {
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },

  created() {
    this.getIngredientsData();
    this.getDoughData();
    this.getSaucesData();
    this.getMiscData();
  },

  methods: {
    ...mapActions("builder", ["getIngredientsData"]),
    ...mapActions("builder", ["getDoughData"]),
    ...mapActions("builder", ["getSaucesData"]),
    ...mapActions("cart", ["getMiscData"]),

    dropIngredients(drop) {
      this.$store.state.builder.ingredientsItems.forEach((el) => {
        if (el.label == drop) {
          el.count++;
        }
      });
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
