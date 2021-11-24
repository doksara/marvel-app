import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/authStore';
import Comics from '@/views/Comics.vue'
import ComicDetails from '@/views/ComicDetails.vue'
import Cart from '@/views/Cart.vue'
import Login from '@/views/Login.vue'
import Orders from '@/views/Orders.vue'
import Registration from '@/views/Registration.vue'
import Home from '@/views/Home.vue'
import Checkout from '@/views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'l',
    component: Home,
    meta: { authorize: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { authorize: false }
  },
  {
    path: '/register',
    name: 'Registration',
    component: Registration,
    meta: { authorize: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { authorize: false },
    children: [
      {
        path: '/comics',
        name: 'Comics',
        component: Comics,
        meta: { authorize: false },
        children: [
          {
            path: '/comics/:id',
            name: 'ComicDetails',
            component: ComicDetails,
            meta: { authorize: true }
          }
        ]
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: { authorize: true }
      },
      {
        path: '/orders',
        name: 'Orders',
        component: Orders,
        meta: { authorize: true }
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
        meta: { authorize: true }
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta
  const { currentUser } = useAuthStore()

  if (authorize) {
    if (!currentUser) {
      return next({ path: '/login' })
    }
  }

  if (to.name === 'Login' && currentUser) {
    return next({ path: '/home' })
  }

  return next()
})

export default router