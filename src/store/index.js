import { createStore } from 'vuex'
import Team from './modules/team'

// Create a new store instance.
const store = createStore({
  state () {
    return {
    }
  },
  mutations: {
  },
  modules: {
    team: Team
  }
})

export default store;