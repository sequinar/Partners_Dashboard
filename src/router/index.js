import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Worlds from '../views/Worlds.vue'
import Listings from '../views/Listings.vue'
import Team from '../views/Team.vue'
import WorldEditor from '../views/WorldEditor.vue'
import World from '../views/World.vue'
import Product from '../views/Product.vue'
import { Auth, Signup, Login, UpdatePassword, NewPassword } from 'sequin-platform-packages'
import NotFound from '../views/NotFound.vue'
import ErrorPage from '../views/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: 'login',
          component: Login
        },
        {
          path: 'signup',
          component: Signup
        },
        {
          path: 'pass-update',
          component: UpdatePassword
        },
        {
          path: 'new-password',
          component: NewPassword
        }
      ]
    },
    {
      path: '/worlds',
      component: Main,
      children: [
        {
          path: '',
          name: 'Worlds',
          component: Worlds
        },
        {
          path: 'settings/:id',
          name: 'Settings',
          component: World
        },
        {
          path: 'new-world',
          name: 'Add world',
          component: World
        },
        {
          path: 'world-editor/:id',
          component: WorldEditor
        },
        {
          path: 'team/:id?',
          component: Team
        },
        {
          path: 'listings',
          component: Listings
        },
        {
          path: 'new-product',
          component: Product
        }
      ]
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
