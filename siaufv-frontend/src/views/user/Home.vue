<template>
  <div class="animated fadeIn">
    <!-- Data Table -->
    <div data-app="true">
      <v-container grid-list-md fluid>
        <v-layout wrap>
          
          <v-flex d-flex xs12 sm6 md6>
              <b-card-body>
                <h1>SIA<strong>UFV</strong></h1> 
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
              <v-card-title>
                <v-flex d-flex xs12 sm6 md12>
                 <h3 ><strong>FUNCIONALIDADES DO SISTEMA</strong></h3>
                </v-flex>
        

              </v-card-title>
              <v-card-text >
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
                  <li><b>Emissão de Relatórios de Sessões Orais</b></li>
                  <li><b>Emissão de Relatórios de Painéis</b></li>
                  <li><b>Emissão de Relatórios de Avaliadores por instituto</b></li>
                  <li><b>Emissão de Relatórios de Trabalhos por instituto</b></li>
                </ul>                
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

  //methods
  methods: {
  }
}
</script>
