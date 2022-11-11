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
import { mapActions } from "vuex";

export default {
  components: {
    AppLayout,
  },

  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
  },
  mounted() {
    this.getIngredientsData();
    this.getDoughData();
    this.getSaucesData();
  },

  methods: {
    ...mapActions("builder", ["getIngredientsData"]),
    ...mapActions("builder", ["getDoughData"]),
    ...mapActions("builder", ["getSaucesData"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
@import "@/assets/scss/fonts";
@import "@/assets/scss/scaffolding";
@import "@/assets/scss/visually-hidden";
</style>
