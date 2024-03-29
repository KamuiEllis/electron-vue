import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Bots from '../views/Bots.vue'

const routes = [
  {
    path: '/home/:id',
    name: 'Home',
    component: Home
  },
  {
    path: '/bots',
    name: 'Bots',
    component: Bots
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
