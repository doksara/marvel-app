<template>
  <article class="card">
    <img class="card__thumbnail" :src="imgPath" :alt="comic.title">
    <h3 class="card__title">{{ comic.title }}</h3>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Comic } from '../interfaces'

export default defineComponent({
  props: {
    comic: {
      type: Object as () => Comic,
      required: true
    }
  },
  setup(props) {
    // Creates an URL to image by concatenating
    // path and extension of thumbnail data
    const imgPath = computed(() => {
      if (props.comic.thumbnail) {
        const { path, extension } = props.comic.thumbnail
        
        return path?.concat('.').concat(extension ? extension : '')
      }

      return ''
    })

    return {
      imgPath
    }
  },
})
</script>

<style lang="scss" scoped>
  .card {
    width: 4rem;
    height: 6rem;

    &__thumbnail {
      display: block;
      width: 100%;
    }

    &__title {
      color: #fff;
      font-weight: bold;
    }
  }
</style>