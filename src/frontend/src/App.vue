<template>
  <div class="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue";
import { setAuth } from "./common/helpers";
// import { mapActions } from "vuex";

export default {
  components: {
    AppLayout,
  },

  created() {
    if (this.$jwt.getToken()) {
      console.log("have token");
      setAuth(this.$store);
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
@import "@/assets/scss/fonts";
@import "@/assets/scss/scaffolding";
@import "@/assets/scss/visually-hidden";
</style>
