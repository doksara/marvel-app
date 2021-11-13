import { createRouter, createWebHistory } from "vue-router";
import Comics from "@/views/Comics.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Comics,
  },
  {
    path: "/comics",
    name: "Comics",
    component: Comics,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;