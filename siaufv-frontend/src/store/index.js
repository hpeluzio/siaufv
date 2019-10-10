import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

import ls from './plugins/ls'

export default new Vuex.Store({
    state: {
        loader: false
    },
    modules,
    mutations: {
        SET_LOADER (state, payload) {
            state.loader = payload
        },

		INITIALISE_STORE (state) {
            // Check if the ID exists
            // var st = JSON.parse(localStorage.getItem('state'))
            // console.log('auth:? ', st.auth.logado)
            // console.log('auth:? ', state.auth)

			if(localStorage.getItem('state')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('state')))
				);
			}
        },                 
    },
    plugins:[ls]    
})