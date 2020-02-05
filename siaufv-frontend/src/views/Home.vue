<template>
  <div class="animated fadeIn">
    <!-- Data Table -->
    <div data-app="true">
      <v-container grid-list-md fluid>
        <v-layout wrap>
          
          <v-flex d-flex xs12 sm6 md6>
              <b-card-body>
                <h1 v-if="!isAdmin">SIA<strong>UFV</strong></h1> 
                <h1 v-if="isAdmin">SIA<strong> UFV - ADMIN</strong></h1> 
                <p class="text-muted">Simpósio de integração acadêmica</p>
              </b-card-body>            
          </v-flex>

          <v-flex d-flex xs12 sm6 md6>
            <v-card flat>
              <v-card-text style="align: center">
                <!-- <h2 align="center" style="color: blue; font-style: italic;">Seja bem-vindo ao sistema do SIA</h2> -->
                <img src="@/assets/sia-images/sia-logo.png" alt="sia-logo" style="width:60px;"/>
                -
                <img src="@/assets/sia-images/ufv-logo.png" alt="sia-logo" style="width:90px">
              </v-card-text>
            </v-card>
          
          </v-flex>

          <v-flex d-flex xs12 sm6 md6>
            <v-card flat>
              <!-- <v-card-title v-if="!isAdmin">
                <v-flex d-flex xs12 sm6 md12>
                 <h3><strong>Para ter acesso as funcionalidades de inclusão/exclusão/edição consulte o instituto para ter a permissão</strong></h3>
                </v-flex>
              </v-card-title> -->
              
              <v-card-text >

                <!-- Home para ADMIN  -->
                <span v-if="isAdmin">
                  <h5><strong>Funcionalidades de inclusão</strong></h5>
                  <ul>
                    <li><b>Inclusão de Institutos</b></li>
                    <li><b>Inclusão de Anos</b></li>
                    <li><b>Inclusão de Salas</b></li>
                    <li><b>Inclusão de Avaliadores</b></li>
                    <li><b>Inclusão de Trabalhos</b></li>
                    <li><b>Inclusão de Sessões Orais</b></li>
                    <li><b>Inclusão de Painéis</b></li>
                  </ul>

                  <h5><strong>Funcionalidades de emissões e consultas</strong></h5>
                  <ul>
                    <li><b>Emissão de Relatórios de Avaliadores por instituto</b></li>
                    <li><b>Emissão de Relatórios de Trabalhos por instituto</b></li>                  
                    <li><b>Emissão de Relatórios de Salas e suas sessões</b></li>                  
                    <li><b>Emissão de Relatórios de Sessões Orais</b></li>
                    <li><b>Emissão de Relatórios de Painéis</b></li>

                  </ul> 

                  <h5><strong>Emissão de fichas dos trabalhos</strong></h5>
                  <ul>
                    <li><b>Emissão de fichas dos trabalhos orais</b></li>
                    <li><b>Emissão de fichas dos trabalhos paineis</b></li>                  

                  </ul> 
                </span>         

                <!-- Home para USER -->
                <span v-if="!isAdmin">
                  <h5><strong>Funcionalidades de emissões e consultas</strong></h5>
                  <ul>
                    <li><b>Emissão de Relatórios de Avaliadores por instituto</b></li>
                    <li><b>Emissão de Relatórios de Trabalhos por instituto</b></li>                  
                    <li><b>Emissão de Relatórios de Salas e suas sessões</b></li>                  
                    <li><b>Emissão de Relatórios de Sessões Orais</b></li>
                    <li><b>Emissão de Relatórios de Painéis</b></li>

                  </ul> 

                  <h5><strong>Emissão de fichas dos trabalhos</strong></h5>
                  <ul>
                    <li><b>Emissão de fichas dos trabalhos orais</b></li>
                    <li><b>Emissão de fichas dos trabalhos paineis</b></li>                  
                  </ul> 

                  <br>
                  <h3><strong>Para ter acesso as funcionalidades de inclusão/exclusão/edição de avaliadores e trabalhos consulte o instituto.</strong></h3>

                </span>                                           
              </v-card-text>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
  }),

  created() {
    document.title = "SIA - Home"    
  },

  computed: {
    isAdmin () {
      if(this.$store.getters['auth/permission'] === 'admin')
        return true
      else 
        return false
    }
  },

  methods: {
  }
}
</script>
