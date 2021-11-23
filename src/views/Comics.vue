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
        @add-to-watchlist="addToWatchlist(comic)" 
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
import { useGlobalStore } from '../store/globalStore'

const { isLoading, error, comicData, fetchComics } = useComicsClient()
const cartStore = useCartStore()
const watchlistStore = useWatchlistStore()
const globalStore = useGlobalStore()

const addToCart = (comic: Comic) => {
  cartStore.addToCart(comic)

  globalStore.pushNotification({
    message: `Added ${comic.title} to cart (1 items).`,
    type: 'success'
  })
}

const addToWatchlist = (comic: Comic) => {
  watchlistStore.addToWatchlist(comic)

  globalStore.pushNotification({
    message: `Added ${comic.title} to watchlist.`,
    type: 'success'
  })
}

onMounted(async () => {
  if (!comicData.value) {
    await fetchComics()

    if (error.value) {
      globalStore.pushNotification({
        message: error.value,
        type: 'error'
      })
    }
  }
})
</script>
