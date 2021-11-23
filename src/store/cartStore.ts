import { defineStore } from 'pinia'
import { Comic } from '../interfaces'

export type CartState = {
  items: Array<Comic>;
};

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      items: []
    } as CartState
  },
  actions: {
    addToCart(item: Comic) {
      this.items.push(item)
    },
    removeFromCart(itemId: number) {
      this.items.filter(item => item.id !== itemId);
    }
  },
  persistOptions: {
    key: 'cart',
    storage: localStorage
  }
})
