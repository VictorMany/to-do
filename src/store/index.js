import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: []
    },
    mutations: {
        UPDATE_TASKS(state, payload) {
            state.tasks = payload;
        }
    },
    actions: {
        addTasks(context, payload) {
            let tasks = context.state.tasks
            tasks = [...tasks, payload]
            context.commit('UPDATE_TASKS', tasks)
        }
    }
})