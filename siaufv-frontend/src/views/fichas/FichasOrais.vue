<template>
  <div class="animated fadeIn ">
    <!-- Data Table -->
    <div data-app="true">
      <v-container grid-list-md fluid>
        <v-card flat class="noprint">
          <v-card-title>
            <v-flex d-flex xs12 sm12 md12>
              <v-card flat>
                <v-card-text>
                  <h4>Fichas de Trabalhos Orais</h4>
                  <ul>
                    <li>Caso precise utilize filtro do instituto</li>
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
                </v-card-text>
              </v-card>
              <v-spacer></v-spacer>
              <v-icon color="blue" large @click="imprimir()">print</v-icon>
            </v-flex>
          </v-card-title>
        </v-card>
        <!-- Aqui começa a ficha -->
        <v-layout
          wrap
          class="pagebreak noscreen"

          
          v-for="(trabalho, i) in filterTrabalhosInstituto"
          :key="i + '-first'"
        >
          
            <v-card flat>
              <v-card-text>
                <!-- Aqui começa a tabela -->
                <table border="1" class="alturaelargura">
                  <thead>
                    <tr>
                      <td style="width:25%;"></td>
                      <td style="width:25%;"></td>
                      <td style="width:15%;"></td>
                      <td style="width:35%;"></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="sialogo" style="width:15%;">
                        <img
                          src="@/assets/sia-images/sia-logo.png"
                          alt="sia-logo"
                          style="width:60px"
                        />
                        SIA
                      </td>
                      <td class="ufv" colspan="3">
                        UNIVERSIDADE FEDERAL DE VIÇOSA<br />
                        CAMPUS RIO PARANAÍBA<br />
                        SIMPÓSIO DE INTEGRAÇÃO ACADÊMICA<br />
                      </td>
                    </tr>
                    <tr>
                      <td class="apresentacao" colspan="4">
                        <center style=" font-weight: bold;">APRESENTAÇÃO ORAL</center>1. As notas deverão ser ranqueadas, ou seja, deve-se evitar a repetição de notas entre o grupo de trabalhos avaliados.
                        <br />2. Favor seguir a pontuação indicada em cada item.
                        <br />3. Esta ficha deverá ser preenchida, guardada no envelope recebido e devolvida ao monitor da sala após a sessão de avaliação dos trabalhos.
                        <br />4. Favor preencher a nota final de cada avaliação no local indicado no envelope. Caso o apresentador não tenha comparecido, favor indicar com um hífen (-).
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="conteudo1"><span style="color:BLUE">NÚMERO ID do TRABALHO:</span> {{ trabalho.trabalho_id }}</td>
                    </tr>
                    <tr>
                      <td colspan="4" class="conteudo1"><div><span style="color:BLUE">Título do TRABALHO:</span> {{ trabalho.nome }} </div></td>
                    </tr>
                    <tr>
                      <td colspan="4" class="conteudo1">APRESENTADO POR:</td>
                    </tr>
                    <tr>
                      <td
                        colspan="4"
                        class="conteudo1"
                      >NÃO APRESENTADO (&nbsp; &nbsp; &nbsp; &nbsp;)</td>
                    </tr>
                    <tr>
                      <td
                        colspan="4"
                        class="conteudo1"
                      >PRESENÇA DO ORIENTADOR OU JUSTIFICATIVA FORMAL: SIM (&nbsp; &nbsp; &nbsp; &nbsp;) NÃO (&nbsp; &nbsp; &nbsp; &nbsp;)</td>
                    </tr>
                    <tr>
                      <td colspan="4" class="conteudo1">
                        <center>APRESENTAÇÃO – VALOR: 50 PONTOS</center>
                      </td>
                    </tr>
                    <tr>
                      <td class="conteudo2" colspan="3">Domínio do assunto (20 pontos)</td>
                      <td
                        class="conteudo2"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td class="conteudo2" colspan="3">Adequação e clareza de linguagem (10 pontos)</td>
                      <td
                        class="conteudo2"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td
                        class="conteudo2"
                        colspan="3"
                      >Qualidade dos recursos audiovisuais (10 pontos)</td>
                      <td
                        class="conteudo2"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td class="conteudo2" colspan="3">Utilização do tempo (10 pontos)</td>
                      <td
                        class="conteudo2"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td class="conteudo1" colspan="4">
                        <center>CONTEÚDO – VALOR: 50 PONTOS</center>
                      </td>
                    </tr>
                    <tr>
                      <td class="conteudo2" colspan="3">Relevância científica e social (10 pontos)</td>
                      <td
                        class="conteudo2"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td class="conteudo2" colspan="3">Justificativa e objetivos (10 pontos)</td>
                      <td
                        class="conteudo2"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td class="conteudo2" colspan="3">Adequação da metodologia (10 pontos)</td>
                      <td
                        class="conteudo2"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td
                        class="conteudo2"
                        colspan="3"
                      >Qualidade e abrangência dos resultados apresentados (10 pontos)</td>
                      <td
                        class="conteudo2"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td class="conteudo2" colspan="3">Originalidade (10 pontos)</td>
                      <td
                        class="conteudo2"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td class="conteudo1" colspan="3">TOTAL DE PONTOS:</td>
                      <td
                        class="conteudo1"
                        colspan="1"
                        style="text-align: center;"
                      >(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;) pontos</td>
                    </tr>
                    <tr>
                      <td class="comentarios" colspan="4">COMENTÁRIOS (Opcional):</td>
                    </tr>
                  </tbody>
                </table>

                <div class="conteudo1">
                  <br />
                  <p>NOME ( LEGÍVEL) DO AVALIADOR: __________________________________________</p>
                  <p>MATRÍCULA UFV DO AVALIADOR: ________________</p>
                </div>
                <div class="conteudo1" style="text-align:center">
                  <p>_______________________________________________________</p>
                  <p>Assinatura do Avaliador</p>
                </div>
                <!--                 <table border="1" style="width:100%; ">
                  <thead>
                    <tr align="center">
                      <th style="width: 15%">ID</th>
                      <th style="width: 10%">nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="page-break-inside: avoid" align="center">
                      <td>{{ trabalho.trabalho_id }}</td>
                      <td>{{ trabalho.nome }}</td>
                    </tr>
                  </tbody>
                </table>-->
                <!-- Aqui termina a tabela -->
              </v-card-text>
            </v-card>
          
        </v-layout>
        <!-- Aqui termina a ficha -->
      </v-container>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
