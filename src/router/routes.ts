import LoginPage from 'pages/LoginPage.vue'
import MainLayout from 'layouts/MainLayout.vue';
import type { RouteRecordRaw } from 'vue-router';
import SchedulePage from 'src/pages/SchedulePage.vue';
import StatsPage from 'src/pages/StatsPage.vue';
import VideosPage from 'pages/VideosPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: MainLayout,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token === null) {
        next({path: '/login'})
      }
      next()
    },
    children: [
      {
        path: 'videos',
        component: VideosPage
      },
      {
        path: 'schedule',
        component: SchedulePage
      },
      {
        path: 'stats/videos',
        component: StatsPage
      }
    ]
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
