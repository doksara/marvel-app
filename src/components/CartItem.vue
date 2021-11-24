<template>
  <li class="c-cart-item">
    <div class="c-cart-item__imagecontainer">
      <img class="c-cart-item__image" :src="imgPath" :alt="props.comic.title">
    </div>
    <div class="flex flex-col items-start ml-4">
      <div class="flex justify-between items-center w-full">
        <h3 class="c-cart-item__title">{{ props.comic.title }}</h3>
        <button
          class="c-cart-item__remove"
          type="button"
          aria-label="Remove from cart"
          @click="$emit('removeFromCart', props.comic.id)"
        >
          &times;
        </button>
      </div>
      <p class="c-cart-item__code">{{ props.comic.diamondCode ? props.comic.diamondCode : 'No code available.' }}</p>
      <div class="flex my-2">
        <p class="c-cart-item__tag mr-2">{{ props.comic.pageCount }} pages</p>
        <p class="c-cart-item__tag">{{ props.comic.variants?.length }} variants</p>
      </div>
      <div class="flex justify-between items-center w-full">
        <button 
          class="c-cart-item__addtowatchlist"
          type="button"
          @click="$emit('addToWatchlist', props.comic.id)"
        >
          <span>Add to Watchlist</span>
          <svg class="c-cart-item__addtowatchlist-icon">
            <use xlink:href="../assets/icons/symbol-defs.svg#icon-book-open" />
          </svg>
        </button>
        <p class="c-cart-item__price">{{ basePrice }}</p>
      </div>
    </div>
    <div>
    </div>
  </li>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { computed, onMounted } from 'vue';
import { Comic } from '../interfaces';
import { getBasePrice, getImgPath } from '../utils/utils';

// Props
interface Props {
  comic: Comic
}

onMounted(() => {
  console.log(props.comic)
})

// Defaults
const props = withDefaults(defineProps<Props>(), {
  comic: undefined
})

const imgPath = computed(() => getImgPath(props.comic))
const basePrice = computed(() => getBasePrice(props.comic))

const emit = defineEmits(['removeFromCart', 'addToWatchlist']);

</script>

<style lang="scss">
@use '../styles/abstracts' as abs;

.c-cart-item {
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 1em 0;

  &:not(:last-child) {
    margin-bottom: 1em;
  }

  &__imagecontainer {
    position: relative;
    width: 100%;
    height: 10rem;
    overflow: hidden;
  }

  &__image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 100%;
    transition: transform .1s linear;
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
    max-width: 30ch;
    white-space: nowrap;
        overflow: hidden;
    text-overflow: ellipsis;
  }

  &__code {
    line-height: 1;
    margin-top: -.15rem;
    color: abs.$warm-grey-300;
  }

  &__tag {
    font-size: 1.15rem;
    font-weight: bold;
    padding: .3rem;

    &::before {
      content: '\2756';
      margin-right: .2rem;
    }
  }

  &__addtowatchlist {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  
    background: abs.$yellow-vivid-500;
    padding: .35rem abs.$spacing-md;
    font-weight: 500;
    transition: all .3s ease;
    outline: none;

    border-radius: abs.$border-radius-sm;
    border-width: 1px;
    border-style: solid;
    color: abs.$warm-grey-050;

    &-icon {
      width: 1em;
      height: 1em;
      fill: white;
      margin-left: .5em;
    }
  }

  &__price {
    font-size: 2rem;
  }

  &__remove {
    @include abs.default-button-appearance;
    cursor: pointer;

    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    line-height: 1;
    font-size: 48px;
  }
}
</style>