// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'

// todo
// cssVars()

Vue.use(BootstrapVue)

//Axios


// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
import pt from 'vuetify/src/locale/pt.ts'
Vue.use(Vuetify,{
  lang:{
    locales: { 'pt': pt }
  }
})

// Veevalidate
import VeeValidate, { Validator } from 'vee-validate';
import pt_BR from 'vee-validate/dist/locale/pt_BR';
Vue.use(VeeValidate, {fieldsBagName: 'formFields'}); // Esse fieldsBagName é só pra tirar o warn de conflito com field do veevalidate
Validator.localize('pt_BR', pt_BR);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
