<template>
  <span class="filling" :class="this.class"> {{ name }}</span>
</template>

<script>
export default {
  name: "SelectorItem",
  data() {
    return {
      class: "",
    };
  },
  created() {
    this.class = "filling--" + this.classItem;

    // console.log(this.class);
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    classItem: {
      type: String,
      required: true,
    },
  },
};
</script>
