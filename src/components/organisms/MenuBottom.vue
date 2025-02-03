<script setup lang="ts">
import { watch, useTemplateRef } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { debounce } from "@/utils/helpers/debounce";

const store = useUserStore();
const menu = useTemplateRef("menu");
const { isAuthenticated } = storeToRefs(store);
const route = useRoute();

const menuItems = [
  { value: "/", svg: "home" },
  { value: "/map", svg: "map" },
  { value: "/routes", svg: "directions" },
  { value: "/settings", svg: "account" },
];

let shouldDisplayMenu = false;

const updateMenuVisibility = () => {
  shouldDisplayMenu = isAuthenticated.value && !route.meta?.HideMenuBottom;

  if (!shouldDisplayMenu) {
    menu?.value?.classList.add("hidden-menu");
  } else {
    showMenu();
  }
};

const showMenu = debounce(() => {
  menu?.value?.classList.remove("hidden-menu");
}, 200);

watch(route, updateMenuVisibility, { immediate: true });
</script>

<template>
  <div class="container hidden-menu" v-if="shouldDisplayMenu" ref="menu">
    <RouterLink
      :to="item.value"
      class="text-decoration-none"
      v-for="item in menuItems"
      :key="item.value"
    >
      <v-btn :icon="`mdi-${item.svg}`"></v-btn>
    </RouterLink>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: auto;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0px;
  width: 100%;
  min-height: 72px;
  box-sizing: border-box;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.1);
  z-index: 7;
  transition: 0.5s;
  padding: 16px 40px;
}
.hidden-menu {
  bottom: -80px;
  transition: 0.5s;
}
.router-link-exact-active .v-btn {
  background-color: aliceblue;
}
@media (min-width: 490px) {
  .container {
    max-width: 449px;
    bottom: 13px;
    border-bottom-left-radius: 123px;
    border-bottom-right-radius: 123px;
    left: 20px;
  }
}
</style>
