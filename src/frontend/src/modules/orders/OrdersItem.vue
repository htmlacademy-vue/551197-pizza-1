<template>
  <div>
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ orderPrice }} ₽</span>
      </div>

      <form @submit="deleteOrder(order.id)">
        <div class="order__button">
          <button type="submit" class="button button--border">Удалить</button>
        </div>
      </form>

      <form @submit="repeatOrder(order)">
        <div class="order__button">
          <button type="submit" class="button">Повторить</button>
        </div>
      </form>
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

  created() {
    this.getIngredientsData();
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
    ...mapActions("builder", ["getIngredientsData"]),

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

    async repeatOrder(order) {
      const deleteIdPizzas = order.orderPizzas.map((el) => {
        delete el.id;
        delete el.orderId;
        el.ingredients.map((item) => {
          delete item.pizzaId;
          delete item.id;
          return item;
        });
        return el;
      });

      const deleteIdMisc = order.orderMisc.map((el) => {
        delete el.id;
        delete el.orderId;
        return el;
      });

      const repetOrderItem = {
        address: order.orderAddress,
        phone: order.phone,
        userId: order.userId,
        pizzas: deleteIdPizzas,
        misc: deleteIdMisc,
      };
      await this.createOrder(repetOrderItem);
    },
  },
};
</script>
