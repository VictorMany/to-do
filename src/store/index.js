import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [],
        auxTasks: []
    },
    mutations: {
        UPDATE_TASKS(state, payload) {
            state.tasks = payload;
        },
        UPDATE_AUXTASKS(state, payload) {
            state.auxTasks = payload;
        }
    },
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