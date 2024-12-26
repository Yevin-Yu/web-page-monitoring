import { createRouter, createWebHistory } from 'vue-router'
import DatasetHome from '../views/HomeView/DatasetHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DatasetHome,
    },
  ],
})

export default router
