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
    checkedIngredients: {
      type: Object,
      required: true,
    },
    pizzaSettings: {
      type: Object,
      required: true,
    },
    prices: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      totalPrice: 0,
      ingredientsPrice: 0,
    };
  },
  created() {},
  methods: {
    calcIngredientsPrice() {
      const result = Object.entries(this.checkedIngredients).map((entry) => ({
        name: entry[0],
        count: entry[1],
      }));

      for (let i = 0; i < this.prices.length; i++) {
        result[i].price = this.prices[i].price;
      }

      var test = 0;

      for (let i = 0; i < result.length; i++) {
        test = test + result[i].count * result[i].price;
      }

      this.ingredientsPrice = test;

      console.log(this.ingredientsPrice);
    },
  },
  computed: {
    price: function () {
      this.calcIngredientsPrice();
      return (
        (this.pizzaSettings.doughPrice +
          this.pizzaSettings.saucePrice +
          this.ingredientsPrice) *
        this.pizzaSettings.sizeMultiplier
      );
    },
  },
};
</script>
