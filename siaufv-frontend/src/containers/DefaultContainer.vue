<template>
  <div class="app">
    <AppHeader fixed :style="dev">
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/home">
        <img class="navbar-brand-full" src="/img/brand/logo.svg" width="89" height="25" alt="SIA Logo">
        <img class="navbar-brand-minimized" src="/img/brand/sygnet.svg" width="30" height="30" alt="SIA Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" v-if="isLogged" to="/home">Home</b-nav-item>
        
        <b-nav-item class="px-3" v-if="isAdmin && isLogged" to="/admin/usuarios" exact>Usuários</b-nav-item>

        <!-- <b-nav-item class="px-3" v-if="isLogged" to="/formulario">Meu Formulário</b-nav-item> -->
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <!--<b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item>-->
        <b-nav-item class="px-3" v-if="isLogged" to="/meusdados">{{ email }}</b-nav-item>
        <b-nav-item class="px-3" v-if="!isLogged" to="/register" exact>Registrar</b-nav-item>
        <b-nav-item class="px-3" v-if="!isLogged" to="/login" exact>Login</b-nav-item>      
        <DefaultHeaderDropdownAccnt  v-if="isLogged"/>
      </b-navbar-nav>
      <!--<AsideToggler class="d-none d-lg-block" />-->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb class="noprint" :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <!--<TheFooter>
      
      <div>
        <a href="https://coreui.io">CoreUI</a>
        <span class="ml-1">&copy; 2018 creativeLabs.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">CoreUI for Vue</a>
      </div>
    </TheFooter>-->
  </div>
</template>

<script>
import nav from '@/_nav'
import nav_admin from '@/_nav_admin'
import nav_not_logged from '@/_nav_not_logged'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      //nav: nav.items,
      logged: true,
    }
  },
  computed: {

    nav() {
      if(this.$store.getters['auth/logado'] === false)
        return nav_not_logged.items
      else if(this.$store.getters['auth/logado'] === true && this.$store.getters['auth/permission'] === 'admin')
        return nav_admin.items 
      else 
        return nav.items       
    },

    name () {
      return this.$route.name
    },

    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },

    email () {
      return this.$store.getters['auth/email']
    },

    isAdmin () {
      if(this.$store.getters['auth/permission'] === 'admin')
        return true
      else 
        return false
    },

    isLogged () {
      return this.$store.getters['auth/logado']
    },

    dev() {
      if(process.env.NODE_ENV =='development'){
       return {
         backgroundColor:"yellow"
        }
      }
      else
         return {
           backgroundColor:"white"        
         }
    }
  }
}
</script>
