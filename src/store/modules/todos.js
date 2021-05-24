import TodoApiItem from "@/api/todoitem.api";
import Vue from 'vue';

const state = {
    todos: []
};

const getters ={
    allTodos: state => state.todos,
    getTodos: state => state.todos.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdOn) - new Date(a.createdOn);
    }),
    getTodayTodos: state => state.todos.filter(checkToday),
    //todo ::
    getImportantTodos: state => state.todos,
    //todo ::
    getPlannedTodos: state => state.todos,
    getCompletedTodos: state => state.todos.filter(todo => todo.completed),
    getTodoById: state => (id) =>{
        let todo =  state.todos.find(item => item.id === id);
        console.log(id, todo);
        return todo;
    }
};

const mutations = {
    SET_TODOS: (state, payload) =>{
        if (payload.length === 0)
            state.todos = [];
        else
            state.todos = payload;
    },
    ADD_TODO: (state, payload) =>{
        state.todos.unshift(payload);
    },
    TOGGLE_TODO: (state, payload) =>{
        const item = state.todos.find(todo => todo.id === payload.id);
        item.isCompleted = !item.isCompleted;
        item.completedOn = payload.completedOn;
    },
    EDIT_TODO: (state, payload) =>{
        const item_id = state.todos.findIndex(todo => todo.id === payload.id);
        console.log(payload.id);
        // Object.assign(item, payload);
        Vue.set(state.todos, item_id, payload);
        // this.$set(this.state,item_id,payload);
        console.log(state.todos)
    },
    DELETE_TODO: (state, payload) =>{
        const index = state.todos.findIndex(todo => todo.id === payload.id);
        console.log("id:"+payload.id+" index:"+index)
        state.todos.splice(index,1);
    },

};


const actions ={
    initAll: async(context) =>{
        try {
            const response = await TodoApiItem.todoApiItem.getAll();
            context.commit('SET_TODOS', response.data );
        }
        catch (error) {
            console.log("err init all todos");
        }
    },
    initByUser: async(context,id) =>{
        try {
            const response = await TodoApiItem.todoApiItem.getByUserId(id);
            context.commit('SET_TODOS', response.data );
        }
        catch (error) {
            console.log("err init todos by User id: "+error);
        }
    },
    initByGroup: async(context,id) =>{
        try {
            const response = await TodoApiItem.todoApiItem.getByGroupId(id);
            console.log(response.data);
            context.commit('SET_TODOS', response.data );
        }
        catch (error) {
            console.log("err init todos by group id: "+error);
        }
    },
    addTodo: async (context, item) =>{
        try {
            const newTodo = {
                groupId:item.groupId,
                itemText:item.itemText,
                createdOn:new Date(),
                isCompleted:false,
                importanceLvl:"1",
                completeBy:item.completeBy
            }
            const response = await TodoApiItem.todoApiItem.add(newTodo);
            context.commit('ADD_TODO', response.data );
        }
        catch (error) {
            console.log("err add todo"+error);
        }
    },
    toggleTodo: async (context, id) =>{
        try {
            const response = await TodoApiItem.todoApiItem.toggle(id);
            context.commit('TOGGLE_TODO', response.data );
        }
        catch (error) {
            console.log("err toggle todo");
        }
    },
    editTodo: async (context, payload) =>{
        try {
            const response = await TodoApiItem.todoApiItem.edit(payload.id, payload.item);
            context.commit('EDIT_TODO', response.data );
        }
        catch (error) {
            if( error.response ){
                console.log(error.response.data); // => the response payload
            }
        }
    },
    deleteTodo: async (context, id) =>{
        try {
            const response = await TodoApiItem.todoApiItem.delete(id);
            context.commit('DELETE_TODO', response.data );
        }
        catch (error) {
            console.log("err delete todo");
        }
    },
}

export const todo_module = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
}

function checkToday(todo){
    let today = new Date();
    let todo_date = new Date(todo.completeBy);
    return today.toDateString() === todo_date.toDateString()
}