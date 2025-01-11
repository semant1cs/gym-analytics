import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MainPage.vue') }],
  },
  {
    path: '/schedule',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SchedulePage.vue') }],
  },
  {
    path: '/stats',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/StatsPage.vue') }],
  },
  {
    path: '/admin/videos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/VideosPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
