<template>
  <div class="container mx-auto px-48 pb-10">
    <div class="v-cart">
      <div class="v-cart__overview">
        <h2 class="t-heading-secondary">Items in cart</h2>
        <ul class="v-cart__list">
          <CartItem
            v-for="comic in cartStore.items" 
            :key="comic.id"
            :comic="comic"
          />
        </ul>
      </div>
      <div class="v-cart__summary">
        <h2 class="t-heading-secondary">Cart Summary</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartItem from '../components/CartItem.vue'
import { useCartStore } from '../store/cartStore'

const cartStore = useCartStore()

</script>

<style lang="scss">
@use '../styles/abstracts' as abs;

.v-cart {
  display: grid;
  grid-template-columns: 3fr 1fr;
  background: #eee;

  &__overview {
    padding: 2rem;
    margin-right: 1em;
    background: white;
    border-radius: abs.$border-radius-sm;
    box-shadow: abs.$box-shadow-sm;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__summary {
    padding: 2rem;
    background: white;
    border-radius: abs.$border-radius-sm;
    box-shadow: abs.$box-shadow-sm;
  }
}
</style>