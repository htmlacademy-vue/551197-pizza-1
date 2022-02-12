<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="item in dough"
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
import RadioButton from "/frontend/src/common/components/RadioButton";

export default {
  name: "BuilderDoughtSelector",
  components: {
    RadioButton,
  },
  props: {
    dough: {
      type: Array,
      require: true,
    },
    currentDough: {
      type: Object,
    },
  },
  methods: {
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
      this.$emit("changeDough", dough);
    },
  },
};
</script>
