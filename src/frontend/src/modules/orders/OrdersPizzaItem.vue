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
import { mapActions, mapState } from "vuex";
import { getItemById } from "@/common/helpers";
export default {
  name: "PizzaItem",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.getDoughData();
    this.getSaucesData();
    this.getSizesData();
    this.getIngredientsData();
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

  methods: {
    ...mapActions("builder", ["getDoughData"]),
    ...mapActions("builder", ["getSaucesData"]),
    ...mapActions("builder", ["getSizesData"]),
    ...mapActions("builder", ["getIngredientsData"]),
  },
};
</script>

<style lang="scss" scoped></style>
