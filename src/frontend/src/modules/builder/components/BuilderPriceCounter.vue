<template>
  <div class="content__result">
    <p>Итого: {{ getPrice }} ₽</p>
    <button type="button" class="button">Готовьте!</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("builder", ["getPrice"]),
  },
  methods: {
    ...mapMutations("builder", ["setCountIngredients"]),
  },
};
</script>
