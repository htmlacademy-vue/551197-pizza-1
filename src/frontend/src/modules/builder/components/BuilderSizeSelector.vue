6
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
          :checked="currentSize.id === size.id"
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
import RadioButton from "@/common/components/RadioButton";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: { RadioButton },
  created() {
    this.getSizesData();
  },
  computed: {
    ...mapState("builder", ["sizes", "currentSize"]),
  },
  methods: {
    ...mapMutations("builder", ["setCurrentSize"]),
    ...mapActions("builder", ["getSizesData"]),

    changeSize(size) {
      this.setCurrentSize(size);
    },
    getSizePizza(multiplier) {
      switch (multiplier) {
        case 1:
          return "diameter__input--small";
        case 2:
          return "diameter__input--normal";
        case 3:
          return "diameter__input--big";
      }
    },
  },
};
</script>
