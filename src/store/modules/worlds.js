import axios from '@/axios/index';
const store = {
    namespaced: true,
    state() {
        return {
            worlds: [],
            currentWorld: null,
            worldBanners: []
        };
    },
    mutations: {
        setWorlds(state, worlds) {
            state.worlds = worlds;
        },
        setCurrentWorld(state, world) {
            state.currentWorld = world;
        },
        setBanners(state, banners) {
            state.worldBanners = banners;
        }
    },
    actions: {
        async createWorld({dispatch, rootState}, data) {
            await axios.post(`team/${rootState.team.team.id}/worlds`, {
                worldname: data.name, 
                worlddescription: data.descrition, 
                customizations: data.customizations, 
                thumbnail: data.thumbnail 
            });
            dispatch('getWorlds');
        },
        async getWorlds({commit, rootState}) {
            let worlds = await axios.get(`/team/${rootState.team.team.id}/worlds`);
            commit('setWorlds', worlds.data.message);
        },
        async getCurrentWorld({commit}, worldId) {
            let world = await axios.get(`world/${worldId}/get-world-state`);
            commit('setCurrentWorld', world.data[0]);
        },
        async getBanners({commit}, id) {
            let banners = await axios.get(`world/${id}/world-banner`);
            commit('setBanners', banners);
        },
        async updateChatStatus({dispatch}, data) {
            await axios.post(`world/${data.id}/update-chat-status/${data.status}`);
            dispatch('getCurrentWorld', data.id);
        },
        async updateStreamStatus({dispatch}, data) {
            await axios.post(`world/${data.id}/stream-status/${data.status}`);
            dispatch('getCurrentWorld', data.id);
        },
        async updateBanners({dispatch}, data) {
            await axios.post(`world/${data.id}/world-banner?placement=${data.placement}&size=${data.size}`, data.formData)
            dispatch('getCurrentWorld', data.id);
            dispatch('getBanners', data.id);
        }
    },
    getters: {},
};

export default store;
