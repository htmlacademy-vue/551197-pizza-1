<template>
  <div class="sign-form">
    <a data-test="close" class="close close--white" @click="closeDialog">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <AppInput
            ref="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            :error-text="validations.email.error"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <AppInput
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
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
import AppInput from "@/common/components/AppInput";

export default {
  name: "Login",
  mixins: [validator],
  components: { AppInput },
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
    this.$refs.email.$refs.input.focus();
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
    closeDialog() {
      this.$router.push("/");
    },
  },
};
</script>
