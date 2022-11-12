<template>
  <div class="content__result">
    <p>Итого: {{ getPrice }} ₽</p>
    <button
      :disabled="isDisabled"
      type="button"
      class="button"
      @click="savePizzaSettings()"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("builder", ["getPrice"]),
    ...mapState("builder", ["namePizza", "ingredientsItems"]),
    ...mapState("cart", ["misc"]),

    isDisabled() {
      const isSomeChecked = (el) => el.count !== 0;
      const isCheckedIngredients = this.ingredientsItems.some(isSomeChecked);

      if (isCheckedIngredients && this.namePizza) {
        return false;
      } else return true;
    },
  },
  methods: {
    ...mapActions("cart", ["setPizzaSettingsForCart"]),

    ...mapActions("cart", ["changeMiscItemQuantity"]),

    ...mapActions("builder", [
      "resetBuilderState",
      "getDoughData",
      "getSaucesData",
      "getSizesData",
      "getIngredientsData",
    ]),

    savePizzaSettings() {
      let pizzaState = this.$store.state.builder;
      var currentPizzaIngredientsNames = [];
      var currentPizzaIngredients = [];
      for (let i = 0; i < pizzaState.ingredientsItems.length; i++) {
        if (pizzaState.ingredientsItems[i].count > 0) {
          currentPizzaIngredients.push(pizzaState.ingredientsItems[i]);
          currentPizzaIngredientsNames.push(
            " " + pizzaState.ingredientsItems[i].name.toLowerCase()
          );
        }
      }

      let objectPizza = {
        ingredients: currentPizzaIngredients,
        label: pizzaState.namePizza,
        dough: pizzaState.currentDough,
        sauce: pizzaState.currentSauce,
        size: pizzaState.currentSize,
        description: ` ${pizzaState.currentSize.name.toLowerCase()} Тесто: ${pizzaState.currentDough.name.toLowerCase()} Соус: ${pizzaState.currentSauce.name.toLowerCase()} Начинка:${currentPizzaIngredientsNames}`,
        price: this.getPrice,
        count: 1,
        id: pizzaState.id,
      };

      this.setPizzaSettingsForCart(objectPizza);

      this.resetBuilderState();

      this.getDoughData();
      this.getSaucesData();
      this.getSizesData();
      this.getIngredientsData();

      this.misc.forEach((misc) => {
        this.changeMiscItemQuantity({ ...misc, quantity: 0 });
      });

      this.$router.push({ name: "Cart" });
    },
  },
};
</script>
