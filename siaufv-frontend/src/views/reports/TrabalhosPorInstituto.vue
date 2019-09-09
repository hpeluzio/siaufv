<template>
  <div class="animated fadeIn">
    <!-- Data Table -->
    <div data-app="true">

      <v-container grid-list-md fluid>
            <v-card flat class="noprint">
                <v-card-title>
                  <v-flex d-flex xs12 sm12 md12>
                    <v-card flat>
                      <v-card-text >
                        <h4>Este relatório contém as seguintes informações de trabalhos por instituto:</h4>
                        <ul>
                          <li>ID do trabalho</li>
                          <li>Autores do trabalho</li>
                          <li>Instituto do trabalho</li>
                          <li>Data do trabalho</li>
                          <li>Data e horário do trabalho</li>
                          <li>Sala do trabalho</li>
                          <li>Avaliadores de cada do trabalho</li>

                        </ul>
                              <v-flex xs12 sm12 md12>
                                <v-select
                                  :items="institutos"
                                  item-value="instituto"
                                  item-text="instituto"
                                  outline
                                  v-model="filtroTrabalhoInstituto"
                                  label="Filtrar por Instituto"
                                ></v-select>
                              </v-flex>

                              <v-flex xs12 sm12 md12>
                                <v-select
                                  :items="tipos"
                                  item-value="id"
                                  item-text="tipo"
                                  outline
                                  v-model="filtroTrabalhoTipo"
                                  label="Filtrar por Tipo"
                                ></v-select>
                              </v-flex>     

                      </v-card-text>
                    </v-card>                    
                    <v-spacer></v-spacer>
                    <v-icon color="blue" large @click="imprimir()">print</v-icon>
                  </v-flex>
                </v-card-title>    
            </v-card>
        <v-layout wrap>
          <v-flex d-flex xs12 sm12 md12>

            <v-card flat>
              <v-card-title>

                <table border="0" style="width:100%; ">
                  <tr height="90" align="center">
                    
                      <th><img src="@/assets/sia-images/sia-logo.png" alt="sia-logo" style="width:60px"></th>
                      <th><h1>RELATÓRIO DE TRABALHOS POR INSTITUTO</h1></th> 
                      <th><img src="@/assets/sia-images/ufv-logo.png" alt="sia-logo" style="width:90px"></th>
                    </tr>
                </table>

              </v-card-title>
              <v-card-text>

                  <table border="1" style="width:100%; ">
                    <thead>
                      <tr align="center">
                        <th style="width: 6%;">ID</th>
                        <th style="width: 20%;">Título</th>
                        <th style="width: 20%;">Autor</th> 
                        <th style="width: 10%;">Orientador</th>
                        <th style="width: 6%;">Instituto</th>
                        <th style="width: 6%;">Data</th>
                        <th style="width: 6%;">Horário</th>
                        <th style="width: 6%;">Sala</th>
                        <th >Avaliadores</th>

                      </tr>
                    </thead>
                    <tbody>               
                      <tr style="page-break-inside: avoid" align="center" height="40" v-for="(trabalho, i) in filterTrabalhosInstituto" :key="i + '-first'" >
                        <td>{{ trabalho.trabalho_id }}</td>
                        <td>{{ trabalho.nome }}</td>
                        <td>
                          <table style="width:100%;">
                            <tbody>
                              <tr align="center" v-for="(autor, i) in trabalho.autores" :key="i + '-second'" >
                                <td>{{ autor.autor }}</td>
                              </tr>
                            </tbody>  
                          </table>                          
                        </td>
                        <td>{{ trabalho.orientador }}</td>
                        <td>{{ trabalho.instituto }}</td>
                        <td>{{ trabalho.sessao_data | formatDate }}</td>
                        <td>{{ trabalho.sessao_horario }}</td>
                        <td>{{ trabalho.sala_nome }}</td>
                        <td>
                          <table  style="width:100%;">
                            <tbody>
                              <tr align="center" v-for="(avaliador, i) in trabalho.avaliadores" :key="i + '-third'" >
                                <td>{{ avaliador.nome }}</td>
                              </tr>
                            </tbody>  
                          </table>                            
                        </td>
                      </tr>
                    </tbody> 
                  </table>

              </v-card-text>
            </v-card>
          </v-flex>

        </v-layout>


      </v-container>
    </div>
  </div>
