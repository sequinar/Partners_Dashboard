import axios from '@/axios/index'
const store = {
  namespaced: true,
  state () {
    return {
      team: null,
      members: null // {data: [], meta: {}}
    }
  },
  mutations: {
    setTeam (state, team) {
      state.team = Array.isArray(team) ? team[0] : team
    },
    setMembers (state, members) {
      state.members = members
    },
    addMember (state, member) {
      state.members.push(member)
    }
  },
  actions: {
    async createTeam ({ rootState, commit }) {
      const team = await axios.post('/team', { teamName: `${rootState.user.nickname} team`, teamLicenses: 5 })
      commit('setTeam', team.data.data)
      return team
    },
    async getTeam ({ commit }) {
      const team = await axios.get('/team')
      commit('setTeam', team.data.data)
      return team
    },
    async getMembers ({ commit, state }, data) {
      const members = await axios.get(`team/${data.teamId || state.team.teamId}/users`, {
        params: {
          limit: data.params.limit || 10,
          page: data.params.page || 1,
          filter: data.params.filter || ''
        }
      })
      commit('setMembers', members.data)
    },
    async inviteMember ({ state, commit }, member) {
      try {
        await axios.post(`team/${state.team.teamId}/invite-user/${member.email}`)
        commit('setMessageSuccess', 'Member invited successfully', { root: true })
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    },
    async removeMember ({ state, commit }, id) {
      try {
        await axios.delete(`team/${state.team.teamId}/remove-user/${id}`)
        commit('setMessageSuccess', 'User removed successfully', { root: true })
      } catch (err) {
        commit('setMessageError', err.response.data.error, { root: true })
      }
    }
  },
  getters: {
    getMemberByEmail: (state) => (email) => {
      return state.members.data.find(member => member.email === email)
    }
  }
}

export default store
