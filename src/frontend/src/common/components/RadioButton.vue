<template>
  <label :class="classInput">
    <input
      type="radio"
      :name="name"
      class="visually-hidden"
      :value="itemName"
      :checked="checked"
      @click="testRadio(item)"
    />

    <b v-if="itemName && itemDescription">{{ itemName }}</b>
    <span v-if="itemName && itemDescription">{{ itemDescription }}</span>
    <span v-if="itemName && !itemDescription">{{ itemName }}</span>
  </label>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemDescription: {
      type: String,
      required: false,
    },
    item: {
      type: Object,
    },
    classInput: {
      type: String,
    },
    array: {
      type: Array,
    },
    checked: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    testRadio(item) {
      this.$emit("changeItem", item);
    },
  },
};
</script>
