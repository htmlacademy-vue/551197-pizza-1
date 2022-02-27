<template>
  <div class="app">
    <AppLayout />
    <Index></Index>
  </div>
</template>

<script>
import Index from "./views/Index.vue";
import AppLayout from "./layouts/AppLayout.vue";

export default {
  components: {
    Index,
    AppLayout,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
@import "@/assets/scss/fonts";
@import "@/assets/scss/scaffolding";
@import "@/assets/scss/visually-hidden";
</style>
