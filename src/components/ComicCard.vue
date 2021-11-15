<template>
  <article class="card shadow-md">
    <div class="card__header">
      <img class="card__thumbnail" :src="imgPath" :alt="comic?.title" />
    </div>
    <div class="card__footer">
      <h3 class="card__title">{{ comic?.title }}</h3>
      <p class="card__price">{{ basePrice }}</p>
      <div class="card__actions">
        <button @click="$emit('addToCart')" class="card__button shadow-sm" title="Add to Cart">
          <svg class="card__button-icon">
            <use xlink:href="../assets/symbol-defs.svg#icon-shopping-cart" />
          </svg>
        </button>
        <button @click="$emit('addToWatchlist')" class="card__button shadow-sm" title="Add to Watchlist">
          <svg class="card__button-icon">
            <use xlink:href="../assets/symbol-defs.svg#icon-book-open" />
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Comic } from '../interfaces'

// Props
interface Props {
  comic: Comic
}

// Defaults
const props = withDefaults(defineProps<Props>(), {
  comic: undefined
})

const emit = defineEmits(['addToCart', 'addToWatchlist']);

// Creates an URL to image by concatenating
// path and extension of thumbnail data
const imgPath = computed(() => {
  if (props.comic.thumbnail) {
    const { path, extension } = props.comic.thumbnail

    return path?.concat('.').concat(extension ? extension : '')
  }

  return ''
})

// Formats the base comic price
const basePrice = computed(() => {
  const { prices } = props.comic
  if (prices && prices[0]) {
    return `${Number(prices[0].price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })}`
  }
})



</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;

  &:hover &__actions {
    top: 0;
  }

  &__header {
    position: relative;
    width: 100%;
    height: 14rem;
    overflow: hidden;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }

  &__thumbnail {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 100%;
  }

  &__footer {
    position: relative;
    color: #fff;
    text-align: left;
    overflow: hidden;
    padding: 8px 0 8px 8px;
    --tw-bg-opacity: 1;
    background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
  }

  &__price {
    font-size: 1.25rem;
    font-weight: 700;
  }

  &__actions {
    position: absolute;
    top: 100%;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;

    transition: top 0.15s ease-out;
    --tw-bg-opacity: 1;
    background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
  }

  &__button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 0.6rem;
    background: white;
    border: 2px solid #ddd;
    border-radius: 8px;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }

    &:hover {
      border-color: #e33943;
    }

    &:hover &-icon {
      fill: #e33943;
    }

    &-icon {
      width: 1.25rem;
      height: 1.25rem;
      fill: #888;
    }
  }

  &__title {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 32ch;
  }
}
</style>