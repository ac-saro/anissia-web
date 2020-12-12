import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ x: 0, y: 0 }), 1);
    });
  },
  routes: [
    {
      path: '/timetable/2015',
      component: () => import('@/views/timetable/2015.vue'),
      meta: { title: '애니편성표 2015' },
    },
    {
      path: '/timetable/2009',
      component: () => import('@/views/timetable/2009.vue'),
      meta: { title: '애니편성표 2009' },
    },
    // web size
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      meta: { title: '애니시아' },
      children: [
        {
          path: '/',
          component: () => import('@/views/Home.vue'),
          meta: { title: '애니시아' },
        },
        {
          path: '/introduce',
          component: () => import('@/views/Introduce.vue'),
          meta: { title: '소개 - 애니시아' },
        },
        {
          path: '/news',
          component: () => import('@/views/News.vue'),
          meta: { title: '새소식 - 애니시아' },
        },
        {
          path: '/timetable',
          component: () => import('@/views/Timetable.vue'),
          meta: { title: '애니편성표 - 애니시아' },
        },
        {
          path: '/anime',
          component: () => import('@/views/Anime.vue'),
          meta: { title: '애니정보 - 애니시아' },
        },
        {
          path: '/user',
          component: () => import('@/views/User.vue'),
          meta: { title: '회원정보 - 애니시아' },
        },
        {
          path: '/login',
          component: () => import('@/views/Login.vue'),
          meta: { title: '로그인 - 애니시아' },
        },
        {
          path: '/apply',
          component: () => import('@/views/Apply.vue'),
          meta: { title: '자막제작자 신청 - 애니시아' },
        },
        {
          path: '/recover',
          component: () => import('@/views/Recover.vue'),
          meta: { title: '계정복구 - 애니시아' },
        },
        {
          path: '/register',
          component: () => import('@/views/Register.vue'),
          meta: { title: '회원가입 - 애니시아' },
        },
        // manage
        {
          path: '/manage',
          component: () => import('@/views/manage/ManageLayout.vue'),
          children: [
            {
              path: '/manage',
              meta: { title: '관리콘솔 - 애니시아' },
              component: () => import('@/views/manage/Console.vue'),
            },
            {
              path: '/manage/anime',
              meta: { title: '편성종료 애니메이션 - 애니시아' },
              component: () => import('@/views/manage/Anime.vue'),
            },
            {
              path: '/manage/timetable',
              meta: { title: '애니메이션 편성표 - 애니시아' },
              component: () => import('@/views/manage/Timetable.vue'),
            },
            {
              path: '/manage/caption',
              meta: { title: '애니메이션 자막 - 애니시아' },
              component: () => import('@/views/manage/Caption.vue'),
            },
          ],
        },
      ],
    },
    // moved
    {
      path: '/anitime',
      component: () => import('@/views/error/Moved.vue'),
      meta: { title: '애니시아' },
      children: [
        {
          path: '/anitime/old/',
          meta: { title: '애니시아' },
        },
        {
          // 임시 - svg 파일로 바꿔야함.
          path: '/anitime/list_img',
          meta: { title: '애니시아' },
        },
      ],
    },
    // 404 page not found
    {
      path: '/*',
      component: () => import('@/views/Layout.vue'),
      meta: { title: '페이지를 찾을 수 없습니다. - 애니시아' },
      children: [
        {
          path: '/*',
          component: () => import('@/views/error/404.vue'),
          meta: { title: '페이지를 찾을 수 없습니다. - 애니시아' },
        },
      ],
    },
  ],
});
