<template>
  <article class="card shadow-md">
    <div class="card__header">
      <img class="card__thumbnail" :src="imgPath" :alt="comic.title">
    </div>
    <div class="card__footer">
      <h3 class="card__title">{{ comic.title }}</h3>
      <p>{{ basePrice }}</p>
    </div>
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

    return {
      imgPath,
      basePrice
    }
  },
})
</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: .75rem;

    &__header {
      position: relative;
      width: 100%;
      height: 14rem;
      overflow: hidden;
      border-top-left-radius: .75rem;
      border-top-right-radius: .75rem;
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
      color: #fff;
      text-align: left;
      padding: 8px 0 8px 8px;
      --tw-bg-opacity: 1;
      background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
      border-bottom-left-radius: .75rem;
      border-bottom-right-radius: .75rem;
    }

    &__title {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 24ch;
    }
  }
</style>