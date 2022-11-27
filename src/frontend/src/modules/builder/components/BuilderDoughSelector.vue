<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          name="dough"
          class="dough__input"
          v-for="item in labeledDough"
          :key="item.id"
          :item="item"
          :item-name="item.name"
          :checked="currentDough.id === item.id"
          :item-description="item.description"
          :class-input="getDoughPizza(item.name)"
          @change-item="changeDough"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "BuilderDoughtSelector",
  components: {
    RadioButton,
  },

  computed: {
    ...mapGetters("builder", ["labeledDough"]),
    ...mapState("builder", ["currentDough"]),
  },

  methods: {
    ...mapMutations("builder", ["setCurrentDough"]),

    getDoughPizza(name) {
      switch (name) {
        case "Тонкое":
          return "dough__input--light";
        case "Толстое":
          return "dough__input--large";
      }
    },
    changeDough(dough) {
      this.setCurrentDough(dough);
    },
  },
};
</script>
