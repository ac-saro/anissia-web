import Vue from 'vue';
import Vuex from 'vuex';
import UserSession from '@/models/UserSession';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: new UserSession() as UserSession,
  },
});
