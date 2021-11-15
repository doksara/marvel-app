<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <BaseLink to="/comics" text="Comics" />
      </li>
      <li class="navbar__item">
        <BaseLink to="/cart" text="Shopping Cart" />
      </li>
      <li class="navbar__item">
        <BaseLink to="/orders" text="My Orders" />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import BaseLink from './BaseLink.vue'
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  margin-bottom: 4rem;
  background: red;

  &__list {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &__item {
    display: inline-block;
    font-size: 1.25rem;
  }
}
</style>