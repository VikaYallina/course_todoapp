const state = {
    steps:[{
        id:0,
        text:"test",
        todo_id:0,
        completed:false
    },{
        id:1,
        text:"new test",
        todo_id:1,
        completed:true
    }]
}

const getters = {
    getStepsByTodo: (state) => (id) =>{
        return state.steps.filter(item => item.todo_id === id);
    },
    getSteps: (state) => state.steps,
}

const mutations ={
    ADD_STEP: (state, payload) =>{
        const new_step ={
            id: payload.newId,
            text: payload.text,
            todo_id: payload.todo_id,
            completed: false
        }
        state.steps.push(new_step)
    },

    TOGGLE_STEP: (state, payload) => {
    const step = state.steps.find(step => step.id === payload);
        step.completed = !step.completed
    },

    EDIT_STEP: (state, payload) =>{
        const step = state.steps.find(step => step.id === payload.id);
        if (step.text){
            step.text = payload.text;
        }
    },

    DELETE_STEP: (state, payload)=>{
        const index = state.steps.findIndex(step => step.id === payload);
        state.steps.splice(index, 1)
    }
}

const actions = {
    addStep: (context, payload) =>{
        context.commit('ADD_STEP',payload);
    },
    toggleStep: (context, payload) =>{
        context.commit('TOGGLE_STEP',payload);
    },
    edit_step: (context, payload) =>{
        context.commit('EDIT_STEP',payload);
    },
    delete_step: (context, payload) =>{
        context.commit('DELETE_STEP',payload);
    }
}

export const steps = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}