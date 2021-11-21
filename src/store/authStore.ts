import { defineStore } from 'pinia'

export type User = {
  username: string
  password: string
  name: string
}

export type LoginCredentials = Omit<User, 'name' | 'id'>

export type ActiveUser = Omit<User, 'password'>

export type AuthState = {
  currentUser: ActiveUser | null
  users: Array<User>
};

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      currentUser: null,
      users: []
    } as AuthState
  },
  actions: {
    registerUser(user: User) {
      this.users.push(user)
    },
    loginUser(credentials: LoginCredentials) {
      const queryUser = this.users.find(u => {
        return u.username === credentials.username && 
               u.password === credentials.password
      })

      if (queryUser) {
        this.currentUser = {
          username: queryUser.username,
          name: queryUser.name
        }
      }
    },
    logoutUser() {
      this.currentUser = null
      localStorage.removeItem('auth')
    }
  },
  persistOptions: {
    key: 'auth',
    storage: localStorage
  }
})