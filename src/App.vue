<template>
  <main>
    <Carousel />
    <BaseNavbar />
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import Carousel from './components/Carousel.vue';
import BaseNavbar from './components/BaseNavbar.vue';
</script>

<style>
#app {
  font-family: 'Marvel', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgba(0, 0, 0, .80);
  color: #2c3e50;
  min-height: 100vh;
}
</style>
