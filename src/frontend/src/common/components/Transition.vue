<template>
  <transition :name="name" :appear="appear"><slot /> </transition>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    appear: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.4s;
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
