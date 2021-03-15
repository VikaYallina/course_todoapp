export const state = {
    todos: [],
    currentGroup:0
};

export const getters ={
    getTodos: state => state.todos,
    getCurrGroup: state => state.currentGroup
};

export const mutations = {
    ADD_TODO: (state, payload) =>{
        const newTask={
            id: payload.newId,
            text: payload.text,
            completed: false,
            edit: false
        }
        state.todos.unshift(newTask);
    },

    TOGGLE_TODO: (state, payload) =>{
        const item = state.todos.find(todo => todo.id === payload);
        item.completed = !item.completed
    },

     DELETE_TODO: (state, payload) =>{
        const index = state.todos.findIndex(todo => todo.id === payload);
        state.todos.splice(index,1);

     },

    EDIT_TODO: (state, payload) =>{
        const index = state.todos.findIndex(todo => todo.id === payload.id);
        if (index>-1){
            state.todos[index] = payload.text;
        }
    },

    CHANGE_GROUP: (state, payload) =>{
        state.currentGroup = payload;
    }
};


export const actions ={
    addTodo: (context, payload) =>{
        context.commit("ADD_TODO", payload);
    },
    toggleTodo: (context, payload) =>{
        context.commit("TOGGLE_TODO", payload);
    },
    deleteTodo: (context, payload) =>{
        context.commit("DELETE_TODO",payload);
    },
    editTodo: (context, payload) =>{
        context.commit("EDIT_TODO",payload)
    },
    changeGroup: (context, payload) =>{
        context.commit("CHANGE_GROUP", payload);
    }
}