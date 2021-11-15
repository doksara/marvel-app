<template>
  <router-link class="link" :to="to">
    <span>{{ text }}</span>
  </router-link>
</template>

<script setup lang="ts">
  // Props
  interface Props {
    to: string
    text: string
  }

  // Defaults
  const props = withDefaults(defineProps<Props>(), {
    to: '/',
    text: ''
  })
</script>


<style lang="scss" scoped>
.link {
  display: inline-block;
  color: white;
  padding: 1em 1.5em;
  text-decoration: none;
  text-transform: uppercase;

  &:hover,
  &:active {
    font-weight: 700;
  }
}

</style>