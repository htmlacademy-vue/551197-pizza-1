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
    prices: {
      type: Array,
      required: true,
    },
    ingredientsItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      ingredientsPrice: 0,
    };
  },
  methods: {
    calcIngredientsPrice() {
      var result = 0;
      for (let i = 0; i < this.ingredientsItems.length; i++) {
        result =
          result +
          this.ingredientsItems[i].count * this.ingredientsItems[i].price;
      }
      this.ingredientsPrice = result;
    },
  },
  computed: {
    price: function () {
      this.calcIngredientsPrice();
      return (
        (this.currentDough.price +
          this.currentSauce.price +
          this.ingredientsPrice) *
        this.currentSize.multiplier
      );
    },
  },
};
</script>