const helpers = require('../../helpers')

export default {
  data: () => ({
    trabalhos: [],
    institutos: [],
    filtroTrabalhoInstituto: ''
  }),

  created() {
    document.title = 'SIA - Fichas de Trabalhos Orais'
    //Pegando todos Trabalhos Orais
    this.getArrayAxiosTrabalhos()
    //Setando Institutos
    this.setArrayInstitutos()
  },

  computed: {
    filterTrabalhosInstituto() {
      if (this.filtroTrabalhoInstituto === '') return this.trabalhos

      if (this.filtroTrabalhoInstituto !== '') {
        return this.trabalhos.filter(trabalho => {
          if (this.filtroTrabalhoInstituto == trabalho.instituto)
            return trabalho
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

    getArrayAxiosTrabalhos() {
      //Pegando todos Avaliadores
      this.$axios({
        method: 'get',
        url: '/trabalho'
      })
        .then(response => {
          //this.avaliadores_json = response.data
          this.trabalhos = response.data.filter(trabalho => {
            if (trabalho.tipo === 0) return trabalho
          })
          //console.log('FICHAS TRABALHOS ORAIS: ', this.trabalhos)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
@media screen {
    .noscreen {
        display: none;
    }
}

@media print {

  @page :first {
  margin: 0;
  }

  @page {
    size: A4;
    margin: 0;
    margin-top: 1.5cm;
    
  }

  .noprint {
    display: none;
  }

  .pagebreak {
    page-break-after: always ;
  }

  /* .no-print {
    visibility: hidden !important;
  }
  .do-print {
    visibility: visible !important;
  } */
}

.alturaelargura {
  max-width: 22.5cm; 
  min-width: 22.5cm;
}

.sialogo {
  font-size: 50px;
  color: cornflowerblue;
  align-content: center;
  text-align: center;
  padding: 2px;
  font-family: 'Times New Roman', Times, serif;
}

.ufv {
  font-size: 25px;
  align-content: center;
  text-align: center;
  vertical-align: baseline;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
}

.apresentacao {
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
}

.conteudo1 {
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  font-size: 16px;
}

.conteudo2 {
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
}

.comentarios {
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  font-size: 16px;
  height: 125px;
  vertical-align: text-top;
}
</style>

