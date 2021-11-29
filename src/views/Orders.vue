<script setup lang="ts">
import BaseNavbar from '../components/BaseNavbar.vue'
import Carousel from '../components/Carousel.vue'
import OrderItem from '../components/OrderItem.vue';
import { useOrderStore } from '../store/orderStore';

// Composables and externals
const orderStore = useOrderStore()

</script>

<template>
  <Carousel />
  <BaseNavbar />
  <div class="container mx-auto px-48 pb-10">
    <div class="v-orders">
      <h2 class="t-heading-secondary">My orders</h2>
      <hr class="v-orders__divider"/>
      <ul v-if="orderStore.items.length > 0" class="flex flex-col">
        <OrderItem 
          v-for="order in orderStore.items"
          :order="order"
          @cancel-order="orderStore.cancelOrder(order.id)"
        />
      </ul>
      <p v-else>
        You have no active orders.
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@use '../styles/abstracts' as abs;

.v-orders {
  background: white;
  padding: 2em;
  border-radius: abs.$border-radius-sm;
  box-shadow: abs.$box-shadow-sm;
  max-width: 60rem;
  margin: 0 auto;

  &__divider {
    background: rgba(255, 255, 255, 0.1);
    margin: 1rem auto;
  }
}
</style>