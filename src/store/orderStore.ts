import { defineStore } from 'pinia'
import { Order } from '../interfaces'
import { generateId, getCurrentDate } from '../utils/utils'

export type OrderState = {
  items: Array<Order>
}

export type CreateOrder = Omit<Order, 'id' | 'createdAt'>

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      items: [],
    } as OrderState
  },
  actions: {
    createOrder(newOrder: CreateOrder) {
      this.items.push({
        id: generateId(),
        createdAt: getCurrentDate(),
        ...newOrder
      })
    },
    cancelOrder(orderId: number) {
      this.items = this.items.filter(item => item.id !== orderId)
    }
  },
  getters: {},
  persist: true
})
