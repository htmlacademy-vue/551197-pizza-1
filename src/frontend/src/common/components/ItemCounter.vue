<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="reduce"
      :disabled="disabledReduce"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <!-- <button
      v-if="value == 0"
      type="button"
      class="counter__button counter__button--minus"
      disabled
    >
      <span class="visually-hidden">Меньше</span>
    </button> -->

    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="add"
      :disabled="disabledAdd"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      value: 0,
    };
  },

  computed: {
    disabledReduce() {
      if (this.value == 0) {
        return true;
      }
      return false;
    },
    disabledAdd() {
      if (this.value >= 3) {
        return true;
      }
      return false;
    },
  },

  methods: {
    add() {
      this.value++;
    },
    reduce() {
      if (this.value > 0) {
        this.value--;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
