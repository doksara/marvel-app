<template>
  <div class="container mx-auto px-48 pb-10">
    <div class="v-cart">
      <div class="v-cart__overview">
        <h2 class="t-heading-secondary">Items in cart</h2>
        <hr class="v-cart__divider"/>
        <template v-if="!isCartEmpty">
          <ul  class="v-cart__list">
            <CartItem
              v-for="comic in cartStore.items" 
              :key="comic.id"
              :comic="comic"
              @remove-from-cart="removeFromCart(comic)"
            />
          </ul>
          <hr class="v-cart__divider"/>
          <p class="v-cart__subtotal">SUB-TOTAL: ${{ cartStore.subtotal }}</p>
        </template>
        <p v-else>
          <span>You have no items in shopping cart.</span>
          <router-link class="v-cart__link" to="/comics">Browse comics in our store here.</router-link>
        </p>
      </div>
      <div class="v-cart__summary">
        <h2 class="t-heading-secondary">Cart Summary</h2>
        <hr class="v-cart__divider"/>
        <ul v-if="!isCartEmpty" class="v-cart__summary-list">
          <li class="flex justify-between">
            <p>Sub-total</p>
            <p>${{ cartStore.subtotal }}</p>
          </li>
          <li class="flex justify-between">
            <p>Delivery</p>
            <p>${{ cartStore.deliveryFee.toFixed(2) }}</p>
          </li>
        </ul>
        <p v-else>
          <span>You have no items in shopping cart.</span>
        </p>
        <hr class="v-cart__divider mb-2"/>
        <p class="flex justify-between">
          <p>Grandtotal</p>
          <p>${{ cartStore.grandtotal.toFixed(2) }}</p>
        </p>
        <BaseButton 
          text="Checkout"
          type="submit"
          class="w-full mt-3"
          buttonStyle="success"
          :is-loading="isLoading"
          @click="goToCheckout"
        ></BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCartStore } from '../store/cartStore'
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../store/globalStore';
import { Comic } from '../interfaces';
import { delay } from '../utils/utils';
import CartItem from '../components/CartItem.vue'
import BaseButton from '../components/BaseButton.vue';

const cartStore = useCartStore()
const globalStore = useGlobalStore()
const router = useRouter()

const isLoading = ref(false)

const isCartEmpty = computed(() => {
  return cartStore.items.length === 0
})

const removeFromCart = (comic: Comic) => {
  cartStore.removeFromCart(comic.id)
  globalStore.pushNotification({
    type: 'success',
    message: `Removed ${comic.title} from cart.`
  })
}

const goToCheckout = async () => {
  isLoading.value = true
  
  // Simulate waiting for response
  await delay(1500)
  
  isLoading.value = false
  router.push('/checkout')
}

</script>

<style lang="scss">
@use '../styles/abstracts' as abs;

.v-cart {
  display: flex;
  align-items: flex-start;
  background: #eee;

  &__overview {
    flex-basis: 70%;
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
    flex-grow: 1;
    padding: 2rem;
    background: white;
    border-radius: abs.$border-radius-sm;
    box-shadow: abs.$box-shadow-sm;
  }

  &__subtotal {
    font-size: 2rem;
    font-weight: bold;
    text-align: right;
  }

  &__divider {
    background: rgba(255, 255, 255, 0.1);
    margin: 1rem auto;
  }
}
</style>