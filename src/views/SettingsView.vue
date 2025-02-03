<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { updateUser } from "@/utils/requests/user/update";
import { postImage } from "@/utils/requests/media/postImage";

const store = useUserStore();
const { user } = storeToRefs(store);
const { id } = storeToRefs(store);

const name = ref(user.value?.name);
const email = ref(user.value?.email);
const city = ref(user.value?.location);
const phone = ref(user.value?.phone);
const loading = ref(false);
const image = ref(`${import.meta.env.VITE_PAYLOAD_API_URL}/${user.value?.image?.url}`);
const avatar = ref<File | null>(null);

console.log("User", user.value);
console.log("image", image);

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    avatar.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target?.result, "e.target?.result");
      image.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    avatar.value = null;
    image.value = "";
  }
};

const updateProfile = async () => {
  console.log("Профиль обновлен:", {
    email: email.value,
    city: city.value,
    phone: phone.value,
    name: name.value,
    avatar: avatar.value,
  });

  const body = {
    email: email.value ?? "",
    location: city.value ?? "",
    phone: phone.value ?? "",
    name: name.value ?? "",
  };

  if (avatar.value) {
    // upload the image
    const fileFormData = new FormData();
    fileFormData.append("file", avatar.value);
    fileFormData.append("userId", id.value || "");
    const response = await postImage(fileFormData);
    console.log(response, "response");
    if (response?.errors) {
      alert("Error in uploading the image, try again");
    }
  }

  let response;
  loading.value = true;

  try {
    response = await updateUser({
      data: { ...body },
      id: id.value ?? "",
    });

    if (response) {
      store.setUser(response);
    }
  } catch (e) {
    console.log("Error for register: response", e);
  }

  loading.value = false;
  console.log("Response for register: response", response);
};
</script>

<template>
  <v-container>
    <div class="avatar-conatiner">
      <v-file-input
        label="File input"
        class="avatar-input"
        accept="image/*"
        @change="handleFileChange"
        v-model="avatar"
      >
      </v-file-input>
      <v-avatar
        color="surface-variant"
        size="80"
        :style="{
          backgroundImage: image ? `url(${image})` : 'unset',
        }"
      ></v-avatar>
    </div>

    <v-form @submit.prevent="updateProfile" class="form-container">
      <v-text-field
        v-model="name"
        label="Имя"
        variant="outlined"
        prepend-inner-icon="mdi-account"
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        variant="outlined"
        prepend-inner-icon="mdi-email"
      ></v-text-field>

      <v-text-field
        v-model="city"
        label="Город"
        required
        variant="outlined"
        prepend-inner-icon="mdi-city"
      ></v-text-field>

      <v-text-field
        v-model="phone"
        label="Номер телефона"
        type="tel"
        required
        variant="outlined"
        prepend-inner-icon="mdi-phone"
      ></v-text-field>

      <v-btn type="submit" color="blue" class="submit-button" :loading="loading"
        >Сохранить изменения</v-btn
      >
    </v-form>
  </v-container>
</template>

<style scoped>
.v-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  height: 100%;
  padding-top: 40px;
  padding-bottom: 110px;
}

.avatar-conatiner {
  position: relative;
}

.avatar-input {
  opacity: 0;
  position: absolute;
  width: 80px;
  height: 80px;
  z-index: 1;
}

.v-avatar {
  background-size: cover;
}

.form-container {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.v-text-field {
  height: min-content;
  flex-grow: 0;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.submit-button {
  margin-top: auto;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

:deep(.v-field) {
  border-radius: 12px;
}

:deep(.v-btn) {
  border-radius: 12px;
}
</style>
