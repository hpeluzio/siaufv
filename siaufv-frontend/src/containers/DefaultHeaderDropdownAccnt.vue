<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src=""
        class="icon-user"
        alt="" ></img>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Minha Conta</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o" /> 
            Meus Dados
      </b-dropdown-item>
      <!--<b-dropdown-item><i class="fa fa-envelope-o" /> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-tasks" /> Tasks
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments" /> Comments
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item>-->
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Configurações</strong>
      </b-dropdown-header>
      <!--<b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-usd" /> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-file" /> Projects
        <b-badge variant="primary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item>-->
      <b-dropdown-item @click="logout"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  methods: {
    logout(){
      //sessionStorage.clear()
      sessionStorage.removeItem('user');
      this.$store.loggedIn = false
      this.$store.permission = ''    
      this.$router.push({ name: 'Login' })
      //window.location.reload(true);
    }
  }


}
</script>
