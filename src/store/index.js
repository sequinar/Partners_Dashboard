import { createStore } from 'vuex'
import Team from './modules/team'
import Worlds from './modules/worlds'
import axios from '../axios/index'
import Auth0 from '@/auth0/index';

// Create a new store instance.
const store = createStore({
  state () {
    return {
      accessToken: '',
      user: {},
      apiEndpoint: process.env.API_ENDPOINT,
      messageSuccess: null,
      messageError: null
    }
  },
  mutations: {
    updateAccessToken(state, token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      state.accessToken = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setMessageSuccess(state, message) {
      state.messageSuccess = message;
    },
    setMessageError(state, message){
      state.messageError = message ? message : 'Something went wrong';
    } 
  },
  actions: {
    showAlert({commit}, data) {
      if(data.status === 200) {
        commit('setMessageSuccess', data.messageSuccess)
      } else {
        commit('setMessageError', data.messageError)
      }
    },
    async updateUser({dispatch, commit}, data) {
      let response = await axios.post(`/updateprofile`, {
        displayName: data.displayName,
        name: data.name,
        profileImageBase64: data.picture
      });
      dispatch('showAlert', {
        status: response.status,
        messageSuccess: 'User successefully updated'
      })
      let user = await Auth0.getUser();
      commit("setUser", user);
    }
  },
  modules: {
    team: Team,
    worlds: Worlds
  }
})

export default store;