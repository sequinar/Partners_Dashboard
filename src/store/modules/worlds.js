import axios from '@/axios/index'
const store = {
  namespaced: true,
  state () {
    return {
      worlds: null, // {data: [], meta: {}}
      currentWorld: null,
      worldBanners: [],
      file: null,
      editedWorld: null,
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
    setFile (state, file) {
      state.file = file
    },
    setEditedWorld (state, world) {
      state.editedWorld = world
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
        commit('setEditedWorld', response.data.data)
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
    async getWorld ({ rootState, commit }, worldId) {
      const response = await axios.get(`team/${rootState.team.team.teamId}/world/${worldId}`)
      commit('setEditedWorld', response.data.data)
    },
    async getCurrentWorld ({ commit }, worldId) {
      const world = await axios.get(`world/${worldId}/get-world-state`)
      commit('setCurrentWorld', world.data.data[0])
    },
    async getBanners ({ commit }, id) {
      const banners = await axios.get(`world/${id}/world-banner`)
      commit('setBanners', banners.data)
    },
    async getUploadUrl ({ state }, data) {
      const response = await axios.post(`world/${state.editedWorld.publicId}/getprojectuploadurl`, data)
      return response.data.data
    },
    async getCapabilities ({ commit }) {
      const response = await axios.get('world/capability')
      commit('setCapabilities', response.data.data)
    },
    async getPlatforms ({ commit }) {
      const response = await axios.get('world/playabel-platforms')
      commit('setPlayableOn', response.data.data)
    },
    async getWorldFileInfo ({ commit }, worldId) {
      const response = await axios.get(`/world/${worldId}/file`)
      commit('setFile', response.data.data)
    },
    async updateWorld ({ rootState, commit }, data) {
      try {
        await axios.post(`team/${rootState.team.team.teamId}/world/${data.worldId}`, data.world)
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async updateFeaturedImage ({ state }, image) {
      if (state.editedWorld?.publicId) {
        const axiosInstance = axios.create()
        delete axiosInstance.defaults.headers.common.Authorization
        const urls = await axios.post('/presigned-url', {
          fileName: image.name,
          uploadFolder: 'featured_images'
        })
        const { getUrl, postUrl } = urls.data.data
        await axiosInstance({
          method: 'put',
          url: postUrl,
          data: image.raw
        })
        await axios.post(`world/${state.editedWorld.publicId}/world-feature`, {
          fileUrl: getUrl
        })
      }
    },
    async updateThumbnailImage ({ state }, image) {
      if (state.editedWorld?.publicId) {
        await axios.post(`world/${state.editedWorld.publicId}/world-thumbnail`, image)
      }
    },
    async updateGallery ({ state }, images) {
      if (state.editedWorld?.publicId) {
        await axios.post(`world/${state.editedWorld.publicId}/world-image`, images)
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
    async deleteFeaturedImage ({ commit }, worldId) {
      try {
        await axios.delete(`world/${worldId}/world-feature`)
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async deleteThumbnailImage ({ commit }, worldId) {
      try {
        await axios.delete(`world/${worldId}/world-thumbnail-image`)
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async deleteGalleryImage ({ commit, state }, imageId) {
      try {
        await axios.delete(`world/${state.editedWorld.publicId}/world-image/${imageId}`)
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async deleteWorldFile ({ commit }, worldId) {
      try {
        await axios.delete(`world/${worldId}/file`)
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async completeMultipartUpload ({ state }, data) {
      await axios.post(`world/${state.editedWorld.publicId}/completemultipartupload`, data)
    },
    async setWorldStatus ({ state }, status) {
      if (state.editedWorld?.publicId) {
        await axios.post(`world/${state.editedWorld.publicId}/publish-status/${status}`)
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
