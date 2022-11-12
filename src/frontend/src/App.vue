<template>
  <div class="app">
    <AppLayout>
      <transition
        name="slide"
        :appear="isAnimated"
        enter-active-class="animate__animated animate__slideInRight"
      >
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue";
import { setAuth } from "./common/helpers";
import { mapActions } from "vuex";

export default {
  components: {
    AppLayout,
  },

  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }

    this.getIngredientsData();
  },
  computed: {
    isAnimated() {
      return this.$route.name !== "Login";
    },
  },
  methods: {
    ...mapActions("builder", ["getIngredientsData"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
@import "@/assets/scss/fonts";
@import "@/assets/scss/scaffolding";
@import "@/assets/scss/visually-hidden";
</style>
