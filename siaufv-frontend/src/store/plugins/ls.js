import ls from 'local-storage'

const pluginLocalStorage = store => {
    console.log('STORE INIT')
    
    //store.dispatch('produtos/API_CALL_ACT')
    //store.commit('eventListener');
    store.commit('INITIALISE_STORE');


    store.subscribe((mutation, state) => {
      //console.log('mutation.type: ', mutation.type)
      ls.set('state', state)
    //   ls.set('auth', state.auth)
    })
  }

  export default pluginLocalStorage