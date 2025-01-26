src/views/ResetPasswordView.vue
<script setup lang="ts">
import { ref } from "vue";
import { forgotPassword } from "@/utils/requests/user/forgotPasword";
import { resetPassword } from "@/utils/requests/user/reserPassword";

const token = ref("");
const email = ref("");
const newPassword = ref("");
const responseMessage = ref("");
const loading = ref(false);
const tokenRequested = ref(false);

const handleRequestToken = async () => {
  responseMessage.value = ``;
  loading.value = true;

  console.log("Forgot attempt:", {
    email: email.value,
  });

  if (!email.value) return;

  let response;
  try {
    response = await forgotPassword({ email: email.value });
    tokenRequested.value = true;
  } catch (e) {
    console.log("Error requesting token:", e);
    responseMessage.value = "Ошибка при запросе токена. Попробуйте снова.";
  }

  console.log("Response for Forgot: response", response);
  loading.value = false;
};

const handleResetPassword = async () => {
  responseMessage.value = ``;
  loading.value = true;

  let response;
  try {
    response = await resetPassword({
      token: token.value,
      password: newPassword.value,
    });
    responseMessage.value = "Пароль успешно сброшен!";
  } catch (e) {
    console.log("Error resetting password:", e);
    responseMessage.value = "Ошибка при сбросе пароля. Попробуйте снова.";
  }
  console.log("Response for resetPassword: response", response);
  loading.value = false;
};
</script>

<template>
  <div class="container">
    <h1>Сброс пароля</h1>
    <p v-if="!tokenRequested">Запросите токен для сброса пароля:</p>
    <p v-else>Введите новый пароль:</p>

    <div v-if="!tokenRequested" class="form-container">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        variant="outlined"
        prepend-inner-icon="mdi-email"
        class="mb-4"
      ></v-text-field>
      <v-btn
        @click="handleRequestToken"
        :loading="loading"
        color="blue"
        style="margin: 0 auto"
        >Запросить токен</v-btn
      >
    </div>

    <div v-if="tokenRequested">
      <v-text-field
        v-model="token"
        label="Токен"
        variant="outlined"
        class="mb-4"
      ></v-text-field>

      <v-text-field
        v-model="newPassword"
        label="Новый пароль"
        type="password"
        variant="outlined"
        class="mb-4"
      ></v-text-field>

      <v-btn @click="handleResetPassword" :loading="loading" color="blue"
        >Сбросить пароль</v-btn
      >
    </div>

    <div class="text-center mb-4 error-message" v-if="responseMessage">
      <span class="text-red">{{ responseMessage }}</span>
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

.form-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.error-message {
  color: red;
}
</style>
