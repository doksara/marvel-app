<template>
  <router-link class="link" :to="props.to">
    <span>
      <slot></slot>
    </span>
  </router-link>
</template>

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


<style lang="scss" scoped>
.link {
  display: inline-block;
  color: white;
  padding: 1em 0;
  text-decoration: none;

  &:hover,
  &:active {
    font-weight: 700;
  }
}

</style>