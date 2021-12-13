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
              <AppDrag :transferData="item">
                <span
                  class="filling"
                  :class="
                    'filling--' +
                    item.image
                      .replace('.svg', '')
                      .replace('/public/img/filling/', '')
                  "
                >
                  {{ item.name }}</span
                >
                <ItemCounter :item="item" />
              </AppDrag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "../../../common/components/ItemCounter";
import AppDrag from "../../../layouts/AppDrag";
export default {
  name: "BuulderIngredientSelector",
  components: {
    ItemCounter,
    AppDrag,
  },
  props: {
    sauces: {
      type: Array,
    },

    ingredientsItems: {
      type: Array,
    },
  },

  methods: {
    changeSauce(sauce) {
      console.log(sauce.name);
      this.$emit("changeSauce", sauce);
    },
  },
};
</script>
