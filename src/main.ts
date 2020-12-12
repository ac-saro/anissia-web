import Vue from 'vue';
import router from '@/router';
import App from '@/App.vue';
import RouterConfiguration from '@/utils/RouterConfiguration';

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

RouterConfiguration.bind(router);
