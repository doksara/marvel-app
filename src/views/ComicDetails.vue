<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useComicsClient } from '../api/useComicsClient';
import { Comic } from '../interfaces';
import { getImgPath } from '../utils/utils';
import BaseNavbar from '../components/BaseNavbar.vue';
import Carousel from '../components/Carousel.vue';

onMounted(async () => {
  const { comicData, fetchSingleComic } = comicsClient
  const selectedComicId = route.params.id as string;

  if (comicData && comicData[selectedComicId]) {
    selectedComic.value = comicData[selectedComicId]
  } else { 
    selectedComic.value = await fetchSingleComic(selectedComicId)
  }

})

const comicsClient = useComicsClient()
const route = useRoute()
let selectedComic = ref({} as Comic)

const imgPath = computed(() => {
  if (selectedComic.value) {
    return getImgPath(selectedComic.value)
  }
})

</script>

<template>
  <Carousel />
  <BaseNavbar />
  <div class="container mx-auto px-48 pb-10 u-bg-white">
    <div class="v-comic-details">
      <div class="flex justify-between">
        <h2 class="t-heading-secondary">{{ selectedComic.title }}</h2>
        <p>{{ selectedComic.diamondCode ? selectedComic.diamondCode : 'No code available.' }}</p>
      </div>
      <hr class="v-comic-details__divider"/>
      <div class="v-comic-details__details">
        <div>
          <p>Description: {{ selectedComic.description ? selectedComic.description : 'No description available.' }}</p>
          <p>Page count: {{ selectedComic.pageCount ? selectedComic.pageCount : 'No page count available.' }}</p>
        </div>
        <div class="c-comic-details__imagecontainer">
          <img class="c-comic-details__image" :src="imgPath" :alt="selectedComic.title">
        </div>
      </div>  
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;

.v-comic-details {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;

  &__details {
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin-right: 1em;
  }

  &__divider {
    background: rgba(255, 255, 255, 0.1);
    margin: 1rem auto;
    width: 100%;
  }
}
</style>