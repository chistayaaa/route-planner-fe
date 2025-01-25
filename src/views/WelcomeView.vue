<script setup lang="ts">
import manMap from '@/assets/images/png/map-welcome.png'
</script>

<template>
  <div class="container">
    <div class="image-container">
      <span class="gradient"></span>
      <img :src="manMap" alt="man-with-map" />
    </div>
    <div class="text-container">
      <h1>Route Planner</h1>
      <p>Plan your journey efficiently</p>
    </div>
    <RouterLink to="/login"> <v-btn icon="mdi-arrow-right" color="red"></v-btn></RouterLink>
  </div>
</template>

<style>
h1,
p {
  margin: 0;
}
.container {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  gap: 24px;
  margin: 0 auto;
}
.text-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  & h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  & p {
    color: #666;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
}
.gradient {
  position: absolute;
  height: 170px;
  width: 100%;
  background: radial-gradient(circle at center, #1e90ff80, rgb(255, 255, 255));
  filter: blur(50px);
  z-index: 0;
}
.image-container {
  max-width: 270px;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 1;
    position: relative;
  }
}
</style>
