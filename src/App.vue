<template>
  <main>
    <router-view></router-view>
    <NotificationList :list="globalStore.notifications" />
  </main>
</template>

<script setup lang="ts">
import NotificationList from './components/NotificationList.vue';
import { useGlobalStore } from './store/globalStore';

const globalStore = useGlobalStore()

</script>

<style lang="scss">
@use './styles/abstracts' as abs;

#app {
  font-family: 'Marvel', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: abs.$warm-grey-100;
  color: #2c3e50;

  min-height: 100%;
}

html, body, main {
  min-height: 100vh;
}
</style>
