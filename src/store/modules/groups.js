const state ={
    groups:[{
        id:1,
        name:"Test group"
    },{
        id:2,
        name:"ABCDE"
    }]
};

const getters = {
    getGroups: state => state.groups,
};

const mutations ={
    ADD_GROUP: (state, payload) =>{
        const newGroup = {
            id: payload.id,
            name:payload.name
        }
        state.groups.unshift(newGroup)
    },
    EDIT_GROUP: (state, payload) => {
        const group = state.groups.find(group => group.id === payload.id);
        group.text = payload.newtext;
    }
    ,
    DELETE_GROUP: (state, payload) =>{
        const index = state.groups.findIndex(group => group.id === payload.id);
        if (index > -1){
            state.groups.splice(index, 1);
        }
    }
}

const actions = {
    addGroup:(context, payload) =>{
        context.commit("ADD_GROUP", payload);
    },
    editGroup:(context, payload) =>{
        context.commit("EDIT_GROUP", payload);
    },
    deleteGroup:(context, payload) =>{
        context.commit("DELETE_GROUP", payload);
    }
}
export const groups_module = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}