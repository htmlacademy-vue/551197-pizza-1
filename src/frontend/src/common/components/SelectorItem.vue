<template>
  <span :class="`filling--${value}`" class="filling"></span>
</template>

<script>
export default {
  name: "SelectorItem",

  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
