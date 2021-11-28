import { defineStore } from 'pinia'
import { NotificationItemProps } from '../interfaces'

export type GlobalState = {
  notifications: Array<NotificationItemProps>
}

export type NewNotification = Omit<NotificationItemProps, 'id'>

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      notifications: []
    } as GlobalState
  },
  actions: {
    pushNotification(newNotification: NewNotification) {
      this.notifications.push({
        ...newNotification,
        id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
      })
    },
    dismissNotification(notificationId: string) {
      this.notifications = this.notifications.filter((notification) => notification.id !== notificationId)
    },
  }
})