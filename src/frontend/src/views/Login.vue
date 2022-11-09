<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            ref="email"
            v-model="email"
            name="email"
            placeholder="example@mail.ru"
            autocomplete="off"
            :error-text="validations.email.error"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password"
            name="pass"
            placeholder="***********"
            autocomplete="off"
            :error-text="validations.password.error"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";
import { mapActions } from "vuex";

export default {
  name: "Login",
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  watch: {
    email() {
      this.$clearValidationError("email");
    },
    password() {
      this.$clearValidationError("password");
    },
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async onSubmit() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      await this.login({
        email: this.email,
        password: this.password,
      });
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss"></style>
