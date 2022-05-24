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
              <ItemCounter @itemCount="itemCount" :item="item" />
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

import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "BuulderIngredientSelector",
  components: {
    ItemCounter,
    SelectorItem,
  },
  props: {
    ingredientsItems: {
      type: Array,
      require: true,
    },
  },
  computed: {
    ...mapState("builder", ["currentSauce"]),
    ...mapGetters("builder", ["labeledlSauces"]),
  },
  methods: {
    ...mapMutations("builder", ["setCurrentSauce"]),

    draggable(item) {
      if (item.count < 3) {
        return "draggable";
      } else return;
    },
    itemCount(label, count) {
      this.$emit("changeCount", label, count);
    },

    changeSauce(sauce) {
      this.setCurrentSauce(sauce);
      // this.$emit("changeSauce", sauce);
    },

    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("item", item);
    },
  },
};
</script>
