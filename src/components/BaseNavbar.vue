<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <BaseLink to="/comics" text="Comics" />
        <BaseLink to="/comics" text="Characters" />
        <BaseLink to="/comics" text="Series" />
        <BaseLink to="/comics" text="Stories" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseLink from './BaseLink.vue'

export default defineComponent({
  components: {
    BaseLink
  },
  setup() {
    
  },
})
</script>


<style lang="scss" scoped>
.navbar {
  width: 100%;
  margin-bottom: 4rem;

  &__list {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &__item {
    display: inline-block;
  }
}
</style>