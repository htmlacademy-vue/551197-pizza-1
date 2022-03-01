<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";
export default {
  name: "AppLayuot",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
