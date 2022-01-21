import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //state vars for tasks and aux tasks
    state: {
        tasks: [],
        auxTasks: []
    },
    //mutations for array tasks state
    mutations: {
        UPDATE_TASKS(state, payload) {
            state.tasks = payload;
        },
        UPDATE_AUXTASKS(state, payload) {
            state.auxTasks = payload;
        }
    },
    //Actions that call my mutations (I can call this actions from anywhere inside the project)
    actions: {
        addTasks(context, payload) {
            let tasks = context.state.tasks
            tasks = [...tasks, payload]
            context.commit('UPDATE_TASKS', tasks)
            context.commit('UPDATE_AUXTASKS', tasks)
        },
        searchTasks(context, payload) {
            let tasks = [payload]
            context.commit('UPDATE_TASKS', tasks)
        }
    }
})