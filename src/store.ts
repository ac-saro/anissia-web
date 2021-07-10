import { createStore } from 'vuex'
import UserSession from "@/models/UserSession";

export default createStore({
  state: {
      colorScheme: 'light',
      user: new UserSession(),
      rank: {
          period: 'week',
          list: [],
          week: [],
          month: [],
          quarter: []
      },
      recent: {
          captions: []
      }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
