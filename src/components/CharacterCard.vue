<script setup lang="ts">
import { computed } from 'vue'
import { Character } from '../interfaces'
import { getImgPath } from '../utils/utils'

// Props
interface Props {
  character: Character
}

// Defaults
const props = withDefaults(defineProps<Props>(), {
  character: undefined
})

const imgPath = computed(() => getImgPath(props.character))
</script>

<template>
  <article class="c-character-card">
    <div class="c-character-card__header">
      <img class="c-character-card__image" :src="imgPath" :alt="props.character.name">
    </div>
    <h4 class="c-character-card__title">{{ props.character.name }}</h4>
  </article>
</template>

<style lang="scss">
.c-character-card {
  display: flex;
  flex-direction: column;

  &__header {
    position: relative;
    width: 100%;
    height: 6rem;
    overflow: hidden;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
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
    font-size: 1.15rem;
  }
}
</style>