</template>

<script>
import axios_instance from '../../axios'
import moment from 'moment'
const helpers = require('../../helpers')

export default {
  data: () => ({
    trabalhos_json: [],
    institutos: [],
    tipos: [],
    filtroTrabalhoInstituto: '',
    filtroTrabalhoTipo: '',
  }),

  created() {
    document.title = "SIA - Relatório de Trabalhos por Instituto";
    //Pegando todos Trabalhos Json
    this.getArrayAxiosTrabalhosJson()    
    //Setando Institutos
    this.setArrayInstitutos()
    //Setando Tipos Painel E Oral
    this.setArrayTipos()    
  },

  computed: {
    filterTrabalhosInstituto() {
      //console.log('FILTRO TRABALHO')
      //console.log('FILTRO TIPO:', this.filtroTrabalhoTipo)

      if (this.filtroTrabalhoInstituto === '' && this.filtroTrabalhoTipo === '') 
        return this.trabalhos_json

      if (this.filtroTrabalhoInstituto !== '' && this.filtroTrabalhoTipo === '')
        return this.trabalhos_json.filter(trabalho => {
          if (this.filtroTrabalhoInstituto == trabalho.instituto) 
            return trabalho
        })

      if (this.filtroTrabalhoInstituto !== '' && this.filtroTrabalhoTipo !== '')
        return this.trabalhos_json.filter(trabalho => {
          if (this.filtroTrabalhoInstituto == trabalho.instituto && this.filtroTrabalhoTipo == trabalho.sala_tipo) 
            return trabalho
        })

      if (this.filtroTrabalhoInstituto === '' && this.filtroTrabalhoTipo !== '')
        return this.trabalhos_json.filter(trabalho => {
          if (this.filtroTrabalhoTipo == trabalho.sala_tipo) 
            return trabalho
        })
    }
  },

  filters:{
    formatDate(date) {
      if (date) {
        return moment.utc(String(date)).format('DD/MM/YYYY')
      }
    }
  },

  methods: {
    imprimir() {
        window.print();
    },

    setArrayInstitutos() {
      //Inicializando instituto com '' para zerar o filtro das selections
      this.institutos.push({ instituto: '' })

      //Pegando todos os anos
      this.$axios({
        method: 'get',
        url: '/instituto'
      })
        .then(response => {
          for (let i in response.data)
            this.institutos.push({
              instituto: response.data[i].instituto
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

    getArrayAxiosTrabalhosJson() {
      //Pegando todos Avaliadores
      this.$axios({
        method: 'get',
        url: '/trabalhos_por_instituto'
      })
        .then(response => {
          this.trabalhos_json = response.data
          this.trabalhos_json.sort(function(a,b) {
              return a.autores[0].autor < b.autores[0].autor  ? -1 : a.autores[0].autor  > b.autores[0].autor  ? 1 : 0;
          });
          console.log('this.trabalhos_json ', this.trabalhos_json)
        })
        .catch(error => {
          console.log(error)
        })
    },

    setArrayTipos() {
      this.tipos.push({ id: '', tipo: '' }, { id: 0, tipo: 'Oral' }, { id: 1, tipo: 'Painel' })
    },

  }
}
</script>
<style>

 @media print {
  .noprint{
    display: none !important;
  }

  /* table { page-break-after:auto !important}
  tr    { page-break-inside:avoid !important; page-break-after:auto !important}
  td    { page-break-inside:avoid !important; page-break-after:auto !important}
  thead { display:table-header-group !important}
  tbody { display:table-footer-group !important} */

  /* .tr {
      page-break-inside: avoid !important;
  }   */
}
</style>

