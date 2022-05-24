<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button type="button" class="button">Готовьте!</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",

  props: {
    ingredientsItems: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapState("builder", ["currentSize", "currentSauce", "currentDough"]),
    price: function () {
      var ingredientsPrice = 0;
      for (let i = 0; i < this.ingredientsItems.length; i++) {
        ingredientsPrice =
          ingredientsPrice +
          this.ingredientsItems[i].count * this.ingredientsItems[i].price;
      }
      return (
        (this.currentDough.price + this.currentSauce.price + ingredientsPrice) *
        this.currentSize.multiplier
      );
    },
  },
};
</script>
