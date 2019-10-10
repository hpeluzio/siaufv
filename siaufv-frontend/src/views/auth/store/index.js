import http from '@/http/api'

export default {
    namespaced: true,
    state: {
        logado: false,
        token: '',
        name: '',
        email: '',
        permission: '',
        id: '',
        created_at: '',
        updated_at: ''
    },
    getters: {
        logado: state => state.logado,
        token: state => state.token,
        name: state => state.name,
        email: state => state.email,
        permission: state => state.permission,
        id: state => state.id,
        created_at: state => state.created_at,
        updated_at: state => state.updated_at
    }, 

    mutations: {
        SET_UPDATE_USER: (state, payload) => {
            state.name = payload.name
            state.email = payload.email
        },
        
        SET_LOGAR: (state, payload) => { 
            state.logado = payload.logado
            state.token = payload.token
            state.name = payload.name
            state.email = payload.email
            state.permission = payload.permission
            state.id = payload.id
            state.created_at = payload.created_at
            state.updated_at = payload.updated_at
        },

        SET_DESLOGAR: (state) => {
            state.logado = false
            state.token = ''
            state.name = ''
            state.email = ''
            state.permission = ''
            state.id = ''
            state.created_at = ''
            state.updated_at = ''
        }
    },

    actions: {
        SET_UPDATE_USER_ACT (context, payload) { 

            return new Promise((resolve, reject) => {
                http({
                    method: 'put',
                    url: '/usuario/' + context.state.id + '',
                    data: {
                        id: context.state.id,
                        name: payload.name,
                        email: payload.email,
                        password: payload.password,
                        confirm_password: payload.confirm_password
                    }         
                })   
                .then(response => {
                    context.commit('SET_UPDATE_USER', {
                        name: payload.name,
                        email: payload.email,
                    })                 
                    resolve(response)
                })
                .catch(error => {
                  console.log(error)
                  reject(error)
                });
            })
          
        },

        SET_LOGAR_ACT ( context, payload ) { 

            return new Promise((resolve, reject) => {
                http({
                    method: 'post',
                    url:'/login',
                    data: {
                        email: payload.email,
                        password: payload.password
                    },          
                })   
                .then(response => {
                    // Se entrar aqui autenticou com sucesso
                    //console.log("response.data.user: ", response.data )
                    context.commit('SET_LOGAR', {
                        logado: true,
                        token: response.data.token.token,
                        name: response.data.user.name,
                        email: response.data.user.email,
                        permission: response.data.user.permission,
                        id: response.data.user.id,
                        created_at: response.data.user.created_at,
                        updated_at: response.data.user.updated_at
                    })
                    
                    //localStorage.setItem('user', JSON.stringify(response.data))

                    resolve(response)
                    //return 'success'
                })
                .catch(error => {
                  console.log(error)
                  reject(error)
                });
            })
            
        },

        SET_REGISTER_ACT ( context, payload ) { 

            return new Promise((resolve, reject) => {

                http({
                    method: 'post',
                    url: '/register',
                    data: {
                      name: payload.name,
                      email: payload.email,
                      password: payload.password,
                      confirm_password: payload.confirm_password
                    }
                  })      
                  .then(response => {

                    context.commit('SET_LOGAR', {
                        logado: true,
                        token: response.data.token.token,
                        name: response.data.user.name,
                        email: response.data.user.email,
                        permission: response.data.user.permission
                    })
                    //   this.$router.push('/home')

                  })
                  .catch((error) => {
                    console.log(error);
                  }); 

                http({
                    method: 'post',
                    url:'/login',
                    data: {
                        email: payload.email,
                        password: payload.password
                    },          
                })   
                .then(response => {
                    // Se entrar aqui autenticou com sucesso
                    //console.log("response.data.user: ", response.data )
                    context.commit('SET_LOGAR', {
                        logado: true,
                        token: response.data.token.token,
                        name: response.data.user.name,
                        email: response.data.user.email,
                        permission: response.data.user.permission
                    })
 
                    resolve(response)
                    //return 'success'
                })
                .catch(error => {
                  console.log(error)
                  reject(error)
                });
            })
            
        },

        SET_DESLOGAR_ACT (context ) {
            localStorage.removeItem('state')
            context.commit('SET_DESLOGAR')
        },
    }

}
