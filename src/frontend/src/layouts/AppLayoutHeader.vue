<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <router-link to="/" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
      </div>

      <div class="header__cart">
        <router-link data-test="cart-link" to="/cart">
          {{ getTotalPrice }} ₽
        </router-link>
      </div>
      <div class="header__user" style="display: flex">
        <router-link
          v-if="user"
          key="profile-link"
          data-test="profile-link"
          to="/profile"
        >
          <picture>
            <source type="image/webp" :srcset="getWebPSrc" />
            <img
              :src="user.avatar"
              :srcset="getSrc"
              alt="Василий Ложкин"
              width="72"
              height="72"
            />
          </picture>
          <span>{{ user.name }}</span>
        </router-link>

        <a
          v-if="user"
          key="logout-link"
          href="#"
          class="header__logout"
          data-test="logout-link"
          @click="$logout"
        >
          <span>Выйти</span>
        </a>

        <router-link
          v-else
          key="login-link"
          to="/login"
          class="header__login"
          data-test="login-link"
        >
          <span>Войти</span></router-link
        >
      </div>
    </header>
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import logout from "@/common/mixins/logout";

export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  computed: {
    ...mapGetters("cart", ["getTotalPrice"]),
    ...mapState("auth", ["user"]),

    getWebPSrc: function () {
      return `${this.user.avatar.replace(
        ".jpg",
        "@2x.webp"
      )} 1x, ${this.user.avatar.replace(".jpg", "@4x.webp")} 2x`;
    },
    getSrc: function () {
      return `${this.user.avatar.replace(".jpg", "@4x")}.jpg`;
    },
  },
};
</script>
