import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Worlds from '../views/Worlds.vue'
import Listings from '../views/Listings.vue'
import Team from '../views/Team.vue'
import WorldEditor from '../views/WorldEditor.vue'
import World from '../views/World.vue'
import Product from '../views/Product.vue'
import Auth from '../views/auth/Auth.vue'
import SignUp from '../views/auth/Signup.vue'
import LogIn from '../views/auth/Login.vue'
import UpdatePassword from '../views/auth/UpdatePassword.vue'
import NewPassword from '../views/auth/NewPassword.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
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
      path: '/auth',
      component: Auth,
      children: [
        {
          path: '',
          component: SignUp
        },
        {
          path: 'login',
          component: LogIn
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
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
