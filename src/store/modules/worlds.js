import axios from '@/axios/index'
const store = {
  namespaced: true,
  state () {
    return {
      worlds: null, // {data: [], meta: {}}
      currentWorld: null,
      worldBanners: [],
      uploadUrl: '',
      uploadedWorldUrl: '',
      eTags: [],
      fileName: null,
      newWorld: {},
      capabilities: [],
      playebleOn: []
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
    },
    setUploadUrl (state, url) {
      state.uploadUrl = url
    },
    setUploadedWorldUrl (state, url) {
      state.uploadedWorldUrl = url
    },
    setETags (state, etags) {
      state.eTags = etags
    },
    setFileName (state, name) {
      state.fileName = name
    },
    setNewWorld (state, world) {
      state.newWorld = world
    },
    setCapabilities (state, capabilities) {
      state.capabilities = capabilities
    },
    setPlayableOn (state, playebleOn) {
      state.playebleOn = playebleOn
    }
  },
  actions: {
    async createWorld ({ rootState, commit }, data) {
      try {
        const response = await axios.post(`team/${rootState.team.team.teamId}/worlds`, data)
        commit('setNewWorld', response.data.data)
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async createCapability ({ dispatch }, capability) {
      await axios.post('world/capability', { capabilityName: capability })
      dispatch('getCapabilities')
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
    async getUploadUrl ({ commit }, data) {
      const response = await axios.post('dummy/getprojectuploadurl', data)
      commit('setUploadUrl', response.data.data)
      commit('setFileName', data.file.fileName)
    },
    async getCapabilities ({ commit }) {
      const response = await axios.get('world/capability')
      commit('setCapabilities', response.data.data)
    },
    async getPlatforms ({ commit }) {
      const response = await axios.get('world/playabel-platforms')
      commit('setPlayableOn', response.data.data)
    },
    async updateFeaturedImage ({ state }, image) {
      if (state.newWorld?.publicId) {
        await axios.post(`world/${state.newWorld.publicId}/world-feature-image`, image)
      }
    },
    async updateThumbnailImage ({ state }, image) {
      if (state.newWorld?.publicId) {
        await axios.post(`world/${state.newWorld.publicId}/world-thumbnail-image`, image)
      }
    },
    async updateGallery ({ state }, images) {
      if (state.newWorld?.publicId) {
        await axios.post(`world/${state.newWorld.publicId}/world-image`, images)
      }
    },
    async updateChatStatus ({ dispatch }, data) {
      await axios.post(`world/${data.id}/update-chat-status/${data.status}`)
      dispatch('getCurrentWorld', data.id)
    },
    async updateStreamStatus ({ dispatch, commit }, data) {
      await axios.post(`world/${data.id}/update-stream-status/${data.status}`)
      dispatch('getCurrentWorld', data.id)
      commit('setMessageSuccess', 'Stream status updated', { root: true })
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
    },
    async deleteFeaturedImage ({ commit }, id) {
      try {
        await axios.delete(`world/${id}/world-feature-image`)
        commit('setMessageSuccess', 'Fetured image deleted successfully', { root: true })
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async deleteThumbnailImage ({ commit }, id) {
      try {
        await axios.delete(`world/${id}/world-thumbnail-image`)
        commit('setMessageSuccess', 'Thumbnail image deleted successfully', { root: true })
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async completeMultipartUpload ({ commit }, data) {
      const response = await axios.post('dummy/completemultipartupload', data)
      commit('setUploadedWorldUrl', response.data.data)
    },
    async setWorldStatus ({ state }, status) {
      if (state.newWorld?.publicId) {
        await axios.post(`world/${state.newWorld.publicId}/publish-status/${status}`)
      }
    }
  },
  getters: {
    getCapabilities (state) {
      return state.capabilities.map(item => item.value)
    },
    getPlatforms (state) {
      return state.playebleOn.map(item => item.platform)
    }
  }
}

export default store
