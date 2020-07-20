import Vue from 'vue'
import Vuex from 'vuex'
import { carStore } from '../store/car-store.js'
import { userStore } from '../store/user-store.js'
import { orderStore } from '../store/order-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        carStore,
        userStore,
        orderStore
    }
})