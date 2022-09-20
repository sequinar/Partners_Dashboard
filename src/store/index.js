import { createStore } from 'vuex'
import Team from './modules/team'
import Worlds from './modules/worlds'
import axios from '../axios/index'

const store = createStore({
  state () {
    return {
      accessToken: null,
      user: {},
      apiEndpoint: process.env.API_ENDPOINT,
      messageSuccess: null,
      messageError: null
    }
  },
  mutations: {
    updateAccessToken (state, token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      state.accessToken = token
    },
    setUser (state, user) {
      state.user = user
    },
    setMessageSuccess (state, message) {
      state.messageSuccess = message
    },
    setMessageError (state, message) {
      state.messageError = message
    }
  },
  actions: {
    async getUser ({ commit, getters }) {
      const user = await axios.get(`/user-profile/${getters.getAuth0UserId}`)
      commit('setUser', user.data.data)
    },
    async updateUser ({ commit, dispatch }, data) {
      try {
        await axios.post('/updateprofile', {
          userName: data.userName,
          name: data.name,
          profileImageBase64: data.picture
        })
        commit('setMessageSuccess', 'User successefully updated', { root: true })
        dispatch('getUser')
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async updatePassword ({ commit }, data) {
      try {
        await axios.post('/updatepassword', {
          userName: data.userName,
          currentPassword: data.currentPassword,
          password: data.newPassword
        })
        commit('setMessageSuccess', 'User password successefully updated', { root: true })
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    }
  },
  getters: {
    getAuth0UserId: (state) => {
      return state.user.sub || state.user.user_id
    }
  },
  modules: {
    team: Team,
    worlds: Worlds
  }
})
export default store
