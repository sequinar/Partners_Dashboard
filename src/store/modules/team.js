import axios from '@/axios/index';
const store = {
    namespaced: true,
    state() {
        return {
            team: null,
            members: [],
        };
    },
    mutations: {
        setTeam(state, team) {
            state.team = Array.isArray(team) ? team[0] : team;
        },
        setMembers(state, members) {
            state.members = members;
        },
        addMember(state, member) {
            state.members.push(member);
        },
    },
    actions: {
        async createTeam({rootState, commit}) {
            let team = await axios.post('/team',{teamName: `${rootState.user.nickname} team`, teamLicenses: 5});
            commit('setTeam', team.data);
            return team;
        },
        async getTeam({commit}) {
            const team = await axios.get('/team');
            commit('setTeam', team.data);
            return team;
        },
        async getMembers({commit, state}, params) {
            const members = await axios.get(`team/${state.team.id}/users`, {params: params})
            commit('setMembers', members.data.message);
        },
        async inviteMember({ state }, member) {
            await axios.post(`team/${state.team.id}/invite-user/${member.email}`);
        },
        async removeMember({ dispatch, state }, id) {
            await axios.delete(`team/${state.team.id}/remove-user/${id}`);
            dispatch("getMembers");
        },
    },
    getters: {},
};

export default store;
