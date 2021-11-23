<template>
  <li class="c-cart-item">
    <img class="c-cart-item__image" :src="imgPath" :alt="props.comic.title">
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Comic } from '../interfaces';
import { getBasePrice, getImgPath } from '../utils/utils';

// Props
interface Props {
  comic: Comic
}

// Defaults
const props = withDefaults(defineProps<Props>(), {
  comic: undefined
})

const imgPath = computed(() => getImgPath(props.comic))
const basePrice = computed(() => getBasePrice(props.comic))

const emit = defineEmits(['removeFromCart']);

</script>

<style lang="scss">
@use '../styles/abstracts' as abs;

.c-cart-item {
  padding: 1em 0;

  &:not(:last-child) {
    margin-bottom: 1em;
  }

  &__image {
    width: 30%;
  }
}
</style>