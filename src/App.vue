<script setup lang="ts">
import frame from "./assets/images/png/frame.png";
import { computed, ref } from "vue";
import MenuBottom from "./components/organisms/MenuBottom.vue";

const screenSize = ref(window.innerWidth);

const isMobile = computed(() => {
  return screenSize.value > 490 ? false : true;
});
</script>

<template>
  <div v-if="!isMobile" class="desktop-view">
    <img :src="frame" />
    <div class="content"><RouterView /> <MenuBottom /></div>
  </div>
  <div v-else><RouterView /> <MenuBottom /></div>
</template>

<style scoped>
.desktop-view {
  position: relative;
  max-width: 490px;
  margin: 0 auto;
  overflow: hidden;
}
.desktop-view img {
  width: 100%;
  display: block;
  z-index: 5;
  position: relative;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 60px 20px 20px ;
  z-index: 6;
  box-sizing: border-box;
}
</style>
