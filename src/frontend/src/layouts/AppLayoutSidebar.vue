<template>
  <div class="app-layout-main">
    <AppLayoutHeader />
    <div class="content">
      <main class="layout">
        <div class="layout__sidebar sidebar">
          <router-link to="/" class="logo layout__logo">
            <img
              src="@/assets/img/logo.svg"
              alt="V!U!E! Pizza logo"
              width="90"
              height="40"
            />
          </router-link>
          <router-link to="/orders" class="layout__link" data-test="orders-link"
            >История заказов</router-link
          >
          <router-link
            to="/profile"
            class="layout__link"
            data-test="profile-link"
            >Мои данные</router-link
          >
        </div>
      </main>
      <slot />
    </div>
  </div>
</template>
<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutSidebar",
  components: {
    AppLayoutHeader,
  },
};
</script>
