

const state = {
    todos: [{
        id:0,
        text:'example text',
        completed: false,
        complete_by: "2021-03-27",
        importance_lvl:3,
        group_id: 1
    }, {
        id:1,
        completed: true,
        text:'new test',
        complete_by: "2021-04-10",
        importance_lvl: 5,
        group_id: 1
    },{
        id:2,
        completed: true,
        text:'new test',
        complete_by: "2021-03-29",
        importance_lvl: 5,
        group_id: 2
    }],
};

const getters ={
    getTodos: state => state.todos,
    doneTodos: state => state.todos.filter(todo => todo.completed),
    getTodoByGroup: state => (id) =>{
        return state.todos.filter(todo => todo.group_id === id)
    },
    getTodayTodos: state => state.todos.filter(checkToday)
};

const mutations = {
    ADD_TODO: (state, payload) =>{
        const newTask={
            id: payload.newId,
            text: payload.text,
            completed: false,
            steps: [],
            complete_by: payload.complete_by,
            importance_lvl:1,
            group_id: payload.group_id
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
            state.todos[index].text = payload.new_text;
        }
    },

    FULL_EDIT_TODO: (state, payload) =>{
        const index = state.todos.findIndex(todo => todo.id === payload.id);
        if (index>-1){
            state.todos[index].text = payload.text;
            state.todos[index].complete_by = payload.data.state.complete_by;
            state.todos[index].importance_lvl = payload.imp_lvl;
        }
    }

};


const actions ={
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
    fullEditTodo: (context, payload) =>{
        context.commit("FULL_EDIT_TODO", payload);
    }
}

export const todo_module = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
}

function checkToday(todo){
    let today = new Date();
    let todo_date = new Date(todo.complete_by);
    return today.toDateString() === todo_date.toDateString()
}