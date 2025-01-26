<script setup lang="ts">
import { ref } from "vue";
import logo from "@/assets/images/svg/logo.svg";

import { useUserStore } from "@/stores/user";
import { loginUser } from "@/utils/requests/user/login";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const responseMessage = ref("");
const loading = ref(false);

const handleLogin = async () => {
  responseMessage.value = ``;
  console.log("Login attempt:", {
    email: email.value,
    password: password.value,
  });

  let response;
  loading.value = true;

  try {
    response = await loginUser({
      email: email.value,
      password: password.value,
    });
    if (response?.token) {
      // save user
      const userStore = useUserStore();
      userStore.setToken(response.token);
      userStore.setUser(response.user);

      console.log(userStore, "userStore");

      setTimeout(() => {
        window.location.replace("/");
        clearTimeout(this);
      }, 3000);
    }
  } catch (e) {
    console.log("Error for login: response", e);
    responseMessage.value = "Что-то пошло не так. Попробуйте снова позже.";
  }

  loading.value = false;
  console.log("Response for login: response", response);
};
</script>

<template>
  <div class="container">
    <div class="header-container">
      <img :src="logo" alt="logo" class="logo" />
    </div>

    <div class="form-container">
      <h1>С возвращением!</h1>
      <p>Войдите, чтобы продолжить планирование</p>

      <v-form @submit.prevent="handleLogin" class="login-form">
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
          :loading="loading"
          type="submit"
          color="blue"
          block
          size="large"
          class="mb-4"
        >
          Продолжить
        </v-btn>
        <div class="text-center mb-4 error-message" v-if="responseMessage">
          <span class="text-red">{{ responseMessage }}</span>
        </div>

        <div class="text-center mb-4">
          <span class="text-grey">or</span>
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
          <RouterLink to="/register" class="text-decoration-none">
            <span class="text-grey">Нет аккаунта? </span>
            <span class="text-blue">Регистрация</span>
          </RouterLink>
        </div>

        <div class="text-center mt-4">
          <RouterLink to="/forgot-password" class="text-decoration-none">
            <span class="text-grey">Забыли пароль? </span>
          </RouterLink>
        </div>
      </v-form>
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
  max-width: 400px;
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

.login-form {
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
</style>
