<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="item in labeledDough"
          :item="item"
          :key="item.id"
          :itemName="item.name"
          :checked="currentDough.id === item.id"
          :itemDescription="item.description"
          name="dough"
          class="dough__input"
          :classInput="getDoughPizza(item.name)"
          @changeItem="changeDough"
        >
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "BuilderDoughtSelector",
  components: {
    RadioButton,
  },
  created() {
    this.getDoughData();
    this.getSaucesData();
  },
  computed: {
    ...mapGetters("builder", ["labeledDough"]),
    ...mapState("builder", ["currentDough"]),
  },

  methods: {
    ...mapMutations("builder", ["setCurrentDough"]),
    ...mapActions("builder", ["getDoughData"]),
    ...mapActions("builder", ["getSaucesData"]),

    getDoughPizza(name) {
      switch (name) {
        case "Тонкое":
          return "dough__input--light";
        case "Толстое":
          return "dough__input--large";
        default:
          alert("error get dough");
      }
    },
    changeDough(dough) {
      this.setCurrentDough(dough);
    },
  },
};
</script>
