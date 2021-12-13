<template>
  <label>
    <input
      type="radio"
      class="visually-hidden"
      :name="name"
      :value="value"
      :checked="checked"
    />
  </label>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
