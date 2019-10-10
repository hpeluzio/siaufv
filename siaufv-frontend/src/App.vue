<template>
  <div>
    <Loader></Loader>
    <router-view></router-view>
  </div>
</template>

<script>
import Loader from './Loader'

export default {
  name: 'app',
  components: {
    Loader
  },

  watch: {
    //Observa o estado de autenticacao
    logado(newValue, oldValue) {
      if(newValue === false)
        this.$router.push('login')
      if(newValue === true){
        if(this.$store.getters['auth/permission'] === 'admin')
          this.$router.push('admin')
        else
          this.$router.push('home')
      }
    }
  },

  computed: {
    SET_LOADER() {
      return this.$store.state.loader
    },

    logado() {
      return this.$store.getters['auth/logado']
    }
  },
  
}
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
