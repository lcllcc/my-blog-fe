import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('../views/EditArticle.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/Article.vue')
    },
    {
      path: '/article/owned',
      name: 'owned-article',
      component: () => import('../views/OwnedArticle.vue')
    },
    {
      path: '/article/stared',
      name: 'stared-article',
      component: () => import('../views/StaredArticle.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/finance',
      name: 'finance',
      component: () => import('../views/Finance.vue')
    }
  ]
})

export default router
