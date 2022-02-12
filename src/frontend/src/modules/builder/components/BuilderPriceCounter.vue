<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button type="button" class="button">Готовьте!</button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    currentDough: {
      type: Object,
      required: true,
    },
    currentSauce: {
      type: Object,
      required: true,
    },
    currentSize: {
      type: Object,
      required: true,
    },
    ingredientsItems: {
      type: Array,
      required: true,
    },
  },

  computed: {
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
