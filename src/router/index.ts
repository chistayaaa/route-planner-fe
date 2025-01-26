import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import AuthView from '../views/AuthView.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
      // beforeEnter: (to, from) => {
      //   // reject the navigation
      //   return false
    },
    // },
    // {
    //   path: '/user',
    //   beforeEnter() {
    //     // ...
    //   },
    //   children: [
    //     { path: 'list', component: UserList },
    //     { path: 'details', component: UserDetails },
    //   ],
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // meta: { requiresAuth: true }
    // },
  ],
})

router.beforeEach(async (to) => {
  const store = useUserStore()
  const { isAuthenticated } = storeToRefs(store)

  console.log('User isAuthenticated: ', isAuthenticated.value)

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'welcome' }
  }

  if (isAuthenticated.value && (to.name === 'welcome' || to.name === 'login')) {
    return { name: 'home' }
  }
})

export default router
