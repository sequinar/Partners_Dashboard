import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import Worlds from '../views/Worlds.vue';
import Analytics from '../views/Analytics.vue';
import Team from '../views/Team.vue';
import WorldSettings from '../views/WorldSettings.vue';
import NotFound from '../views/NotFound.vue';
import Auth0 from '../auth0/index';

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
            path: 'settings/:id',
            component: WorldSettings
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

  router.beforeEach(Auth0.routeGuard);
  
  export default router;