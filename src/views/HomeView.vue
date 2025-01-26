<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { logoutUser } from "@/utils/requests/user/logout";

const loading = ref(false);

const handleLogout = async () => {
  let response;
  const userStore = useUserStore();

  loading.value = true;
  try {
    response = await logoutUser();

    if (response.success) {
      localStorage.clear();

      window.location.replace(`/welcome`);
      userStore.$reset();
    }
  } catch (e) {
    console.log("Error for login: response", e);
  }

  loading.value = false;
  console.log("Response for login: response", response);
};
</script>

<template>
  <div class="container">
    <v-btn
      icon="mdi-arrow-right"
      color="blue"
      @click="handleLogout"
      :loading="loading"
      >!!</v-btn
    >
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
</style>
