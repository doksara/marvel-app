<template>
  <main>
    <Carousel />
    <div class="container">
      <BaseNavbar />
    </div>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import Carousel from '../components/Carousel.vue';
import BaseNavbar from '../components/BaseNavbar.vue';
</script>