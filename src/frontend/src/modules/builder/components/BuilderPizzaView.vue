<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
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
          <div
            v-for="el in viewIngredients"
            :key="el.id"
            :class="['pizza__filling', `pizza__filling--${el}`]"
          />
        </div>
      </div>
    </div>
    <BuilderPriceCounter
      :currentDough="currentDough"
      :ingredientsItems="ingredientsItems"
      :currentSauce="currentSauce"
      :currentSize="currentSize"
    />
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter.vue";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },
  props: {
    currentDough: {
      type: Object,
      required: true,
    },
    currentSauce: {
      type: Object,
      required: true,
    },
    currentSize: {
      type: Object,
      required: true,
    },
    ingredientsItems: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      pizzaName: "",
      drops: [],
    };
  },

  computed: {
    viewIngredients: function () {
      var nameIngredients = [];
      this.ingredientsItems.forEach((item) => {
        if (item.count > 0) {
          nameIngredients.push(item.label);
        }
      });
      return nameIngredients;
    },
  },
  methods: {
    onDrop(evt) {
      this.$emit("dropIngredients", evt.dataTransfer.getData("item"));
    },
  },
};
</script>

<style lang="scss" scoped></style>
