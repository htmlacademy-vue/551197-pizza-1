<template>
  <label :class="classInput">
    <input
      type="radio"
      :name="name"
      class="visually-hidden"
      :value="itemName"
      :checked="checked"
      @click="radio(item)"
    />

    <b v-if="itemName && itemDescription" key="item-name">{{ itemName }}</b>
    <span v-if="itemName && itemDescription" key="item-description">{{
      itemDescription
    }}</span>
    <span v-if="itemName && !itemDescription" key="item-name">{{
      itemName
    }}</span>
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
      require: true,
    },
    classInput: {
      type: String,
      require: true,
    },
    array: {
      type: Array,
      require: true,
    },
    checked: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    radio(item) {
      this.$emit("change-item", item);
    },
  },
};
</script>
