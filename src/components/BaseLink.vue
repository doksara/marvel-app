<script setup lang="ts">
// Props
interface Props {
  to: string
}

// Defaults
const props = withDefaults(defineProps<Props>(), {
  to: '/',
})
</script>

<template>
  <router-link class="c-link" :to="props.to">
    <span>
      <slot></slot>
    </span>
  </router-link>
</template>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;

.c-link {
  display: inline-block;
  color: abs.$red-500;
  text-decoration: none;

  &:hover,
  &:active {
    color: abs.$red-800;
  }
}

</style>