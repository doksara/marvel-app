<template>
  <div class="container mx-auto px-48">
    <div v-if="isLoading" class="flex flex-col items-center justify-center">
      <Spinner />
    </div>
    <div v-else class="grid grid-cols-4 gap-x-5 gap-y-10">
      <ComicCard v-for="comic in comicData" :key="comic.id" :comic="comic" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useComicsClient } from '../api/useComicsClient'
import Spinner from '../components/Spinner.vue'
import ComicCard from '../components/ComicCard.vue'

export default defineComponent({
  components: {
    Spinner,
    ComicCard,
  },
  setup() {
    const { isLoading, error, comicData, fetchComics } = useComicsClient()

    onMounted(async () => {
      await fetchComics()
    })
    
    return {
      isLoading,
      comicData
    }
  },
})
</script>
