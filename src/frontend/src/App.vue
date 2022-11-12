<template>
  <div class="app">
    <AppLayout>
      <Transition name="slide" :appear="isAnimated ? true : false">
        <router-view />
      </Transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue";
import { setAuth } from "./common/helpers";
import { mapActions } from "vuex";

import Transition from "@/common/components/Transition";

export default {
  components: {
    AppLayout,
    Transition,
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
