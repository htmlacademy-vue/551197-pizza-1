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
        :class="`pizza--foundation--${pizzaSettings.size}-${pizzaSettings.sauce}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="el in drops"
            :key="el.id"
            :class="['pizza__filling', `pizza__filling--${el}`]"
          />
        </div>
      </div>
    </div>
    <BuilderPriceCounter />
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
    pizzaSettings: {
      type: Object,
      required: true,
    },
    ingredients: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      pizzaName: "",
      drops: [],
    };
  },
  methods: {
    onDrop(evt) {
      const draggedElement = evt.dataTransfer.getData("item");
      this.drops.push(draggedElement);

      console.log(this.drops);
    },
  },
};
</script>

<style lang="scss" scoped></style>
