<template>
  <nav class="navbar px-48">
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
      <li class="navbar__item">
        <a @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import BaseLink from './BaseLink.vue'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  console.log("a")
  authStore.logoutUser()
  router.push('/login')
}

</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  margin-bottom: 4rem;
  background: #e33943;;

  &__list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  &__item {
    display: inline-block;
    font-size: 1.25rem;

    &:not(:last-child):not(:first-child) {
      margin-left: 3rem;
    }

    &:last-child {
      margin-left: auto;
    }
  }
}
</style>