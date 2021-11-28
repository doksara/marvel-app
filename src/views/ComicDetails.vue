<script setup lang="ts">
import { onMounted } from '@vue/runtime-core'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useComicsClient } from '../api/useComicsClient'
import { Character, Comic } from '../interfaces'
import { getBasePrice, getImgPath } from '../utils/utils'
import { useCartStore } from '../store/cartStore'
import { useWatchlistStore } from '../store/watchlistStore'
import BaseButton from '../components/BaseButton.vue'
import BaseNavbar from '../components/BaseNavbar.vue'
import Carousel from '../components/Carousel.vue'
import CharacterCard from '../components/CharacterCard.vue'
import { useGlobalStore } from '../store/globalStore'

// Lifecycle methods
onMounted(async () => {
  const { comicData, fetchSingleComic, fetchComicCharacters } = comicsClient
  const selectedComicId = route.params.id as string

  if (comicData && comicData[selectedComicId]) {
    selectedComic.value = comicData[selectedComicId]
  } else { 
    selectedComic.value = await fetchSingleComic(selectedComicId)
  }

  selectedComicCharacters.value = await fetchComicCharacters(selectedComicId)
})

// Composables and externals
const cartStore = useCartStore()
const globalStore = useGlobalStore()
const watchlistStore = useWatchlistStore()
const comicsClient = useComicsClient()
const route = useRoute()

// Local state
let selectedComic = ref({} as Comic)
let selectedComicCharacters = ref([] as Array<Character>)

// Computed
const imgPath = computed(() => getImgPath(selectedComic.value))
const basePrice = computed(() => getBasePrice(selectedComic.value))

// Methods 
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


</script>

<template>
  <Carousel />
  <BaseNavbar />
  <div class="container mx-auto px-48 pb-10 u-bg-white">
    <div class="v-comic-details">
      <div>
        <div class="flex justify-between items-end">
          <h2 class="t-heading-secondary">{{ selectedComic.title }}</h2>
          <p class="t-text-faded">{{ selectedComic.diamondCode ? selectedComic.diamondCode : 'No code available.' }}</p>
        </div>
        <hr class="v-comic-details__divider"/>
        <section class="v-comic-details__details">
          <dl class="">
            <div class="v-comic-details__entry">
              <dt class="v-comic-details__entry-label">Description</dt>
              <dd class="v-comic-details__entry-data">
                {{ selectedComic.description ? selectedComic.description : 'No description available.' }}
              </dd>
            </div>
            <div class="v-comic-details__entry">
              <dt class="v-comic-details__entry-label">Page count</dt>
              <dd class="v-comic-details__entry-data">
                {{ selectedComic.pageCount ? selectedComic.pageCount : 'No page count available.' }}
              </dd>
            </div>
            <div class="v-comic-details__entry">
              <dt class="v-comic-details__entry-label">Format</dt>
              <dd class="v-comic-details__entry-data">
                {{ selectedComic.format ? selectedComic.format : 'No format available.' }}
              </dd>
            </div>
            <div class="v-comic-details__entry">
              <dt class="v-comic-details__entry-label">Price from</dt>
              <dd class="v-comic-details__entry-data">
                {{ basePrice ? basePrice : 'No price range available.' }}
              </dd>
            </div>
            <div class="v-comic-details__entry">
              <dt class="v-comic-details__entry-label">Text objects</dt>
              <dd class="v-comic-details__entry-data">
                <p v-for="textObject in selectedComic.textObjects">{{ textObject.text }}</p>
              </dd>
            </div>
          </dl>
        </section>
        <section class="v-comic-details__characters">
          <h3 class="t-heading-tertiary my-3">Characters</h3>
          <p v-if="selectedComicCharacters.length < 1" class="text-left -mt-2">No character data available.</p>
          <div v-else class="grid grid-cols-4 gap-2">
            <CharacterCard
              v-for="character in selectedComicCharacters" 
              :character="character" 
            />
          </div>
        </section>
      </div>
      <div class="v-comic-details__imagecontainer">
        <img class="v-comic-details__image" :src="imgPath" :alt="selectedComic.title">
        <div class="grid grid-cols-2 gap-3 mt-3">
          <BaseButton 
            text="Add to Cart"
            type="button"
            class="w-full"
            size="large"
            @click="addToCart(selectedComic)"
          ><svg>
              <use xlink:href="../assets/icons/symbol-defs.svg#icon-shopping-cart" />
            </svg>
          </BaseButton>
          <BaseButton 
            text="Add to Watchlist"
            type="button"
            class="w-full"
            buttonStyle="success"
            size="large"
            @click="addToWatchlist(selectedComic)"
          ><svg>
            <use xlink:href="../assets/icons/symbol-defs.svg#icon-book-open" />
          </svg>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;

.v-comic-details {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: abs.$border-radius-sm;
  box-shadow: abs.$box-shadow-sm;

  &__details {
    display: flex;
    flex-direction: column;
    font-size: 1.15em;
  }

  &__divider {
    background: rgba(255, 255, 255, 0.1);
    margin: 1rem auto;
    width: 100%;
  }

  &__entry {
    display: flex;

    &-label {
      color: abs.$warm-grey-800;
      opacity: .5;
      flex-shrink: 0;
      margin-right: .3em;
      width: 100px;
      text-align: left;

      &::before {
        content: '\2756';
        margin-right: .2rem;
      }

      &::after {
        content: ': ';
      }
    } 

    &-data {
      text-align: left;
    }
  }

  &__characters {

  }

  &__imagecontainer {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__image {
    display: block;
    width: 100%;
  }
}
</style>