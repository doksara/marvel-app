import { defineStore } from 'pinia'
import { Comic } from '../interfaces'
import { getBasePrice } from '../utils/utils'

export type CartState = {
  items: Array<Comic>
  deliveryFee: number
};

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      items: [],
      deliveryFee: 3
    } as CartState
  },
  actions: {
    addToCart(item: Comic) {
      this.items.push(item)
    },
    removeFromCart(itemId: number) {
      this.items = this.items.filter(item => item.id !== itemId);
    }
  },
  getters: {
    subtotal(store) {
      if (store.items.length > 0) {
        return store.items.reduce((acc, item) => {
          if (item.prices && item.prices[0] && item.prices[0].price) {
            acc += parseFloat(item.prices[0].price)
          }
          return acc
        }, 0)
      }

      return 0
    },
    grandtotal(): number {
      return this.deliveryFee + this.subtotal
    }
  },
  persist: true
})
