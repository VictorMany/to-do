import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //state vars for tasks and aux tasks
    state: {
        tasks: [],
        auxTasks: [],
        openEdit: false
    },
    //mutations for array tasks state
    mutations: {
        ADD_TASKS(state, payload) {
            state.tasks = payload;
        },
        ADD_ONE_TASK(state, payload) {
            state.tasks.unshift(payload);
        },
        UPDATE_AUXTASKS(state, payload) {
            state.auxTasks = payload;
        },
        OPEN_EDIT(state, payload) {
            state.openEdit = payload;
        },
        UPDATE_ONE_TASK(state, payload) {
            state.tasks.splice(payload.index, 1)

            state.tasks = [...state.tasks.slice(0, payload.index),
            payload.note,
            ...state.tasks.slice(payload.index)]
        },
        DELETE_ONE_TASK(state, payload) {
            state.tasks.splice(payload, 1)
        }
    },
    //Actions that call my mutations (I can call this actions from anywhere inside the project)
    actions: {
        addTasks(context, payload) {
            context.commit('ADD_TASKS', payload)
        },

        addOneTask(context, payload) {
            context.commit('ADD_ONE_TASK', payload)
        },

        searchTasks(context, payload) {
            let tasks = [payload]
            context.commit('UPDATE_TASKS', tasks)
        },

        openEdit(context, payload) {
            context.commit('OPEN_EDIT', payload)
        },

        updateOneTask(context, payload) {
            context.commit('UPDATE_ONE_TASK', payload)
        },

        deleteOneTask(context, payload) {
            context.commit('DELETE_ONE_TASK', payload)
        },
    }
})