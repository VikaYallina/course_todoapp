import Vue from "vue";
import Vuex from "vuex";
import {todo_module} from "@/store/modules/todos.js";
import {steps} from "@/store/modules/steps";
import {groups_module} from "@/store/modules/groups";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        todo: todo_module,
        step: steps,
        groups: groups_module
    }
});