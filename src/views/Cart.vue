<template>
  <div class="container mx-auto px-48">
    <div class="grid grid-cols-4 gap-x-5 gap-y-10">
      <ComicCard 
        v-for="comic in cartStore.items" 
        :key="comic.id" 
        :comic="comic"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComicCard from '../components/ComicCard.vue'
import { useCartStore } from '../store/cartStore'

const cartStore = useCartStore()

</script>