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
            state.team = team[0];
        },
        setMembers(state, members) {
            state.members = members;
        },
        addMember(state, member) {
            state.members.push(member);
        },
    },
    actions: {
        async createTeam({dispatch, rootState}) {
            await axios.post('/team',{teamName: `${rootState.user.nickname} team`, teamLicenses: 5});
            dispatch('getTeam');
        },
        async getTeam({commit, dispatch}) {
            const team = await axios.get('/team');
            if(team.data.lenght === 0) {
                dispatch('createTeam');
            } else {
                commit('setTeam', team.data);
            }
        },
        async getMembers({commit, state}, params) {
            const members = await axios.get(`team/${state.team.id}/users`, {params: params})
            commit('setMembers', members.data.message);
        },
        async inviteMember({ state, commit }, member) {
            try{
                await axios.post(`team/${state.team.id}/invite-user/${member.email}`);
                commit('setMessageSuccess', 'Member invited successfully', {root: true})
            } catch (err) {
                commit('setMessageError', err.response.data.message, {root: true})
            }
        },
        async removeMember({ dispatch, state, commit }, id) {
            try{
                await axios.delete(`team/${state.team.id}/remove-user/${id}`);
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
