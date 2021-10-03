import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/Favorites.vue')
  }
  ,
  {
    path: '/breeds/:breed',
    name: 'breeds',
    component: () => import('../views/Breeds.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
