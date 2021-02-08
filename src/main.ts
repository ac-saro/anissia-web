import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import RouterConfiguration from '@/utils/RouterConfiguration';

createApp(App).use(store).use(router).mount("#app")

RouterConfiguration.bind(router);