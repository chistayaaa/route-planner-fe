<script setup lang="ts">
import { ref } from "vue";
import logo from "@/assets/images/svg/logo.svg";

import { registerUser } from "@/utils/requests/user/register";

const name = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

const responseMessage = ref("");
const userRegistered = ref(false);
const count = ref(5);

const handleRegister = async () => {
  responseMessage.value = ``;
  console.log("Register attempt:", {
    name: name.value,
    email: email.value,
    password: password.value,
  });

  let response;
  loading.value = true;

  try {
    response = await registerUser({
      email: email.value,
      password: password.value,
      name: name.value,
    });

    if (response?.id) {
      userRegistered.value = true;
      setInterval(() => {
        count.value--;
        if (count.value <= 0) {
          clearInterval(this);
          window.location.href = "/login";
        }
      }, 1000);
    }
  } catch (e) {
    console.log("Error for register: response", e);
    responseMessage.value = `${e}`;
  }

  loading.value = false;
  console.log("Response for register: response", response);
};
</script>

<template>
  <div class="container">
    <div class="header-container">
      <img :src="logo" alt="logo" class="logo" />
    </div>

    <div class="form-container">
      <h1>Начни планировать свой маршрут</h1>
      <p>Создайте аккаунт, чтобы продолжить</p>

      <v-form
        @submit.prevent="handleRegister"
        class="register-form"
        v-if="!userRegistered"
      >
        <v-text-field
          v-model="name"
          label="Имя"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Пароль"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          class="mb-6"
        ></v-text-field>

        <v-btn
          type="submit"
          color="blue"
          block
          size="large"
          class="mb-4"
          :loading="loading"
        >
          Зарегистрироваться
        </v-btn>

        <div class="text-center mb-4 error-message" v-if="responseMessage">
          <span class="text-red">{{ responseMessage }}</span>
        </div>

        <div class="text-center mb-4" style="display: none">
          <span class="text-grey">or sign up with</span>
        </div>

        <div class="social-buttons" style="display: none">
          <v-btn variant="outlined" class="social-btn">
            <v-icon>mdi-google</v-icon>
          </v-btn>
          <v-btn variant="outlined" class="social-btn">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn variant="outlined" class="social-btn">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </div>

        <div class="text-center mt-4">
          <RouterLink to="/login" class="text-decoration-none">
            <span class="text-grey">Уже есть аккаунт? </span>
            <span class="text-blue">Войти в профиль</span>
          </RouterLink>
        </div>
      </v-form>
      <div v-else class="success-container">
        <p class="success-message text-blue" style="font-weight: bold">
          Пользователь успешно зарегистрирован
        </p>
        <div>Редирект на страницу авторизации {{ count }} секунд...</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo {
  height: 40px;
  object-fit: contain;
}

.form-container {
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.register-form {
  padding: 1rem;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

:deep(.v-field) {
  border-radius: 12px;
}

:deep(.v-btn) {
  border-radius: 12px;
}

.success-container {
  border-radius: 16px;
  border: 1px solid #e5e6e7;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 24px 12px;
}
</style>
