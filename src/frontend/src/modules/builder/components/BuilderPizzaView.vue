<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="namePizza"
        @change="setName($event.target.value)"
      />
    </label>
    <div
      data-test="pizza-wrapper"
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
          <div v-for="el in viewIngredients" :key="el.id">
            <Transition name="fade">
              <div
                v-if="el.count"
                key="item-count"
                :class="['pizza__filling', `pizza__filling--${el.label}`]"
              />
            </Transition>
            <Transition name="fade">
              <div
                v-if="el.count > 1"
                key="item-count"
                :class="[
                  'pizza__filling',
                  `pizza__filling--second`,
                  `pizza__filling--${el.label}`,
                ]"
              />
            </Transition>

            <Transition name="fade">
              <div
                v-if="el.count > 2"
                key="item-count"
                :class="[
                  'pizza__filling',
                  `pizza__filling--third`,
                  `pizza__filling--${el.label}`,
                ]"
              />
            </Transition>
          </div>
        </div>
      </div>
    </div>
    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter.vue";

import { mapMutations, mapState } from "vuex";

import Transition from "@/common/components/Transition";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
    Transition,
  },

  data() {
    return {
      drops: [],
    };
  },
  computed: {
    ...mapState("builder", ["currentDough", "currentSauce", "namePizza"]),
    ...mapState("builder", ["ingredientsItems"]),

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
      this.$emit("drop-ingredients", evt.dataTransfer.getData("item"));
    },
    setName(val) {
      this.setCurrentPizzaName(val);
    },
  },
};
</script>
