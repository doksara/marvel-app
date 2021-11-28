<script setup lang="ts">
import { computed } from 'vue'
import { Comic } from '../interfaces'
import { getBasePrice, getImgPath } from '../utils/utils'

// Props
interface Props {
  comic: Comic
}

// Defaults
const props = withDefaults(defineProps<Props>(), {
  comic: undefined
})

// Local state and computed values
const imgPath = computed(() => getImgPath(props.comic))
const basePrice = computed(() => getBasePrice(props.comic))

const emit = defineEmits(['addToCart', 'addToWatchlist'])
</script>

<template>
  <article class="c-card shadow-md">
    <div class="c-card__header">
      <router-link :to="`/comics/${props.comic?.id}`">
        <img class="c-card__thumbnail" :src="imgPath" :alt="props.comic?.title" />
      </router-link>
    </div>
    <div class="c-card__footer">
      <h3 class="c-card__title">{{ props.comic?.title }}</h3>
      <p class="c-card__price">{{ basePrice }}</p>
      <div class="c-card__actions">
        <button @click="$emit('addToCart')" class="c-card__button shadow-sm" title="Add to Cart">
          <svg class="c-card__button-icon">
            <use xlink:href="../assets/icons/symbol-defs.svg#icon-shopping-cart" />
          </svg>
        </button>
        <button @click="$emit('addToWatchlist')" class="c-card__button shadow-sm" title="Add to Watchlist">
          <svg class="c-card__button-icon">
            <use xlink:href="../assets/icons/symbol-defs.svg#icon-book-open" />
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.c-card {
  position: relative;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:hover &__actions {
    top: 0;
  }

  &:hover &__thumbnail {
    transform: translate(-50%, -50%) scale(1.05);
  }
  
  &__header {
    position: relative;
    width: 100%;
    height: 14rem;
    overflow: hidden;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  &__thumbnail {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 100%;
    transition: transform .1s linear;
  }

  &__footer {
    position: relative;
    color: #fff;
    text-align: left;
    overflow: hidden;
    padding: 8px 0 8px 8px;
    --tw-bg-opacity: 1;
    background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
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

    &:not(:last-child) {
      margin-right: 0.5rem;
    }

    &:hover {
      background-color: #e33943;
      border-color: #e33943;
    }

    &:hover &-icon {
      fill: white;
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