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
      path: '/schedule/2015',
      component: () => import('@/views/schedule/2015.vue'),
      meta: { title: '애니편성표' },
    },
    {
      path: '/schedule/2009',
      component: () => import('@/views/schedule/2009.vue'),
      meta: { title: '애니편성표 2009' },
    },
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
          path: '/schedule',
          meta: { title: '애니시아' },
          component: () => import('@/views/Schedule.vue'),
        },
        {
          path: '/anime',
          meta: { title: '애니시아' },
          component: () => import('@/views/Anime.vue'),
        },
        {
          path: '/introduce',
          meta: { title: '애니시아' },
          component: () => import('@/views/Introduce.vue'),
        },
        {
          path: '/news',
          meta: { title: '애니시아' },
          component: () => import('@/views/News.vue'),
        },
        {
          path: '/inquiry',
          meta: { title: '애니시아' },
          component: () => import('@/views/Inquiry.vue'),
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
          path: '/account',
          meta: { title: '애니시아' },
          component: () => import('@/views/Account.vue'),
        }
      ]
    },
    // 404 page not found
    {
      path: '/:path(.*)',
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: '/anitime/:path(.*)',
          component: () => import('@/views/301.vue'),
          meta: { title: '애니시아 - 주소이전' },
        },
        {
          path: '/:path(.*)',
          component: () => import('@/views/404.vue'),
          meta: { title: '애니시아 404' },
        },
      ],
    },
  ],
})
