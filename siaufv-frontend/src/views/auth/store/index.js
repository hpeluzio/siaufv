import http from '@/http/api'

export default {
    namespaced: true,
    state: {
        logado: false,
        token: '',
        name: '',
        email: '',
        permission: ''
    },
    getters: {
        logado: state => state.logado,
        token: state => state.token,
        name: state => state.name,
        email: state => state.email,
        permission: state => state.permission
    }, 

    mutations: {
        SET_LOGAR: (state, payload) => { 

            state.logado = payload.logado
            state.token = payload.token
            state.name = payload.name
            state.email = payload.email
            state.permission = payload.permission
        },        
        SET_DESLOGAR: (state) => {
            state.logado = false
            state.token = ''
            state.name = ''
            state.email = ''
            state.permission = ''
        }
    },

    actions: {
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
                        permission: response.data.user.permission
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
            context.commit('SET_DESLOGAR')
        },
    }

}
