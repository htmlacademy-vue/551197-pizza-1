<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizes"
          :key="size.id"
          :item="size"
          :itemName="size.name"
          :checked="true"
          name="diameter"
          class="diameter__input"
          :classInput="getSizePizza(size.multiplier)"
          @changeItem="changeSize"
        >
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "/frontend/src/common/components/RadioButton";

export default {
  data() {
    return {
      checked: false,
    };
  },
  components: { RadioButton },
  props: {
    sizes: {
      type: Array,
    },
  },

  methods: {
    changeSize(size) {
      this.$emit("changeSize", size);
    },
    getSizePizza(multiplier) {
      switch (multiplier) {
        case 1:
          return "diameter__input--small";
        case 2:
          return "diameter__input--normal";
        case 3:
          return "diameter__input--big";
        default:
          alert("error get size");
      }
    },
  },
};
</script>
