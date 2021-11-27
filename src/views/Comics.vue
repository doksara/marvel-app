<script setup lang="ts">
import { onMounted } from 'vue'
import { useComicsClient } from '../api/useComicsClient'
import { Comic } from '../interfaces'
import { useCartStore } from '../store/cartStore'
import { useWatchlistStore } from '../store/watchlistStore'
import { useGlobalStore } from '../store/globalStore'
import Carousel from '../components/Carousel.vue'
import BaseNavbar from '../components/BaseNavbar.vue'
import BaseButton from '../components/BaseButton.vue'
import ComicCard from '../components/ComicCard.vue'
import Spinner from '../components/Spinner.vue'

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

const loadMoreComics = async () => {
  await fetchComics()
}

onMounted(async () => {
  if (!comicData) {
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

<template>
  <Carousel />
  <BaseNavbar />
  <div class="v-comics container mx-auto px-48">
    <div v-if="isLoading" class="flex flex-col items-center justify-center">
      <Spinner />
    </div>
    <div class="grid grid-cols-4 gap-x-5 gap-y-10">
      <ComicCard 
        v-for="comic in comicData" 
        :key="comic.id" 
        :comic="comic"
        @add-to-cart="addToCart(comic)"
        @add-to-watchlist="addToWatchlist(comic)" 
      />
    </div>
    <div>
      <BaseButton
        text="Load more comics"
        type="button"
        class="mt-6"
        :is-loading="isLoading"
        @click="loadMoreComics"
      ></BaseButton>
    </div>
  </div>
</template>

<style lang="scss">
.v-comics {
  padding-bottom: 2rem;
}
</style>