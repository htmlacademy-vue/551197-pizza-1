<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="pizza.name"
    />
    <div class="product__text">
      <h2>{{ pizza.name }}</h2>
      <ul>
        <li>{{ sizeName }}, {{ doughName }}</li>
        <li>Соус: {{ sauceName }}</li>
        <li>Начинка: {{ ingredientsName }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getItemById } from "@/common/helpers";
export default {
  name: "PizzaItem",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("builder", ["dough", "sauces", "sizes", "ingredientsItems"]),

    sizeName() {
      return getItemById(this.sizes, this.pizza.sizeId).name;
    },

    doughName() {
      const dough = getItemById(this.dough, this.pizza.doughId);
      const name = dough.name === "Толстое" ? "толстом" : "тонком";
      return `на ${name} тесте`;
    },

    sauceName() {
      return getItemById(this.sauces, this.pizza.sauceId).name.toLowerCase();
    },

    ingredientsName() {
      const names = this.pizza.ingredients.map((el) => {
        return getItemById(this.ingredientsItems, el.ingredientId).name;
      });
      return names.map((el) => el.toLowerCase()).join(", ");
    },
  },
};
</script>

<style lang="scss" scoped></style>
