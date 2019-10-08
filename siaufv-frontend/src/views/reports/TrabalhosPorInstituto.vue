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
                      <th colspan="9" style="width: 100%">
                        <table border="0" class="alturaelarguraprint alturaelargurascreen">
                          <tr height="90" align="center">
                            <th>
                              <img src="@/assets/sia-images/sia-logo.png" alt="sia-logo" style="width:60px" />
                            </th>
                            <th>
                              <h1>RELATÓRIO DE TRABALHOS POR INSTITUTO</h1>
                            </th>
                            <th>
                              <img src="@/assets/sia-images/ufv-logo.png" alt="sia-logo" style="width:90px" />
                            </th>
                          </tr>
                        </table>
                      </th>
                    </tr>                       
                      <tr align="center">
                        <th class="paddingg">ID</th>
                        <th class="paddingg" >Título</th>
                        <th class="paddingg">Autor</th> 
                        <th class="paddingg">Orientador</th>
                        <th class="paddingg">Instituto</th>
                        <th class="paddingg">Data</th>
                        <th class="paddingg">Horário</th>
                        <th class="paddingg">Sala</th>
                        <th >Avaliadores</th>

                      </tr>
                    </thead>
                    <tbody>               
                      <tr style="page-break-inside: avoid" align="center" height="40" v-for="(trabalho, i) in filterTrabalhosInstituto" :key="i + '-first'" >
                        <td class="paddingg">{{ trabalho.trabalho_id }}</td>
                        <td class="paddingg">{{ trabalho.nome }}</td>
                        <td class="paddingg">
                          <table style="width:100%;">
                            <tbody>
                              <tr align="center" v-for="(autor, i) in trabalho.autores" :key="i + '-second'" >
                                <td>{{ autor.autor }}</td>
                              </tr>
                            </tbody>  
                          </table>                          
                        </td>
                        <td class="paddingg">{{ trabalho.orientador }}</td>
                        <td class="paddingg">{{ trabalho.instituto }}</td>
                        <td class="paddingg">{{ trabalho.sessao_data | formatDate }}</td>
                        <td class="paddingg">{{ trabalho.sessao_horario | formatHour}} às {{ trabalho.sessao_horariofim | formatHour}}</td>
                        <td class="paddingg">{{ trabalho.sala_nome }}</td>
                        <td class="paddingg">
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
import axios from 'axios';
import moment from 'moment'
const helpers = require('../../helpers')
import http_jsreport from '@/http/jsreport'
import { mapActions } from 'vuex'

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
    ... mapActions('reports', ['GET_TRABALHOS_POR_INSTITUTO_ACT']),

    imprimir() {
        window.print();
    },

    jsreport() {

      this.GET_TRABALHOS_POR_INSTITUTO_ACT(this.filterTrabalhosInstituto)

      //Todas CFGs do jsreport
      // const data = {"template":{"shortid":"Hyg-rz2U8r"},"data":{"trabalhos": this.filterTrabalhosInstituto}}

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
      //   link.download = 'SIA - Trabalhos por Instituto.pdf'
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
    page-break-after: always ;
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

  .sizew {
    width: 1% !important;
  }

  .sizew2 {
    width: 50% !important;
  }

  /* .no-print {
    visibility: hidden !important;
  }
  .do-print {
    visibility: visible !important;
  } */
}
</style>

