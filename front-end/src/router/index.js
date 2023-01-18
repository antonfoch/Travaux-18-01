import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Register.vue'

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: HomeView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
