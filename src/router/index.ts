import { createRouter, createWebHistory } from 'vue-router'

import Layout from "@/views/Layout.vue";
import P404 from "@/views/404.vue";
import P301 from "@/views/301.vue";
import Recover from "@/views/Recover.vue";
import Register from "@/views/Register.vue";
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
import AdminLayout from "@/views/admin/AdminLayout.vue";
import AdminCaption from "@/views/admin/AdminCaption.vue";
import AdminSchdule from "@/views/admin/AdminSchdule.vue";
import AdminAnime from "@/views/admin/AdminAnime.vue";
import AdminPanel from "@/views/admin/AdminPanel.vue";
import TranslatorApply from "@/views/TranslatorApply.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ left: 0, top: 0 }), 1);
    });
  },
  routes: [
      // schedule
      { path: '/schedule/2015', component: Sc2015, meta: { title: '애니편성표' } },
      { path: '/schedule/2009', component: Sc2009, meta: { title: '애니편성표 2009' } },
      // basic
      {
        path: '/', component: Layout,
        children: [
          { path: '/', component: Home },
          { path: '/schedule', component: Schedule },
          { path: '/anime', component: Anime },
          { path: '/translator/apply', component: TranslatorApply },
          { path: '/introduce', component: Introduce },
          { path: '/notice', component: Notice },
          { path: '/inquiry', component: Inquiry },
          { path: '/login', component: Login },
          { path: '/register/:token', component: Register },
          { path: '/register', component: Register },
          { path: '/recover', component: Recover },
          { path: '/recover/:token', component: Recover },
          { path: '/account', component: Account },
          {
            path: '/admin', component: AdminLayout,
            children: [
              { path: '/admin', component: AdminPanel },
              { path: '/admin/anime', component: AdminAnime },
              { path: '/admin/schedule', component: AdminSchdule },
              { path: '/admin/caption', component: AdminCaption },
            ]
          },
          { path: '/anitime/:path(.*)', component: P301, meta: { title: '애니시아 - 주소이전' } },
          { path: '/:path(.*)', component: P404, meta: { title: '애니시아 404' } },
        ]
      },
  ],
});

export default router;
