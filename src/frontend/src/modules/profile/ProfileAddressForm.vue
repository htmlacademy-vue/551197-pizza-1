<template>
  <div :key="address.id" class="layout__address">
    <form
      class="address-form address-form--opened sheet"
      @submit.prevent="saveAddress"
    >
      <div class="address-form__header">
        <b>{{ title }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              v-model="name"
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="street"
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="building"
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="flat"
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              v-model="comment"
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>
      <div class="address-form__buttons">
        <button
          v-if="isAddressEdited"
          type="submit"
          class="button button--transparent"
          data-test="delete-button"
          @click="deleteAddress(address.id)"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProfileAddressForm",
  props: {
    address: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isAddressEdited() {
      return !!this.address.id;
    },
    title() {
      return this.address.id ? `Адрес №${this.address.id}` : "Новый адрес";
    },
  },

  mounted() {
    if (this.isAddressEdited) {
      this.name = this.address.name;
      this.street = this.address.street;
      this.building = this.address.building;
      this.flat = this.address.flat;
      this.comment = this.address.comment;
    }
  },

  data() {
    return {
      id: null,
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  },

  methods: {
    ...mapActions("addresses", ["addAddress", "editAddress", "deleteAddress"]),

    saveAddress($event) {
      const address = {
        ...this.address,
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,

        userId: this.user.id,
      };
      if (this.isAddressEdited) {
        this.editAddress(address);
      } else {
        this.addAddress(address);
      }
      $event.target.submit();
    },
  },
};
</script>
