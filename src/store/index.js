import { createStore } from 'vuex'
import Team from './modules/team'
import Worlds from './modules/worlds'
import axios from '../axios/index'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      accessToken: '',
      user: {}
    }
  },
  mutations: {
    updateAccessToken(state, token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      state.accessToken = token;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  modules: {
    team: Team,
    worlds: Worlds
  }
})

export default store;