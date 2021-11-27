<template>
  <nav class="c-navbar px-48">
    <ul class="c-navbar__list">
      <li class="c-navbar__item">
        <router-link active-class="c-navbar__link--active" class="c-navbar__link" to="/comics">Comics</router-link>
      </li>
      <li class="c-navbar__item">
        <router-link v-if="authStore.currentUser" active-class="c-navbar__link--active" class="c-navbar__link" to="/cart">
          <span>Shopping Cart</span>
          <svg class="c-navbar__link-icon">
            <use xlink:href="../assets/icons/symbol-defs.svg#icon-shopping-cart" />
          </svg>
          <p v-if="cartStore.items.length > 0" class="c-navbar__counter">
            <span class="c-navbar__counter-text">{{ cartStore.items.length }}</span>
          </p>
        </router-link>
      </li>
      <li class="c-navbar__item">
        <router-link active-class="c-navbar__link--active" class="c-navbar__link" to="/orders">My Orders</router-link>
      </li>
      <li class="c-navbar__item">
        <a class="c-navbar__link" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const logout = () => {
  authStore.logoutUser()
  router.push('/login')
}

</script>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;
.c-navbar {
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

  &__counter {
    position: absolute;
    width: 1rem;
    height: 1rem;
    bottom: .75rem;
    right: -0.5rem;
    border-radius: 50%;
    background-color: abs.$cyan-500;

    &-text {
      font-size: .8rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__link {
    position: relative;
    display: inline-flex;
    align-items: center;
    color: white;
    padding: .75em 0;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }

    &-icon {
      width: .9em;
      height: .9em;
      margin-left: .3rem;
      fill: white;
    }

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      background: white;
      transition: all .2s ease;
    }

    &:hover::after,
    &--active::after {
      height: 3px;
    }
  }
}
</style>