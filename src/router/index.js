import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import Worlds from '../views/Worlds.vue';
import Analytics from '../views/Analytics.vue';
import Team from '../views/Team.vue';
import WorldSettings from '../views/WorldSettings.vue';
import Auth from '../views/Auth.vue';
import SignUp from '../components/Auth/SignUp.vue';
import LogIn from '../components/Auth/LogIn.vue';
import UpdatePassword from '../components/Auth/UpdatePassword.vue';
import NewPassword from '../components/Auth/NewPassword.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Main,
        children: [
          {
            path: '',
            component: Worlds
          },
          {
            path: 'analytics',
            component: Analytics
          },
          {
            path: 'team',
            component: Team
          },
          {
            path: 'settings',
            component: WorldSettings
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
      },
    ],
  });
  
  export default router;