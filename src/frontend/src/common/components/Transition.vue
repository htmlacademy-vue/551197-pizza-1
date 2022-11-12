<template>
  <transition v-if="appear" :name="name" appear><slot /> </transition>
  <transition v-else :name="name"><slot /> </transition>
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

<style lang="scss">
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
