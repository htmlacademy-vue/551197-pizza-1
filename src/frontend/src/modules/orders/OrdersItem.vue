<template>
  <div>
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ orderPrice }} ₽</span>
      </div>
      <form data-test="delete-btn" @submit="deleteOrder(order.id)">
        <div class="order__button">
          <button type="submit" class="button button--border">Удалить</button>
        </div>
      </form>

      <div class="order__button">
        <button data-test="repeat-btn" @click="repeatOrder()" class="button">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li v-for="pizza in pizzas" :key="pizza.id" class="order__item">
        <OrdersPizzaItem :pizza="pizza" />

        <p class="order__price">{{ pizza.price }} ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li v-for="item in additionals" :key="item.id">
        <img :src="item.image" width="20" height="30" :alt="item.name" />
        <p>
          <span>{{ item.name }}</span>
          <b>{{ item.count }}х{{ item.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ address }}</p>
  </div>
</template>

<script>
import { getItemById } from "@/common/helpers";
import { mapState, mapActions } from "vuex";
import OrdersPizzaItem from "@/modules/orders/OrdersPizzaItem";

export default {
  name: "OrdersItem",
  components: {
    OrdersPizzaItem,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("cart", ["misc"]),
    ...mapState("builder", ["dough", "sauces", "sizes", "ingredientsItems"]),

    address() {
      return this.order.orderAddress
        ? this.order.orderAddress.name
        : "Самовывоз";
    },

    pizzas() {
      return this.order.orderPizzas.map((pizza) => {
        return { ...pizza, price: this.getPrice(pizza) };
      });
    },
    additionals() {
      return this.order.orderMisc.map((misc) => {
        return {
          ...getItemById(this.misc, misc.miscId),
          count: misc.quantity,
        };
      });
    },
    orderPrice() {
      return this.getOrderPrice(this.pizzas, this.order.orderMisc);
    },
  },

  methods: {
    ...mapActions("orders", ["deleteOrder"]),
    ...mapActions("orders", ["createOrder"]),

    ...mapActions("cart", ["setPizzaSettingsForCart"]),
    ...mapActions("cart", ["changeMiscItemQuantity"]),

    getOrderPrice(pizzas, misc) {
      const pizzaPrices = pizzas.map((pizza) => pizza.price * pizza.quantity);

      const miscPrices = misc.map(
        (misc) => getItemById(this.misc, misc.miscId).price * misc.quantity
      );

      const allPrices = [...pizzaPrices, ...miscPrices];

      return allPrices.length ? allPrices.reduce((a, b) => a + b, 0) : 0;
    },

    getPrice(pizza) {
      const doughPrice = getItemById(this.dough, pizza.doughId).price;
      const saucePrice = getItemById(this.sauces, pizza.sauceId).price;
      const multiplier = getItemById(this.sizes, pizza.sizeId).multiplier;
      const ingredientsPrice = pizza.ingredients
        .map(
          (ingredient) =>
            getItemById(this.ingredientsItems, ingredient.ingredientId).price *
            ingredient.quantity
        )
        .reduce((a, b) => a + b, 0);
      return (doughPrice + saucePrice + ingredientsPrice) * multiplier;
    },

    async repeatOrder() {
      this.pizzas.forEach((pizza) => {
        let pizzaState = this.$store.state.builder;
        var currentPizzaIngredientsNames = [];

        const currentPizzaIngredients = pizza.ingredients.map((item) => {
          return {
            ...getItemById(pizzaState.ingredientsItems, item.ingredientId),
            count: item.quantity,
          };
        });

        let objectPizza = {
          ingredients: currentPizzaIngredients,
          label: pizza.name,
          dough: getItemById(pizzaState.dough, pizza.doughId),
          sauce: getItemById(pizzaState.sauces, pizza.sauceId),
          size: getItemById(pizzaState.sizes, pizza.sizeId),
          description: ` ${getItemById(
            pizzaState.sizes,
            pizza.sizeId
          ).name.toLowerCase()} Тесто: ${getItemById(
            pizzaState.dough,
            pizza.doughId
          ).name.toLowerCase()} Соус: ${getItemById(
            pizzaState.sauces,
            pizza.sauceId
          ).name.toLowerCase()} Начинка:${currentPizzaIngredientsNames}`,
          price: pizza.price,
          count: pizza.quantity,
        };

        this.setPizzaSettingsForCart({ ...objectPizza, id: null });
      });

      this.additionals.forEach((misc) => {
        this.changeMiscItemQuantity(misc);
      });

      this.$router.push({
        name: "Cart",
        params: {
          addressId: this.order.addressId ? this.order.addressId : null,
        },
      });
    },
  },
};
</script>
