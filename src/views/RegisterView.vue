<script setup lang="ts">
import { ref } from 'vue'
import logo from '@/assets/images/svg/logo.svg'

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleRegister = () => {
  // Здесь будет логика регистрации
  console.log('Register attempt:', {
    name: name.value,
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <div class="container">
    <div class="header-container">
      <img :src="logo" alt="logo" class="logo" />
    </div>

    <div class="form-container">
      <h1>Start planning your routes now!</h1>
      <p>Create your account to continue</p>

      <v-form @submit.prevent="handleRegister" class="register-form">
        <v-text-field
          v-model="name"
          label="Name"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="Email Address"
          type="email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          class="mb-6"
        ></v-text-field>

        <v-btn type="submit" color="red" block size="large" class="mb-4"> Sign Up </v-btn>

        <div class="text-center mb-4" style="display: none;">
          <span class="text-grey">or sign up with</span>
        </div>

        <div class="social-buttons" style="display: none;">
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
            <span class="text-grey">Already have an account? </span>
            <span class="text-red">Login</span>
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
</style>
