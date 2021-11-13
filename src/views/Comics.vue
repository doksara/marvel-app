<template>
  <ComicCard v-for="comic in comicData" :key="comic.id" :comic="comic" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useComicsClient } from '../api/useComicsClient'
import ComicCard from '../components/ComicCard.vue'

export default defineComponent({
  components: {
    ComicCard
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
