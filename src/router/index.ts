import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ left: 0, top: 0 }), 1);
    });
  },
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: '/',
          meta: { title: '애니시아' },
          component: () => import('@/views/Home.vue'),
        },
        {
          path: '/stock/:id/wiki',
          meta: { title: '애니시아' },
          component: () => import('@/views/StockWiki.vue'),
        },
        {
          path: '/stock/:id/feed',
          meta: { title: '애니시아' },
          component: () => import('@/views/StockFeed.vue'),
        },
        {
          path: '/stock',
          meta: { title: '애니시아' },
          component: () => import('@/views/Stock.vue'),
        },
        {
          path: '/dashboard',
          meta: { title: '애니시아' },
          component: () => import('@/views/Dashboard.vue'),
        },
        {
          path: '/login',
          meta: { title: '애니시아' },
          component: () => import('@/views/Login.vue'),
        },
        {
          path: '/join/:token',
          meta: { title: '애니시아' },
          component: () => import('@/views/Join.vue'),
        },
        {
          path: '/join',
          meta: { title: '애니시아' },
          component: () => import('@/views/Join.vue'),
        },
        {
          path: '/lost',
          meta: { title: '애니시아' },
          component: () => import('@/views/Lost.vue'),
        },
        {
          path: '/user',
          meta: { title: '애니시아' },
          component: () => import('@/views/User.vue'),
        }
      ]
    },
    // 404 page not found
    {
      path: '/:path(.*)',
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: '/:path(.*)',
          component: () => import('@/views/404.vue'),
          meta: { title: '애니시아 404' },
        },
      ],
    },
  ],
})
