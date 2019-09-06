<template>
  <div class="animated fadeIn">
    <!-- Data Table -->
    <div data-app="true">
      <v-container grid-list-md fluid>
        <v-card flat class="noprint">
          <v-card-title>
            <v-flex d-flex xs12 sm12 md12>
              <v-card flat>
                <v-card-text>
                  <h4>Este relatório contém as seguintes informações:</h4>
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
                      v-model="filtroInstituto"
                      label="Filtrar por Instituto"
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-select
                      :items="tipos"
                      item-value="id"
                      item-text="tipo"
                      outline
                      v-model="filtroTipo"
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
              </v-card-title>
              <v-card-text>
                <!-- tabela da sala -->
                <!-- <div class="pagebreak"></div> -->
                <table
                  class="pagebreak"
                  align="center"
                  height="40"
                  v-for="(sala, i) in filterSalas"
                  :key="i + '-first'"
                  border="1"
                  style="width:100%; "
                >
                  <thead class="pagebreak">
                    <tr align="center">
                      <th style="width:100%;">
                        <table border="0" style="width:100%; ">
                          <tr height="90" align="center">
                            <th>
                              <img
                                src="@/assets/sia-images/sia-logo.png"
                                alt="sia-logo"
                                style="width:60px"
                              />
                            </th>
                            <th>
                              <h1>{{ sala.nome }}</h1>
                            </th>
                            <th>
                              <img
                                src="@/assets/sia-images/ufv-logo.png"
                                alt="sia-logo"
                                style="width:90px"
                              />
                            </th>
                          </tr>
                        </table>

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <!-- Tabela da sessao -->
                        <table border="1" style="width:100%;">
                          <thead>
                            <tr align="center">
                              <th style="width:10%;">Instituto</th>
                              <th style="width:10%;">Data</th>
                              <th style="width:10%;">Horário</th>
                              <th style="width:70%;">Trabalho</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              align="center"
                              v-for="(sessao, i) in sala.sessoes"
                              :key="i + '-second'"
                            >
                              <td>{{ sessao.instituto }}</td>
                              <td>{{ sessao.data | formatDate() }}</td>
                              <td>{{ sessao.horario | formatHour }} às {{ sessao.horariofim | formatHour }}</td>
                              <td>
                                <!-- tabela do trabalho -->
                                <table border="1" style="width:100%;">
                                  <thead>
                                    <tr align="center">
                                      <th style="width:60%;">Título</th>
                                      <th style="width:40%;">Avaliadores</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      align="center"
                                      v-for="(avaliacao, i) in sessao.avaliacoes"
                                      :key="i + '-third'"
                                    >
                                      <td>{{ avaliacao.nome }}</td>
                                      <td>
                                        <!-- tabela dos avaliadores -->
                                        <table border="0" style="width:100%; ">
                                          <tbody>
                                            <tr
                                              align="center"
                                              v-for="(avaliador, i) in avaliacao.avaliadores"
                                              :key="i + '-fourth'"
                                            >
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
    salas_sessoes_avaliadores_json: [],
    institutos: [],
    tipos: [],
    filtroInstituto: '',
    filtroTipo: ''
  }),

  created() {
    document.title = 'SIA - Relatório de Salas e suas Sessões'
    //Pegando todos Trabalhos Json
    this.getArrayAxiosTrabalhosJson()
    //Pegando todos Trabalhos Json
    this.getArrayAxiosSalasSessoesAvaliadoresJson()
    //Setando Institutos
    this.setArrayInstitutos()
    //Setando Tipos Painel E Oral
    this.setArrayTipos()
  },

  filters: {
    formatDate(date) {
      if (date) {
        return moment.utc(String(date)).format('DD/MM/YYYY')
      }
    },
    formatHour(hour) {
      //return 'oi'
      if (hour) {
        return hour.split(':')[0] + ':' + hour.split(':')[1]
        //return moment.utc(String(hour)).format('DD/MM/YYYY')
      }
    }
  },

  computed: {
    filterSalas() {
      //instituto = '' e tipo = ''
      if (this.filtroInstituto === '' && this.filtroTipo === '')
        return this.salas_sessoes_avaliadores_json

      //instituto = 'IAP' e tipo = ''
      if (this.filtroInstituto !== '' && this.filtroTipo === '') {
        return this.salas_sessoes_avaliadores_json.filter(sala => {
          return sala.sessoes.find(sessao => {
            if (this.filtroInstituto == sessao.instituto) {
              return sala
            }
          })
        })
      }

      //instituto = 'IAP' e tipo = 'Oral'
      if (this.filtroInstituto !== '' && this.filtroTipo !== '') {
        return this.salas_sessoes_avaliadores_json.filter(sala => {
          return sala.sessoes.find(sessao => {
            if (
              this.filtroInstituto == sessao.instituto &&
              this.filtroTipo == sessao.tipo
            ) {
              return sala
            }
          })
        })
      }

      //instituto = '' e tipo = 'Oral'
      if (this.filtroInstituto === '' && this.filtroTipo !== '') {
        return this.salas_sessoes_avaliadores_json.filter(sala => {
          return sala.sessoes.find(sessao => {
            if (this.filtroTipo == sessao.tipo) {
              return sala
            }
          })
        })
      }
    }
  },

  methods: {
    imprimir() {
      window.print()
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

    getArrayAxiosSalasSessoesAvaliadoresJson() {
      //Pegando todos Avaliadores
      this.$axios({
        method: 'get',
        url: '/sessoes_por_sala'
      })
        .then(response => {
          this.salas_sessoes_avaliadores_json = response.data
          // this.trabalhos_json.sort(function(a,b) {
          //     return a.autores[0].autor < b.autores[0].autor  ? -1 : a.autores[0].autor  > b.autores[0].autor  ? 1 : 0;
          // });
          console.log(
            'salas_sessoes_avaliadores_json ',
            this.salas_sessoes_avaliadores_json
          )
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
          this.trabalhos_json.sort(function(a, b) {
            return a.autores[0].autor < b.autores[0].autor
              ? -1
              : a.autores[0].autor > b.autores[0].autor
              ? 1
              : 0
          })
          console.log('this.trabalhos_json ', this.trabalhos_json)
        })
        .catch(error => {
          console.log(error)
        })
    },

    setArrayTipos() {
      this.tipos.push(
        { id: '', tipo: '' },
        { id: 0, tipo: 'Oral' },
        { id: 1, tipo: 'Painel' }
      )
    }
  }
}
</script>
<style>
@media print {
  .quebra {
    page-break-after: always !important;
  }

  .noprint {
    display: none !important;
  }

  .pagebreak {
    page-break-after: always !important;
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

.bordas {
  border-style: solid;
  border-width: 1px;
}

.bordascoluna {
  border-right: none;
  border-left: none;
  border-bottom: none;
  border-top: none;
}
</style>

