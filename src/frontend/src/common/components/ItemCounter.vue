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

    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      :disabled="value <= 0"
    />
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
      value: this.item.count,
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
      this.item.count = this.value;
      this.$emit("itemCount", this.item.name, this.item.count);
    },
    reduce() {
      if (this.value > 0) {
        this.value--;
        this.item.count = this.value;
        this.$emit("itemCount", this.item.name, this.item.count);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
