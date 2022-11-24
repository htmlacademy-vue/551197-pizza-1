<template>
  <div>
    <form
      class="layout-form"
      @submit.prevent="saveOrder"
      data-test="order-form"
    >
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <CartEmpty data-test="cart-empty" v-if="getPizza.length == 0" />

          <ul
            data-test="cart-items"
            v-if="getPizza.length > 0"
            class="cart-list sheet"
          >
            <li class="cart-list__item" v-for="item in getPizza" :key="item.id">
              <div class="product cart-list__product">
                <img
                  src="@/assets/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  alt="Пицца"
                />
                <div class="product__text">
                  <h2>{{ item.label }}</h2>
                  <ul>
                    <li>{{ item.description }}</li>
                  </ul>
                </div>
              </div>
              <div class="counter cart-list__counter">
                <ItemCounter
                  @itemCount="itemCountPizza"
                  :item="item"
                  :isOrange="true"
                />
              </div>

              <div class="cart-list__price">
                <b>{{ item.price }} ₽</b>
              </div>

              <div class="cart-list__button">
                <button
                  data-test="cart-edit-button"
                  @click="setPizzaToBuilder(item)"
                  type="button"
                  class="cart-list__edit"
                >
                  Изменить
                </button>
              </div>
            </li>
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <li
                v-for="item in labeledMisc"
                :key="item.id"
                class="additional-list__item sheet"
              >
                <p class="additional-list__description">
                  <img :src="item.image" width="39" height="60" />
                  <span>{{ item.name }}</span>
                </p>

                <ItemCounter
                  @itemCount="itemCountMisc"
                  :item="item"
                  :isOrange="true"
                />
              </li>
            </ul>
          </div>

          <CartOrderForm
            data-test="address-form"
            @setAddress="setAddress"
            :reorderAddressId="addressId"
          ></CartOrderForm>
        </div>
      </main>

      <Transition name="fade">
        <CartModal
          data-test="success-popup"
          @close="closeModal"
          v-if="isModal"
        />
      </Transition>

      <section class="footer" data-test="cart-footer">
        <div class="footer__more">
          <router-link to="/" class="button button--border button--arrow">
            Хочу еще одну
          </router-link>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ resultPrice }} ₽</b>
        </div>
        <div class="footer__submit">
          <button class="button" type="submit">Оформить заказ</button>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import CartModal from "@/modules/cart/CartModal";
import CartEmpty from "@/modules/cart/CartEmpty";
import CartOrderForm from "@/modules/cart/CartOrderForm";
import { validator } from "@/common/mixins";

import Transition from "@/common/components/Transition";

export default {
  name: "Cart",
  mixins: [validator],
  components: {
    ItemCounter,
    CartModal,
    CartEmpty,
    CartOrderForm,
    Transition,
  },

  data() {
    return {
      isModal: false,
      address: null,
      addressId: null,
      phone: "",
      validations: {
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  mounted() {
    this.addressId = this.$route.params.addressId;
  },

  computed: {
    ...mapGetters("cart", ["labeledMisc"]),
    ...mapGetters("cart", ["getPizza"]),
    ...mapGetters("cart", ["getPriceMisc"]),
    ...mapState("auth", ["user"]),
    ...mapState("addresses", ["addresses"]),
    ...mapState("cart", ["misc"]),

    resultPrice() {
      let pricePizza = 0;
      for (let i = 0; i < this.getPizza.length; i++) {
        pricePizza =
          pricePizza + this.getPizza[i].price * this.getPizza[i].count;
      }
      this.setTotalPrice(pricePizza + this.getPriceMisc);
      return pricePizza + this.getPriceMisc;
    },
  },
  methods: {
    ...mapMutations("cart", ["setCountMisc"]),
    ...mapMutations("cart", ["setCountPizza"]),
    ...mapMutations("cart", ["setTotalPrice"]),
    ...mapActions("orders", ["createOrder"]),
    ...mapActions("builder", ["editPizza"]),
    ...mapActions("cart", ["resetCartState"]),

    itemCountMisc(label, count) {
      let item = { label: label, count: count };
      this.setCountMisc(item);
    },
    itemCountPizza(label, count) {
      let item = { label: label, count: count };
      this.setCountPizza(item);
    },
    closeModal() {
      this.isModal = false;
      setTimeout(
        () => this.$router.push({ name: this.user ? "Orders" : "IndexHome" }),
        1000
      );
    },

    setAddress({ phone, address }) {
      this.phone = phone;
      this.address = address;
    },

    normalizePizzas() {
      return this.getPizza.map((pizza) => {
        return {
          name: pizza.label,
          quantity: pizza.count,
          doughId: pizza.dough.id,
          sauceId: pizza.sauce.id,
          sizeId: pizza.size.id,
          ingredients: pizza.ingredients.map((ingredient) => {
            return {
              ingredientId: ingredient.id,
              quantity: ingredient.count,
            };
          }),
        };
      });
    },

    normalizeMisc() {
      return this.misc.map((item) => {
        return {
          miscId: item.id,
          quantity: item.count,
        };
      });
    },
    setPizzaToBuilder(pizza) {
      this.editPizza(pizza);
    },

    async saveOrder() {
      if (
        this.address !== null &&
        this.address.id === null &&
        !this.$validateFields(
          { street: this.address.street, building: this.address.building },
          this.validations
        )
      ) {
        console.log("error");
        return;
      }
      const order = {
        userId: this.user ? this.user.id : null,
        phone: this.phone,
        address: this.address,
        pizzas: this.normalizePizzas(),
        misc: this.normalizeMisc(),
      };

      await this.createOrder(order);

      this.isModal = true;
    },
  },
};
</script>
