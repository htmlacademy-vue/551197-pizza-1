<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="name"
        @change="setName()"
      />
    </label>
    <div
      @drop="onDrop"
      @dragover.prevent
      @dragenter.prevent
      class="content__constructor"
    >
      <div
        class="pizza"
        :class="`pizza--foundation--${currentDough.label}-${currentSauce.label}`"
      >
        <div class="pizza__wrapper">
          <template v-for="el in viewIngredients">
            <div
              :key="el.id"
              :class="['pizza__filling', `pizza__filling--${el.label}`]"
            />
            <div
              v-if="el.count > 1"
              :key="el.id"
              :class="[
                'pizza__filling',
                `pizza__filling--second`,
                `pizza__filling--${el.label}`,
              ]"
            />
            <div
              v-if="el.count > 2"
              :key="el.id"
              :class="[
                'pizza__filling',
                `pizza__filling--third`,
                `pizza__filling--${el.label}`,
              ]"
            />
          </template>
        </div>
      </div>
    </div>
    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter.vue";

import { mapMutations, mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },

  data() {
    return {
      drops: [],
      name: "",
    };
  },

  computed: {
    ...mapState("builder", ["currentDough", "currentSauce", "currentSize"]),
    ...mapState("builder", ["ingredientsItems"]),
    ...mapState("builder", ["ingredientsCounts"]),

    viewIngredients: function () {
      var nameIngredients = [];
      this.ingredientsItems.forEach((item) => {
        if (item.count > 0) {
          nameIngredients.push({ label: item.label, count: item.count });
        }
      });
      return nameIngredients;
    },
  },
  methods: {
    ...mapMutations("builder", ["setCurrentPizzaName"]),

    onDrop(evt) {
      this.$emit("dropIngredients", evt.dataTransfer.getData("item"));
    },
    setName() {
      this.setCurrentPizzaName(this.name);
    },
  },
};
</script>

<style lang="scss" scoped></style>
