<template>
  <div class="popup">
    <a class="close" @click="$emit('close')">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a class="button" @click="$emit('close')">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartModal",

  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>
<style lang="scss"></style>
