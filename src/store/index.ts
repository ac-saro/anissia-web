import { createStore } from 'vuex'
import UserSession from "@/models/UserSession";

export default createStore({
  state: {
      colorScheme: 'light',
      user: new UserSession() as UserSession,
      rank: {
          period: 'day',
          list: [],
          day: [],
          week: [],
          month: []
      }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
