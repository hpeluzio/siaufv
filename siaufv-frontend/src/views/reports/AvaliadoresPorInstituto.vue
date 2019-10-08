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
              <v-icon color="black" large @click="jsreport()">archive</v-icon>
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
                <table border="1" class="alturaelarguraprint alturaelargurascreen">
                  <thead>
                    <tr align="center">
                      <th colspan="8" style="width: 100%">
                        <table border="0" class="alturaelarguraprint alturaelargurascreen">
                          <tr height="90" align="center">
                            <th>
                              <img src="@/assets/sia-images/sia-logo.png" alt="sia-logo" style="width:60px" />
                            </th>
                            <th>
                              <h1>RELATÓRIO DE AVALIADORES POR INSTITUTO</h1>
                            </th>
                            <th>
                              <img src="@/assets/sia-images/ufv-logo.png" alt="sia-logo" style="width:90px" />
                            </th>
                          </tr>
                        </table>
                      </th>
                    </tr>                    
                    <tr align="center">
                      <th class="paddingg" style="width: 15%">Nome</th>
                      <th class="paddingg" style="width: 10%">Data</th>
                      <th class="paddingg" style="width: 10%">Horário</th>
                      <th class="paddingg" style="width: 6%">Instituto</th>
                      <th class="paddingg" style="width: 9%">Sala</th>
                      <th class="paddingg" style="width: 6%">Tipo</th>
                      <th class="paddingg" style="width: 9%">Trabalho ID</th>
                      <th>Título do Trabalho</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      align="center"
                      height="40"
                      v-for="(avaliador, i) in filterAvaliadoresInstituto"
                      :key="i + '-first'"
                    >
                      <td class="paddingg">{{ avaliador.nome }}</td>
                      <td class="paddingg">{{ avaliador.sessao_data | formatDate}}</td>
                      <td class="paddingg">{{ avaliador.sessao_horario | formatHour}} às {{ avaliador.sessao_horariofim | formatHour}}</td>
                      <td class="paddingg">{{ avaliador.instituto }}</td>
                      <td class="paddingg">{{ avaliador.sala_nome }}</td>
                      <td class="paddingg">{{ avaliador.sala_tipo }}</td>
                      <td class="paddingg">{{ avaliador.trabalho_id }}</td>
                      <td class="paddingg">{{ avaliador.trabalhos_nome }}</td>
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
import moment from 'moment'
import axios from 'axios';
import http_jsreport from '@/http/jsreport'
const helpers = require('../../helpers')
import { mapActions } from 'vuex'

export default {
  data: () => ({
    sessoes_json: [],
    avaliadores_json: [],
    institutos: [],
    tipos: [],
    filtroAvaliadorInstituto: '',
    filtroTrabalhoTipo: ''
  }),

  created() {
    document.title = 'SIA - Relatório de Avaliadores por Instituto'
    //Pegando todos Sessoes Orais Json
    this.getArrayAxiosAvaliadoresJson()
    //Setando Institutos
    this.setArrayInstitutos()
    //Setando Tipos Painel E Oral
    this.setArrayTipos()
  },

  computed: {
    filterAvaliadoresInstituto() {
      if (
        this.filtroAvaliadorInstituto === '' &&
        this.filtroTrabalhoTipo === ''
      )
        return this.avaliadores_json

      if (
        this.filtroAvaliadorInstituto !== '' &&
        this.filtroTrabalhoTipo === ''
      )
        return this.avaliadores_json.filter(avaliador => {
          if (this.filtroAvaliadorInstituto == avaliador.instituto)
            return avaliador
        })

      if (
        this.filtroAvaliadorInstituto !== '' &&
        this.filtroTrabalhoTipo !== ''
      )
        return this.avaliadores_json.filter(avaliador => {
          if (
            this.filtroAvaliadorInstituto == avaliador.instituto &&
            this.filtroTrabalhoTipo == avaliador.sala_tipo_id
          )
            return avaliador
        })

      if (
        this.filtroAvaliadorInstituto === '' &&
        this.filtroTrabalhoTipo !== ''
      )
        return this.avaliadores_json.filter(avaliador => {
          if (this.filtroTrabalhoTipo == avaliador.sala_tipo_id)
            return avaliador
        })
    }
  },

  filters:{
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
    },     
  },

  methods: {
    ... mapActions('reports', ['GET_AVALIADORES_POR_INSTITUTO_ACT']),

    imprimir() {
      window.print()
    },

    jsreport() {
      //Todas CFGs do jsreport
      this.GET_AVALIADORES_POR_INSTITUTO_ACT(this.filterAvaliadoresInstituto)
      // const data = {"template":{"shortid":"S1e_9nhULS"},"data":{"avaliadores": this.filterAvaliadoresInstituto}}

      // axios.post(process.env.VUE_APP_API_JSREPORT_URL, data, {
      //     responseType: 'arraybuffer',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     auth: {
      //       username: process.env.VUE_APP_API_JSREPORT_USER,
      //       password: process.env.VUE_APP_API_JSREPORT_PASSWORD
      //     },          
      // })   
      // .then(function (response) {
      //   //return response.download('', 'test.pdf', '');
      //   let blob = new Blob([response.data], { type: 'application/pdf' })
      //   let link = document.createElement('a')
      //   link.href = window.URL.createObjectURL(blob)
      //   link.download = 'SIA - Avaliadores por Instituto.pdf'
      //   document.body.appendChild(link);
      //   link.click()       
      //   document.body.removeChild(link);  
      //   //console.log(response.data);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });  
        
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
      this.$axios({
        method: 'get',
        url: '/avaliadores_por_instituto'
      })
        .then(response => {
          //this.avaliadores_json = response.data
          this.avaliadores_json = response.data.filter(avaliador => {
            //if(sessao.tipo === 0){
            // Pego tudo, orais e paineis
            if (avaliador.sala_tipo === 0) {
              avaliador.sala_tipo = 'Oral'
              avaliador.sala_tipo_id = 0
            } else {
              avaliador.sala_tipo = 'Painel'
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
    /* margin: 0; */
    margin-top: 0;
    margin-left: 1.5cm;
    margin-right: 1.5cm;
    margin-bottom: 2.5cm;
  }

  @page {
    /* Por algum motivo com tamanho a4 o page break funciona */
    size: A4;
    /* margin: 0; */
    /* margin-top: 2.5cm;
    margin-left: 1.5cm;
    margin-right: 1.5cm;
    margin-bottom: 2.5cm; */
  }

  .noprint {
    display: none;
  }

  .pagebreak {
    page-break-after: always;
  }

  .alturaelarguraprint {
    max-width: 100%; 
    min-width: 100%;
  }

  .paddingg {
    padding: 5px;
  }

  .page-break-in {
    page-break-inside: avoid;
  }

  /* .no-print {
    visibility: hidden !important;
  }
  .do-print {
    visibility: visible !important;
  } */
}
</style>

