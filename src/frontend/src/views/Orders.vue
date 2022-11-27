<template>
  <div>
    <main class="layout">
      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">История заказов</h1>
        </div>

        <div v-if="isOrdersListEmpty" key="orders-list">
          <p>Заказов пока нет</p>
        </div>

        <div v-else key="orders-list">
          <section v-for="order in orders" :key="order.id" class="sheet order">
            <OrdersItem :order="order" />
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrdersItem from "../modules/orders/OrdersItem";

export default {
  name: "Orders",
  components: {
    OrdersItem,
  },
  computed: {
    ...mapState("cart", ["additionalItems"]),
    ...mapState("orders", ["orders"]),

    isOrdersListEmpty() {
      return this.orders.length === 0;
    },
  },

  async created() {
    await this.getSaucesData();
    await this.getDoughData();
    await this.getSizesData();
    await this.getIngredientsData();
    await this.getMiscData();
    await this.fetchOrders();
  },
  methods: {
    ...mapActions("builder", ["getSaucesData"]),
    ...mapActions("builder", ["getDoughData"]),
    ...mapActions("builder", ["getSizesData"]),
    ...mapActions("builder", ["getIngredientsData"]),
    ...mapActions("cart", ["getMiscData"]),
    ...mapActions("orders", ["fetchOrders"]),
  },
};
</script>
