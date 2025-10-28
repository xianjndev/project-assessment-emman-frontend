import { createRouter, createWebHistory } from 'vue-router'
import login from '@/login/loginPage.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
