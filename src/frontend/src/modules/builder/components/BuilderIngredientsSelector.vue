<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <label
            class="radio ingredients__input"
            v-for="sauce in labeledlSauces"
            :key="sauce.id"
          >
            <input
              type="radio"
              name="sauce"
              :checked="currentSauce.id === sauce.id"
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
                :draggable="draggable(item)"
                @dragstart.native="startDrag($event, item.label)"
              />

              <ItemCounter
                @itemCount="itemCount"
                :item="item"
                :isOrange="false"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import SelectorItem from "@/common/components/SelectorItem";

import { mapGetters, mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "BuulderIngredientSelector",
  components: {
    ItemCounter,
    SelectorItem,
  },

  created() {
    this.getIngredientsData();
  },
  computed: {
    ...mapState("builder", ["currentSauce"]),
    ...mapState("builder", ["ingredientsItems"]),
    ...mapGetters("builder", ["labeledlSauces"]),
  },
  methods: {
    ...mapMutations("builder", ["setCurrentSauce"]),
    ...mapMutations("builder", ["setNewIngredients"]),
    ...mapMutations("builder", ["setCountIngredients"]),
    ...mapActions("builder", ["getIngredientsData"]),

    draggable(item) {
      if (item.count < 3) {
        return "draggable";
      } else return;
    },
    itemCount(label, count) {
      let item = { label: label, count: count };
      this.setCountIngredients(item);
    },

    changeSauce(sauce) {
      this.setCurrentSauce(sauce);
    },

    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("item", item);
    },
  },
};
</script>
