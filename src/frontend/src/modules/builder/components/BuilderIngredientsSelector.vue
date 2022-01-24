<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <label
            class="radio ingredients__input"
            v-for="sauce in sauces"
            :key="sauce.id"
          >
            <input
              type="radio"
              name="sauce"
              checked
              @change="changeSauce(sauce)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="item in ingredientsItems"
              :key="item.id"
            >
              <SelectorItem
                :classItem="item.label"
                :name="item.name"
                draggable
                @dragstart.native="startDrag($event, item.label)"
              />

              <ItemCounter
                @itemCount="itemCount(item.label, item.count)"
                :item="item"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "../../../common/components/ItemCounter";
import SelectorItem from "../../../common/components/SelectorItem";
export default {
  name: "BuulderIngredientSelector",
  components: {
    ItemCounter,
    SelectorItem,
  },
  props: {
    sauces: {
      type: Array,
    },

    ingredientsItems: {
      type: Array,
    },
  },
  data() {
    return {
      result: [],
    };
  },
  methods: {
    itemCount(name, count) {
      var countItem = { name, count };
      console.log(countItem);
      this.$emit("changeCount", countItem);
      // console.log(countItem);
      // this.addIngredient(countItem);
      // console.log(count);
    },
    addIngredient() {
      // this.result.push(...countItem);

      // var arrayIngredients = [];
      // arrayIngredients.push(countItem);
      // this.result.push({ ...countItem });

      this.$emit("changeCount", this.result);
    },

    changeSauce(sauce) {
      console.log(sauce.name);
      this.$emit("changeSauce", sauce);
    },

    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("item", item);
    },
  },
};
</script>
