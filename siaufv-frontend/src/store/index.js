import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

// import ls from './plugins/ls'

export default new Vuex.Store({
    state: {
        loader: false
    },
    modules,
    mutations: {
        SET_LOADER(state, payload) {
            state.loader = payload
        }          
    }    
})