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
      :value="item.count"
      :disabled="item.count <= 0"
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
  computed: {
    disabledReduce() {
      if (this.item.count == 0) {
        return true;
      }
      return false;
    },
    disabledAdd() {
      if (this.item.count >= 3) {
        return true;
      }
      return false;
    },
  },

  methods: {
    add() {
      this.$emit("itemCount", this.item.label, this.item.count + 1);
    },
    reduce() {
      this.$emit("itemCount", this.item.label, this.item.count - 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
