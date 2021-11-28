import { defineStore } from 'pinia'
import { Comic } from '../interfaces'

export type WatchlistState = {
  items: Array<Comic>
}

export const useWatchlistStore = defineStore('watchlist', {
  state: () => {
    return {
      items: []
    } as WatchlistState
  },
  actions: {
    addToWatchlist(item: Comic) {
      this.items.push(item)
    },
    removeFromWatchlist(itemId: number) {
      this.items.filter(item => item.id !== itemId)
    }
  }
})
