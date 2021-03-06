import GroupApiItem from "@/api/group.api"
import Vue from "vue";

// Состояние хранилища
const state ={
    groups:[]
};
// Для получения данных хранилища используются особые аттрибуты "геттеры"
const getters = {
    getGroups: state => state.groups,
};

// Мутации используются для изменения состояния
const mutations ={
    // Инициализация состояния
    SET_GROUPS: (state, payload) =>{
        state.groups = payload;
    },
    ADD_GROUP: (state, payload) =>{
        state.groups.push(payload)
    },
    EDIT_GROUP: (state, payload) => {
        const index = state.groups.findIndex(group => group.id === payload.id);
        Vue.set(state.todos, index, payload);
    }
    ,
    DELETE_GROUP: (state, payload) =>{
        const index = state.groups.findIndex(group => group.id === payload.id);
        if (index > -1){
            state.groups.splice(index, 1);
        }
        console.log(index);
    }
}

// Действия используются для асинхронных операций над состоянием
const actions = {
    initializeGroup: async(context,payload) =>{
        try {
            // Получение данных из API при помощи библиотеки axios
            const response = await GroupApiItem.groupApiItem.getByUserId(payload);
            // Осуществление мутации состояния
            context.commit('SET_GROUPS', response.data );
        }
        catch (error) {
            console.log("err init group");
        }
    },
    addGroup: async (context, payload) =>{
        try {
            const newGroup = {
                userId:payload.userId,
                groupTitle:payload.groupTitle,
                createdOn:new Date()
            }
            console.log(newGroup)
            const response = await GroupApiItem.groupApiItem.add(newGroup);
            context.commit("ADD_GROUP", response.data);
        }
        catch (error) {
            console.log("err add group");
        }
    },
    editGroup: async (context, payload) =>{
        try {
            console.log(payload);
            const response = await GroupApiItem.groupApiItem.edit(payload.id,payload.item);
            context.commit('EDIT_GROUP', response.data );
        }
        catch (error) {
            console.log("err edit group");
        }
    },
    deleteGroup: async (context, payload) =>{
        try {
            const response = await GroupApiItem.groupApiItem.delete(payload);
            console.log(response.data);
            context.commit('DELETE_GROUP', response.data );
        }
        catch (error) {
            console.log("err init group");
        }
    }
}
export const groups_module = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}