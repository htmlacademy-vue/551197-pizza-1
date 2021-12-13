<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="item in dough"
          class="dough__input"
          :key="item.id"
          :class="getDoughPizza(item.name)"
          @click="changeDough(item)"
        >
          <RadioButton name="dough" :value="item.name" :checked="true">
            {{ item.value }}
          </RadioButton>
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "/frontend/src/common/components/RadioButton";

export default {
  props: {
    dough: {
      type: Array,
    },
  },
  name: "BuilderDoughtSelector",
  components: {
    RadioButton,
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
      console.log(dough.name);
      this.$emit("changeDough", dough);
    },

    click() {
      console.log("мяу");
    },
  },
};
</script>
