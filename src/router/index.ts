import { createRouter, createWebHistory } from 'vue-router'

import Layout from "@/views/Layout.vue";
import P404 from "@/views/404.vue";
import P301 from "@/views/301.vue";
import Lost from "@/views/Lost.vue";
import Join from "@/views/Join.vue";
import Login from "@/views/Login.vue";
import Inquiry from "@/views/Inquiry.vue";
import Notice from "@/views/Notice.vue";
import Introduce from "@/views/Introduce.vue";
import Anime from "@/views/Anime.vue";
import Schedule from "@/views/Schedule.vue";
import Home from "@/views/Home.vue";
import Sc2009 from "@/views/schedule/2009.vue";
import Sc2015 from "@/views/schedule/2015.vue";
import Account from "@/views/Account.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ left: 0, top: 0 }), 1);
    });
  },
  routes: [
    {
      path: '/schedule/2015',
      component: Sc2015,
      meta: { title: '애니편성표' },
    },
    {
      path: '/schedule/2009',
      component: Sc2009,
      meta: { title: '애니편성표 2009' },
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          meta: { title: '애니시아' },
          component: Home,
        },
        {
          path: '/schedule',
          meta: { title: '애니시아' },
          component: Schedule,
        },
        {
          path: '/anime',
          meta: { title: '애니시아' },
          component: Anime,
        },
        {
          path: '/introduce',
          meta: { title: '애니시아' },
          component: Introduce,
        },
        {
          path: '/notice',
          meta: { title: '애니시아' },
          component: Notice,
        },
        {
          path: '/inquiry',
          meta: { title: '애니시아' },
          component: Inquiry,
        },
        {
          path: '/login',
          meta: { title: '애니시아' },
          component: Login,
        },
        {
          path: '/join/:token',
          meta: { title: '애니시아' },
          component: Join
        },
        {
          path: '/join',
          meta: { title: '애니시아' },
          component: Join,
        },
        {
          path: '/lost',
          meta: { title: '애니시아' },
          component: Lost,
        },
        {
          path: '/account',
          meta: { title: '애니시아' },
          component: Account,
        },
        {
          path: '/admin',
          component: P301,
          meta: { title: '애니시아' },
        },
        {
          path: '/anitime/:path(.*)',
          component: P301,
          meta: { title: '애니시아 - 주소이전' },
        },
      ]
    },
    // 404 page not found
    {
      path: '/:path(.*)',
      component: Layout,
      children: [
        {
          path: '/:path(.*)',
          component: P404,
          meta: { title: '애니시아 404' },
        },
      ],
    },
  ],
});

export default router;
