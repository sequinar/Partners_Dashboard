const store = {
    namespaced: true,
    state() {
        return {
            members: [
                {
                    date: "2016-05-03",
                    name: "Jhon Doe",
                    worlds: "All worlds",
                    role: "Admin",
                    email: "jhondoe@mail.com",
                    id: 1,
                },
                {
                    date: "2016-05-03",
                    name: "Jhon Doe",
                    worlds: "All worlds",
                    role: "Admin",
                    email: "jhondoe@mail.com",
                    id: 2,
                },
                {
                    date: "2016-05-03",
                    name: "Jhon Doe",
                    worlds: "All worlds",
                    role: "Admin",
                    email: "jhondoe@mail.com",
                    id: 3,
                },
            ],
        };
    },
    mutations: {
        addMember(state, member) {
            state.members.push(member);
        },
        removeMember(state, id) {
            state.members = state.members.filter((member) => member.id !== id);
        },
    },
    actions: {
        addMember({ commit }, member) {
            commit("addMember", member);
        },
        removeMember({ commit }, id) {
            commit("removeMember", id);
        },
    },
    getters: {
        getMembers: (state) => {
            return state.members;
        },
    },
};

export default store;
