import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import router from './router'
import persistedStorage from './store/plugins/persistedStorage'
import './styles/index.scss'

const pinia = createPinia()
pinia.use(persistedStorage)

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
