import axios from '@/axios/index'
const store = {
  namespaced: true,
  state () {
    return {
      worlds: null, // {data: [], meta: {}}
      currentWorld: null,
      worldBanners: []
    }
  },
  mutations: {
    setWorlds (state, worlds) {
      state.worlds = worlds
    },
    setCurrentWorld (state, world) {
      state.currentWorld = world
    },
    setBanners (state, banners) {
      state.worldBanners = banners
    }
  },
  actions: {
    async createWorld ({ dispatch, rootState, commit }, data) {
      try {
        await axios.post(`team/${rootState.team.team.teamId}/worlds`, {
          worldname: data.name,
          worlddescription: data.descrition,
          customizations: data.customizations,
          thumbnail: data.thumbnail
        })
        dispatch('getWorlds')
        commit('setMessageSuccess', 'World created successfully', { root: true })
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async getWorlds ({ commit, rootState }, params) {
      if (rootState.team.team) {
        const worlds = await axios.get(`team/${rootState.team.team.teamId}/worlds`, {
          params: {
            limit: params?.limit || 8,
            page: params?.page || 1,
            filter: params?.filter || ''
          }
        })
        commit('setWorlds', worlds.data)
      } else {
        commit('setWorlds', {})
      }
    },
    async getCurrentWorld ({ commit }, worldId) {
      const world = await axios.get(`world/${worldId}/get-world-state`)
      commit('setCurrentWorld', world.data.data[0])
    },
    async getBanners ({ commit }, id) {
      const banners = await axios.get(`world/${id}/world-banner`)
      commit('setBanners', banners.data)
    },
    async updateChatStatus ({ dispatch }, data) {
      await axios.post(`world/${data.id}/update-chat-status/${data.status}`)
      dispatch('getCurrentWorld', data.id)
    },
    async updateStreamStatus ({ dispatch }, data) {
      await axios.post(`world/${data.id}/update-stream-status/${data.status}`)
      dispatch('getCurrentWorld', data.id)
    },
    async updateBanners ({ dispatch, commit }, data) {
      try {
        await axios.post(`world/${data.id}/world-banner`, data.formData)
        dispatch('getCurrentWorld', data.id)
        commit('setMessageSuccess', 'Image uploaded successfully', { root: true })
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async deleteBanner ({ dispatch, commit }, data) {
      try {
        await axios.delete(`/world/${data.id}/world-banner/${data.bannerId}`)
        dispatch('getCurrentWorld', data.id)
        commit('setMessageSuccess', 'Image deleted successfully', { root: true })
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    }
  },
  getters: {}
}

export default store
