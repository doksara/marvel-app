import { createRouter, createWebHistory } from 'vue-router'
import Comics from '@/views/Comics.vue'
import Cart from '@/views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Comics,
  },
  {
    path: '/comics',
    name: 'Comics',
    component: Comics,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router