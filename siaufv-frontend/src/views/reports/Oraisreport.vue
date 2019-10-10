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
                        <h4>Este relatório contém as seguintes informações de sessões orais:</h4>
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

                <table border="0" class="alturaelarguraprint alturaelargurascreen">
                  <tr height="90" align="center">
                    
                      <th><img src="@/assets/sia-images/sia-logo.png" alt="sia-logo" style="width:60px"></th>
                      <th><h1>RELATÓRIO DE SESSÕES ORAIS</h1></th> 
                      <th><img src="@/assets/sia-images/ufv-logo.png" alt="sia-logo" style="width:90px"></th>
                    </tr>
                </table>

              </v-card-title>
              <v-card-text>

                  <table border="1" class="alturaelarguraprint alturaelargurascreen">
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
                      <tr style="page-break-inside: avoid" align="center" height="40" v-for="(sessao, i) in sessoes_orais_json" :key="i + '-first'" >
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

              </v-card-text>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import http_api from '@/http/api'
import moment from 'moment'
const helpers = require('../../helpers')

export default {
  data: () => ({
    sessoes_orais_json: []
  }),

  created() {
    document.title = "SIA - Relatório de Sessões Orais";
    //Pegando todos Sessoes Orais Json
    this.getArrayAxiosSessoesOraisJson()
  },

  methods: {
    imprimir() {
        window.print();
    },

    getArrayAxiosSessoesOraisJson() {
      //Pegando todos Avaliacoes
      http_api({
        method: 'get',
        url: '/sessao'
      })
        .then(response => {
          this.sessoes_orais_json = response.data.filter(sessao => {
            if(sessao.tipo === 0){
              sessao.data = moment.utc(sessao.data).format('DD/MM/YYYY')
              sessao.horario = sessao.horario.split(":")[0] + ':' + sessao.horario.split(":")[1] + 
                ' às ' + sessao.horariofim.split(":")[0] + ':' + sessao.horariofim.split(":")[1]  
              sessao.horariofim = sessao.horariofim.split(":")[0] + ':' + sessao.horariofim.split(":")[1]  
              return sessao
            }  
          })
          //console.log('REPORT SESSOES: ', this.sessoes_orais_json)
        })
        .catch(error => {
          console.log(error)
        })
    }, 
   
  }
}
</script>
<style>
@media screen {
    .noscreen {
        display: none !important;
    }
    .alturaelargurascreen {
      width: 100%; 
      /* min-width: 22.5cm; */
    }
}

@media print {

  @page :first {
  margin: 0;
  /* margin-right: 1.5cm; */
  }

  @page {
    size: A4;
    margin: 0;
    margin-top: 1.5cm;
    /* margin-right: 1.5cm; */
  }

  .noprint {
    display: none;
  }

  .pagebreak {
    page-break-after: always ;
  }

  .alturaelarguraprint {
    max-width: 22.5cm; 
    min-width: 22.5cm;
  }

  /* .no-print {
    visibility: hidden !important;
  }
  .do-print {
    visibility: visible !important;
  } */
}


</style>

