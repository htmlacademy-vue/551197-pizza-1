<template>
  <div>
    <!-- <form class="layout-form"> -->

    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartEmpty v-if="getPizza.length == 0" />

        <ul v-if="getPizza.length > 0" class="cart-list sheet">
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
              <button type="button" class="cart-list__edit">Изменить</button>
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

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99" />
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <CartModal @close="clodeModal" v-if="isModal" />

    <section class="footer">
      <div class="footer__more">
        <router-link to="/">
          <a href="#" class="button button--border button--arrow"
            >Хочу еще одну</a
          ></router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ resultPrice() }} ₽</b>
      </div>

      <div class="footer__submit">
        <button class="button" v-on:click="saveOrder()">Оформить заказ</button>
      </div>
    </section>
    <!-- </form> -->
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapGetters, mapMutations } from "vuex";
import CartModal from "@/modules/cart/CartModal";
import CartEmpty from "@/modules/cart/CartEmpty";

export default {
  name: "Cart",
  components: {
    ItemCounter,
    CartModal,
    CartEmpty,
  },

  data() {
    return {
      isModal: false,
    };
  },

  created() {
    this.setNewMisc();
  },
  computed: {
    ...mapGetters("cart", ["labeledMisc"]),
    ...mapGetters("cart", ["getPizza"]),
    ...mapGetters("cart", ["getPriceMisc"]),
  },
  methods: {
    ...mapMutations("cart", ["setNewMisc"]),
    ...mapMutations("cart", ["setCountMisc"]),
    ...mapMutations("cart", ["setCountPizza"]),
    ...mapMutations("cart", ["setTotalPrice"]),

    itemCountMisc(label, count) {
      let item = { label: label, count: count };
      this.setCountMisc(item);
    },
    itemCountPizza(label, count) {
      let item = { label: label, count: count };
      this.setCountPizza(item);
    },
    clodeModal() {
      this.isModal = false;
    },
    saveOrder() {
      this.isModal = true;
    },

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
};
</script>
