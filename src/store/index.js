import { createStore } from 'vuex'
import Team from './modules/team'
import Worlds from './modules/worlds'
import axios from '../axios/index'
import Auth0 from '@/auth0/index';

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
      state.messageError = message;
    } 
  },
  actions: {
    async getUser({commit}) {
      let token = await Auth0.getTokenSilently({ ignoreCache: true});
      commit("updateAccessToken", token);
      let user = await Auth0.getUser();
      commit("setUser", user);
    },
    async updateUser({commit, dispatch}, data) {
      try{
        await axios.post(`/updateprofile`, {
          userName: data.userName,
          name: data.name,
          profileImageBase64: data.picture
        });
        commit('setMessageSuccess', 'User successefully updated', {root: true})
        dispatch("getUser");
    } catch (err) {
        console.error(err);
        commit('setMessageError', err.response.data.message, {root: true})
    }
    }
  },
  modules: {
    team: Team,
    worlds: Worlds
  }
})
export default store;