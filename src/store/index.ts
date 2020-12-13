import { createStore } from 'vuex'
import UserSession from "@/models/UserSession";

export default createStore({
  state: {
      colorScheme: 'light',
      user: new UserSession() as UserSession
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
