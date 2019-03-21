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
                        <h4>Este relatório contém as seguintes informações de sessões paineis:</h4>
                        <ul>
                          <li>Nome</li>
                          <li>Data</li>
                          <li>Horário</li>
                          <li>Instituto</li>
                          <li>Sala</li>
                          <li>Trabalhos</li>
                          <li>Avaliadores</li>
                        </ul>
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
                      <th><h1>RELATÓRIO DE PAINÉIS</h1></th> 
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
                        <th>Sala</th>
                        <th>Avaliações</th>

                      </tr>
                    </thead>
                    <tbody>               
                      <tr style="page-break-inside: avoid" align="center" height="40" v-for="(sessao, i) in sessoes_paineis_json" :key="i + '-first'" >
                        <td>{{ sessao.nome }}</td>
                        <td>{{ sessao.data }}</td> 
                        <td>{{ sessao.horario }}</td>
                        <td>{{ sessao.sala_nome }}</td>
                        <td>
                          <table border="1" style="width:100%; ">
                            <thead>
                              <tr align="center">
                                <th>Trabalho ID</th>
                                <th>Avaliadores</th> 
                              </tr>
                            </thead>
                            <tbody>
                              <tr align="center" v-for="(avaliacao, i) in sessao.avaliacoes" :key="i + '-third'" >
                                <td width="80px">{{ avaliacao.trabalho_id }}</td>
                                <td>
                                  <table border="1" style="width:100%; border-top: 0; border-left: 0; border-bottom: 0; border-right: 0;">
                                    <tbody>
                                      <tr align="center" v-for="(avaliador, i) in avaliacao.avaliadores" :key="i + '-third'" >
                                        <td>{{ avaliador.nome }}</td>
                                      </tr>
                                    </tbody>  
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>

                      </tr>
                    </tbody> 
                  </table>

                  <!-- <table border="1" style="width:100%; ">
                    <thead>
                      <tr align="center">
                        <th>Nome</th>
                        <th>Data</th> 
                        <th>Horário</th>
                        <th>Sala</th>
                        <th>Trabalho</th>
                        <th>Avaliador</th>
                      </tr>
                    </thead>
                    <tbody>               
                      <tr style="page-break-inside: avoid" align="center" height="40" v-for="(sessao, i) in sessoes_paineis" :key="i + '-second'" >
                        <td :rowspan="sessao.nome_rowspan" v-if="sessao.nome">{{ sessao.nome }}</td>
                        <td :rowspan="sessao.data_rowspan" v-if="sessao.data">{{ sessao.data }}</td> 
                        <td :rowspan="sessao.horario_rowspan" v-if="sessao.horario">{{ sessao.horario }}</td>
                        <td :rowspan="sessao.salas_nome_rowspan" v-if="sessao.salas_nome">{{ sessao.salas_nome }}</td>
                        <td :rowspan="sessao.avaliacoes_trabalho_id_rowspan" v-if="sessao.avaliacoes_trabalho_id">{{ sessao.avaliacoes_trabalho_id }}</td>
                        <td>{{ sessao.avaliadores_nome }}</td>
                      </tr>
                    </tbody> 
                  </table>  -->
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
    sessoes_paineis: [],
    sessoes_paineis_json: []
  }),

  created() {
    document.title = "SIA - Relatório de Painéis";
    //Pegando todos Sessoes Paineis Json
    this.getArrayAxiosSessoesPaineisJson()
  },

  methods: {
    imprimir() {
        window.print();
    },

    getArrayAxiosSessoesPaineisJson() {
      //Pegando todos Avaliacoes
      axios_instance({
        method: 'get',
        url: '/sessao'
      })
        .then(response => {
          this.sessoes_paineis_json = response.data.filter(sessao => {
            if(sessao.tipo === 1){
              sessao.data = moment(sessao.data).format('DD/MM/YYYY')
              sessao.horario = sessao.horario.split(":")[0] + ':' + sessao.horario.split(":")[1] + 
                ' às ' + sessao.horariofim.split(":")[0] + ':' + sessao.horariofim.split(":")[1]  
              sessao.horariofim = sessao.horariofim.split(":")[0] + ':' + sessao.horariofim.split(":")[1]  
              return sessao
            }  
          })
          // this.sessoes_paineis = helpers.jsPDF_HTMLrowSpan(this.sessoes_paineis, 'avaliacoes_trabalho_id')

          //this.sessoes_paineis[0].nome_rowspan = 2
          //console.log('REPORT SESSOES: ', this.sessoes_paineis_json)
        })
        .catch(error => {
          console.log(error)
        })
    }, 

    // getArrayAxiosSessoesPaineis() {
    //   //Pegando todos Avaliacoes
    //   axios_instance({
    //     method: 'get',
    //     url: '/sessao_report'
    //   })
    //     .then(response => {
    //       this.sessoes_paineis = response.data.filter(sessao => {
    //         if(sessao.tipo === 0){
    //           sessao.data = moment(sessao.data).format('DD/MM/YYYY')
    //           sessao.horario = sessao.horario.split(":")[0] + ':' + sessao.horario.split(":")[1] + 
    //             ' às ' + sessao.horariofim.split(":")[0] + ':' + sessao.horariofim.split(":")[1]  
    //           //sessao.horariofim = sessao.horariofim.split(":")[0] + ':' + sessao.horariofim.split(":")[1]  
    //           return sessao
    //         }  
    //       })
    //       this.sessoes_paineis = helpers.jsPDF_HTMLrowSpan(this.sessoes_paineis, 'nome')
    //       this.sessoes_paineis = helpers.jsPDF_HTMLrowSpan(this.sessoes_paineis, 'data')
    //       this.sessoes_paineis = helpers.jsPDF_HTMLrowSpan(this.sessoes_paineis, 'horario')
    //       this.sessoes_paineis = helpers.jsPDF_HTMLrowSpan(this.sessoes_paineis, 'salas_nome')
    //       this.sessoes_paineis = helpers.jsPDF_HTMLrowSpan(this.sessoes_paineis, 'avaliacoes_trabalho_id')

    //       //this.sessoes_paineis[0].nome_rowspan = 2
    //       //console.log('SESSOES: ', this.sessoes_paineis)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },    
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

