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
        :class="`pizza--foundation--${pizzaSettings.dough}-${pizzaSettings.sauce}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="el in viewIngredients()"
            :key="el.id"
            :class="['pizza__filling', `pizza__filling--${el}`]"
          />
        </div>
      </div>
    </div>
    <BuilderPriceCounter
      :checkedIngredients="checkedIngredients"
      :pizzaSettings="pizzaSettings"
      :prices="prices"
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
    pizzaSettings: {
      type: Object,
      required: true,
    },
    checkedIngredients: {
      type: Object,
      required: true,
    },
    prices: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      pizzaName: "",
      drops: [],
    };
  },
  mounted() {
    console.log(this.checkedIngredients);
  },
  computed: {},
  methods: {
    viewIngredients() {
      var viewItems = Object.entries(this.checkedIngredients).map((entry) => ({
        name: entry[0],
        count: entry[1],
      }));
      var nameIngredients = [];
      viewItems.forEach((item) => {
        if (item.count > 0) {
          nameIngredients.push(item.name);
        }
      });
      nameIngredients.push(this.drops);
      return nameIngredients;
    },

    count(drops) {
      var dropsCount = {};
      drops.forEach((item) => {
        dropsCount[item] = (dropsCount[item] || 0) + 1;
      });

      console.log(dropsCount);

      dropsCount = Object.entries(dropsCount).map((entry) => ({
        name: entry[0],
        count: entry[1],
      }));
      console.log(dropsCount);

      this.$emit("dropIngredients", dropsCount);
    },
    onDrop(evt) {
      const draggedElement = evt.dataTransfer.getData("item");

      this.drops.push(draggedElement);

      console.log(this.checkedIngredients);

      this.count(this.drops);
      //-----
      // var test = Object.entries(this.checkedIngredients).map((entry) => ({
      //   name: entry[0],
      //   count: entry[1],
      // }));
      // var nameIngredients = [];
      // test.forEach((item) => {
      //   if (item.count > 0) {
      //     nameIngredients.push(item.name);
      //   }
      // });

      // console.log(nameIngredients);

      // this.drops.push(...nameIngredients);

      //----

      console.log(this.drops);
    },
  },
};
</script>

<style lang="scss" scoped></style>
