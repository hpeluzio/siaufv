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
                        <h4>Este relatório contém as seguintes informações de avaliadores por instituto:</h4>
                        <ul>
                          <li>Nome do avaliador</li>
                          <li>Data da avaliação</li>
                          <li>Horário da avaliação</li>
                          <li>Instituto do avaliador</li>
                          <li>Sala da avaliação</li>
                          <li>Tipo da avaliação</li>
                          <li>ID do Trabalho</li>

                        </ul>
                              <v-flex xs12 sm12 md12>
                                <v-select
                                  :items="institutos"
                                  item-value="instituto"
                                  item-text="instituto"
                                  outline
                                  v-model="filtroAvaliadorInstituto"
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
                      <th><h1>RELATÓRIO DE AVALIADORES POR INSTITUTO</h1></th> 
                      <th><img src="@/assets/sia-images/ufv-logo.png" alt="sia-logo" style="width:90px"></th>
                    </tr>
                </table>

              </v-card-title>
              <v-card-text>

                  <table border="1" style="width:100%; ">
                    <thead>
                      <tr align="center">
                        <th>Nome</th>
                        <th>Data</th> 
                        <th>Horário</th>
                        <th>Instituto</th>
                        <th>Sala</th>
                        <th>Tipo</th>
                        <th>Trabalho ID</th>

                      </tr>
                    </thead>
                    <tbody>               
                      <tr style="page-break-inside: avoid" align="center" height="40" v-for="(avaliador, i) in filterAvaliadoresInstituto" :key="i + '-first'" >
                        <td>{{ avaliador.nome }}</td>
                        <td>{{ avaliador.sessao_data }}</td> 
                        <td>{{ avaliador.sessao_horario }}</td>
                        <td>{{ avaliador.instituto }}</td>
                        <td>{{ avaliador.sala_nome }}</td>
                        <td>{{ avaliador.sala_tipo }}</td>
                        <td>{{ avaliador.trabalho_id }}</td>
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
    sessoes_json: [],
    avaliadores_json: [],
    institutos: [],
    tipos: [],
    filtroAvaliadorInstituto: '',
    filtroTrabalhoTipo: '',
  }),

  created() {
    document.title = "SIA - Relatório de Avaliadores por Instituto";
    //Pegando todos Sessoes Orais Json
    this.getArrayAxiosAvaliadoresJson()
    //Setando Institutos
    this.setArrayInstitutos()
    //Setando Tipos Painel E Oral
    this.setArrayTipos()    
  },

  computed: {
    filterAvaliadoresInstituto() {

      console.log('Avaliadores', this.avaliadores_json)
      console.log('Tipo',  this.filtroTrabalhoTipo)

      if (this.filtroAvaliadorInstituto === '' && this.filtroTrabalhoTipo === '') 
        return this.avaliadores_json

      if (this.filtroAvaliadorInstituto !== '' && this.filtroTrabalhoTipo === '')
        return this.avaliadores_json.filter(avaliador => {
          if (this.filtroAvaliadorInstituto == avaliador.instituto) 
            return avaliador
        })

      if (this.filtroAvaliadorInstituto !== '' && this.filtroTrabalhoTipo !== '')
        return this.avaliadores_json.filter(avaliador => {
          if (this.filtroAvaliadorInstituto == avaliador.instituto && this.filtroTrabalhoTipo == avaliador.sala_tipo_id) 
            return avaliador
        })

      if (this.filtroAvaliadorInstituto === '' && this.filtroTrabalhoTipo !== '')
        return this.avaliadores_json.filter(avaliador => {
          if (this.filtroTrabalhoTipo == avaliador.sala_tipo_id) 
            return avaliador
        })
    },

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

    getArrayAxiosAvaliadoresJson() {
      //Pegando todos Avaliadores
      axios_instance({
        method: 'get',
        url: '/avaliadores_por_instituto'
      })
        .then(response => {
          this.avaliadores_json = response.data
          this.avaliadores_json = response.data.filter(avaliador => {
            //if(sessao.tipo === 0){
            // Pego tudo, orais e paineis
              avaliador.sessao_data = moment(avaliador.sessao_data).format('DD/MM/YYYY')
              avaliador.sessao_horario = avaliador.sessao_horario.split(":")[0] + ':' + avaliador.sessao_horario.split(":")[1] + 
                ' às ' + avaliador.sessao_horariofim.split(":")[0] + ':' + avaliador.sessao_horariofim.split(":")[1]  
              avaliador.sessao_horariofim = avaliador.sessao_horariofim.split(":")[0] + ':' + avaliador.sessao_horariofim.split(":")[1]  
              if(avaliador.sala_tipo === 0){
                avaliador.sala_tipo = 'Oral'
                avaliador.sala_tipo_id = 0
               } 
              else {
                avaliador.sala_tipo = 'Painél'
                avaliador.sala_tipo_id = 1
              }
              return avaliador
            //}  
          })
          //console.log('avaliadores_json: ', this.avaliadores_json)
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

