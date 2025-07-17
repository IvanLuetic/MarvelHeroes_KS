import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import forbidUnauthenticated from './navigationGuard.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      beforeEnter: forbidUnauthenticated,
    },
    {
      path: '/auth',
      name: 'auth',

      component: () => import('../views/AuthPage.vue'),
    },
  ],
})

export default router
