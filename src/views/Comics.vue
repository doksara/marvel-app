<template>
  <div class="container mx-auto px-48">
    <div v-if="isLoading" class="flex flex-col items-center justify-center">
      <Spinner />
    </div>
    <div v-else class="grid grid-cols-4 gap-x-5 gap-y-10">
      <ComicCard 
        v-for="comic in comicData" 
        :key="comic.id" 
        :comic="comic"
        @add-to-cart="addToCart(comic)"
        @add-to-watchlist="addToWatchlist" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useComicsClient } from '../api/useComicsClient'
import Spinner from '../components/Spinner.vue'
import ComicCard from '../components/ComicCard.vue'
import { Comic } from '../interfaces'
import { useCartStore } from '../store/cartStore'
import { useWatchlistStore } from '../store/watchlistStore'

const { isLoading, error, comicData, fetchComics } = useComicsClient()
const cartStore = useCartStore()
const watchlistStore = useWatchlistStore()

const addToCart = (comic: Comic) => {
  cartStore.addToCart(comic)
}

const addToWatchlist = (comic: Comic) => {
  watchlistStore.addToWatchlist(comic)
}

onMounted(async () => {
  await fetchComics()
})
</script>
