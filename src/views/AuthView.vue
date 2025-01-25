<script setup lang="ts">
import { ref } from 'vue'
import logo from '@/assets/images/svg/logo.svg'

import { useUserStore } from '@/stores/user'
import { loginUser } from '@/utils/requests/login'

const email = ref('')
const password = ref('')
const showPassword = ref(false)


const responseMessage = ref('')

const handleLogin = async () => {
  console.log('Login attempt:', { email: email.value, password: password.value })

  let response

  try {
    response = await loginUser({ email: email.value, password: password.value })
    if (response?.token) {
      // save user
      const userStore = useUserStore()
      userStore.setToken(response.token)
      userStore.setUser(response.user)

      console.log(userStore, 'userStore')

      // setTimeout(() => {
      //   window.location.replace('/')
      //   clearTimeout(this)
      // }, 3000)

    }
  } catch (e) {
    console.log('Error for login: response', e)
    responseMessage.value = 'Error. Try again later.'
  }

  console.log('Response for login: response', response)
}
</script>

<template>
  <div class="container">
    <div class="header-container">
      <img :src="logo" alt="logo" class="logo" />
    </div>

    <div class="form-container">
      <h1>Welcome Back!</h1>
      <p>Sign in to continue planning</p>

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
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          class="mb-6"
        ></v-text-field>

        <v-btn type="submit" color="red" block size="large" class="mb-4"> Login </v-btn>
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
            <span class="text-grey">Don't have an account? </span>
            <span class="text-red">Register</span>
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

