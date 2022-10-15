<template>
  <div class="content__result">
    <p>Итого: {{ getPrice }} ₽</p>
    <button type="button" class="button" v-on:click="savePizzaSettings()">
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("builder", ["getPrice"]),
  },
  methods: {
    ...mapMutations("builder", ["setPizzaSettingsForCart"]),

    savePizzaSettings() {
      let pizzaState = this.$store.state.builder;
      var currentPizzaIngredients = [];
      for (let i = 0; i < pizzaState.ingredientsItems.length; i++) {
        if (pizzaState.ingredientsItems[i].count > 0) {
          currentPizzaIngredients.push(
            " " + pizzaState.ingredientsItems[i].name.toLowerCase()
          );
        }
      }

      let objectPizza = {
        label: pizzaState.namePizza,
        dough: pizzaState.currentDough,
        sauce: pizzaState.currentSauce,
        size: pizzaState.currentSize,
        description: ` ${pizzaState.currentSize.name.toLowerCase()} Тесто: ${pizzaState.currentDough.name.toLowerCase()} Соус: ${pizzaState.currentSauce.name.toLowerCase()} Начинка:${currentPizzaIngredients}`,
        price: this.getPrice,
        count: 1,
      };

      this.setPizzaSettingsForCart(objectPizza);
      this.$router.push("Cart");
    },
  },
};
</script>
