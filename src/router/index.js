import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import Worlds from '../views/Worlds.vue';
import Analytics from '../views/Analytics.vue';
import Team from '../views/Team.vue';
import WorldSettings from '../views/WorldSettings.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Main,
        children: [
          {
            path: '/',
            component: Worlds
          },
          {
            path: '/analytics',
            component: Analytics
          },
          {
            path: '/team',
            component: Team
          },
          {
            path: '/settings',
            component: WorldSettings
          }
        ]
      },
      {
        path: '/login',
        component: Login
      },
      { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: NotFound 
      },
    ],
  });
  
  export default router;