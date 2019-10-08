import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

var URL = process.env.VUE_APP_API_URL

const http = axios.create({
    baseURL: URL,
})

http.interceptors.request.use(config => {
    //Aqui vamos verificar se o cara está logado, caso estiver 
    //vamos simplesmente adicionar header authorization
    //console.log('http / axioos: logado? :', store.getters['auth/logado'])
    //console.log('http / axioos: token? :', store.getters['auth/token'])

    store.commit('SET_LOADER', true)
    // store.state.loader = true

    const token = store.getters['auth/token'];

    if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
        config.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    return config
}, error => {
    //Se der algum erro voltar aqui
    store.commit('SET_LOADER', false)
    return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.commit('SET_LOADER', false)
    return response;
    }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.commit('SET_LOADER', false)
    return Promise.reject(error);
    });

export default http