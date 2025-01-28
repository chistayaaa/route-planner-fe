src/views/ResetPasswordView.vue
<script setup lang="ts">
import { ref, computed } from "vue";
import logo from "@/assets/images/svg/logo.svg";
import { forgotPassword } from "@/utils/requests/user/forgotPasword";
import { resetPassword } from "@/utils/requests/user/reserPassword";

const token = ref("");
const email = ref("");
const newPassword = ref("");
const newPasswordRepeat = ref("");
const responseMessage = ref("");
const loading = ref(false);
const tokenRequested = ref(false);
const isSuccess = ref(false);
const count = ref(5);

const validPassword = computed(() => {
  return (
    newPassword.value &&
    newPassword.value === newPasswordRepeat.value &&
    newPasswordRepeat.value
  );
});

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
    if (response.token) {
      token.value = response.token;
    }
  } catch (e) {
    console.log("Error requesting token:", e);
    responseMessage.value = "Ошибка при подтверждении email. Попробуйте снова.";
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
      newPassword: newPassword.value,
    });
    isSuccess.value = true;
    setInterval(() => {
      count.value--;
      if (count.value <= 0) {
        clearInterval(this);
        window.location.href = "/login";
      }
    }, 1000);
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
    <div class="header-container">
      <img :src="logo" alt="logo" class="logo" />
    </div>

    <div v-if="!isSuccess" class="main-container">
      <h1>Сброс пароля</h1>
      <p v-if="!tokenRequested">
        Введите email, для которого хотите сбросить пароль:
      </p>
      <p v-else>Введите новый пароль:</p>

      <div v-if="!tokenRequested" class="form-container v-form login-form">
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
          >Проверить email</v-btn
        >
      </div>

      <div v-if="tokenRequested" style="width: 100%">
        <v-text-field
          v-model="newPassword"
          label="Новый пароль"
          type="password"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="newPasswordRepeat"
          label="Подтвердите пароль"
          type="password"
          variant="outlined"
          class="mb-4"
        ></v-text-field>

        <p
          v-if="!validPassword && newPassword && newPasswordRepeat"
          class="mb-4 text-red"
        >
          Значения паролей должны совпалать
        </p>

        <v-btn
          @click="handleResetPassword"
          :loading="loading"
          color="blue"
          :disabled="!validPassword"
          >Сбросить пароль</v-btn
        >
      </div>

      <div class="text-center mt-4">
        <RouterLink to="/login" class="text-decoration-none">
          <span class="text-grey">Вернуться назад </span>
        </RouterLink>
      </div>

      <div class="text-center mb-4 error-message" v-if="responseMessage">
        <span class="text-red">{{ responseMessage }}</span>
      </div>
    </div>
    <div v-else class="success-container">
      <h1 class="text-blue">Пароль успешно сброшен</h1>
      <p>
        Вы будeте перенаправлены на авторизацию через {{ count }} сек...
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  min-height: 100vh;
}

.success-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.logo {
  height: 40px;
  object-fit: contain;
}

.form-container,
.main-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.main-container {
  gap: 12px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.error-message {
  color: red;
}
:deep(.v-field) {
  border-radius: 12px;
}

:deep(.v-btn) {
  border-radius: 12px;
}
</style>
