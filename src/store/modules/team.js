import axios from '@/axios/index';
const store = {
    namespaced: true,
    state() {
        return {
            team: null,
            members: null,
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
            const members = await axios.get(`team/${state.team.teamId}/users`, {params: params})
            commit('setMembers', members.data.message);
        },
        async inviteMember({ state, commit }, member) {
            try{
                await axios.post(`team/${state.team.teamId}/invite-user/${member.email}`);
                commit('setMessageSuccess', 'Member invited successfully', {root: true})
            } catch (err) {
                commit('setMessageError', err.response.data.message, {root: true})
            }
        },
        async removeMember({ dispatch, state, commit }, id) {
            try{
                await axios.delete(`team/${state.team.teamId}/remove-user/${id}`);
                dispatch("getMembers");
                commit('setMessageSuccess', 'User removed successfully', {root: true})
            } catch (err) {
                commit('setMessageError', err.response.data.message, {root: true})
            }
        },
    },
    getters: {},
};

export default store;
