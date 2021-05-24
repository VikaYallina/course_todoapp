import StepApiItem from "@/api/step.api";
import Vue from 'vue';

const state = {
    steps:[]
}

const getters = {
    getStepsByTodo: (state) => (id) =>{
        return state.steps.filter(item => item.todoItem.id === id);
    },
    getSteps: (state) => state.steps,
}

const mutations ={
    SET_STEPS: (state, payload) =>{
        state.steps = payload;
    },
    ADD_STEP: (state, payload) =>{
        state.steps.push(payload)
    },

    TOGGLE_STEP: (state, payload) => {
    const step = state.steps.find(step => step.id === payload);
        step.completed = !step.completed
    },

    EDIT_STEP: (state, payload) =>{
        const index = state.steps.findIndex(step => step.id === payload.id);
        Vue.set(state.steps,index,payload)
    },

    DELETE_STEP: (state, payload)=>{
        const index = state.steps.findIndex(step => step.id === payload);
        state.steps.splice(index, 1)
    }
}

const actions = {
    initStepsByGroup: async(context, payload) =>{
        try{
            const response = await StepApiItem.stepApiItem.getByGroupId(payload);
            context.commit('SET_STEPS', response.data );
        }catch (error){
            console.log("err init step");
        }
    },
    initStepsByUser: async(context, payload) =>{
        try{
            const response = await StepApiItem.stepApiItem.getByUserId(payload);
            context.commit('SET_STEPS', response.data );
        }catch (error){
            console.log("err init step");
        }
    },
    addStep: async (context, payload) =>{
        try {
            const response = await StepApiItem.stepApiItem.add(payload);
            context.commit('ADD_STEP', response.data );
        }
        catch (error) {
            console.log("err add step");
        }
    },
    toggleStep: async (context, payload) =>{
        try {
            const response = await StepApiItem.stepApiItem.toggle(payload);
            context.commit('TOGGLE_STEP', response.data );
        }
        catch (error) {
            console.log("err toggle step");
        }
    },
    editStep: async (context, payload) =>{
        try {
            const response = await StepApiItem.stepApiItem.edit(payload.id,payload.item);
            context.commit('EDIT_STEP', response.data );
        }
        catch (error) {
            console.log("err edit step");
        }
    },
    deleteStep: async (context, payload) =>{
        try {
            const response = await StepApiItem.stepApiItem.delete(payload);
            context.commit('DELETE_STEP', response.data );
        }
        catch (error) {
            console.log("err delete step");
        }
    }
}

export const steps = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}