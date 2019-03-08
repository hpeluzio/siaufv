<template>
  <div class="animated fadeIn">
    <!-- Data Table -->
    <div data-app="true">
      <v-container grid-list-md fluid>
        <v-layout wrap>
          
          <v-flex d-flex xs12 sm6 md6>
            <v-card flat>
              <v-card-title>
                <v-flex d-flex xs12 sm6 md9>
                <h4>Relatório de Salas</h4></v-flex>
                <v-flex d-flex xs12 sm6 md3>
                <v-btn
                  class="primary"
                  color="green"
                  @click="gerarRelatorioSalasPDF()"
                >Download PDF</v-btn>
                </v-flex>
              </v-card-title>
              <v-card-text>
                <b>Este relatório contém as seguintes informações das salas:</b>
                <ul>
                  <li>
                    <h5>Nome</h5>
                  </li>
                  <li>
                    <h5>Descrição</h5>
                  </li>
                  <li>
                    <h5>Capacidade</h5>
                  </li>
                  <li>
                    <h5>Tipo</h5>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12 sm6 md6>
            <v-card flat>
              <v-card-title>
                <v-flex d-flex xs12 sm6 md9>
                <h4>Relatório de Sessões</h4></v-flex>
                <v-flex d-flex xs12 sm6 md3>
                <v-btn
                  class="primary"
                  color="green"
                  @click="gerarRelatorioSessoesOraisPDF()"
                >Download PDF</v-btn>
                </v-flex>                

              </v-card-title>
              <v-card-text >
                <b>Este relatório contém as seguintes informações das salas:</b>
                <ul>
                  <li><h5>Nome</h5></li>
                  <li><h5>Data</h5></li>
                  <li><h5>Horário</h5></li>
                  <li><h5>Instituto</h5></li>
                  <li><h5>Sala</h5></li>
                  <li><h5>Trabalhos</h5></li>
                  <li><h5>Avaliadores</h5></li>
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
import axios_instance from '../../axios'
import moment from 'moment'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const helpers = require('../../helpers')

export default {
  data: () => ({
    todos: [
      {
        title: 'title1',
        description: 'Ola mundo'
      },
      {
        title: 'title2',
        description: 'Ola mundo2'
      },
      {
        title: 'title3',
        description: 'Ola mundo3'
      },
      {
        title: 'title4',
        description: 'Ola mundo4'
      }
    ],
    headersSala: [
      { header: 'Nome', dataKey: 'nome' },
      { header: 'Descrição', dataKey: 'descricao' },
      { header: 'Capacidade', dataKey: 'capacidade' },
      { header: 'Tipo', dataKey: 'tipo' }
    ],
    headersSessoesOrais: [
      { header: 'Nome', dataKey: 'nome' },
      { header: 'Data', dataKey: 'data' },
      { header: 'Horário', dataKey: 'horario' },
      { header: 'Instituto', dataKey: 'instituto' },
      { header: 'Sala', dataKey: 'salas_nome' },
      { header: 'Trabalhos', dataKey: 'avaliacoes_trabalho_id' },
      { header: 'Avaliadores', dataKey: 'avaliadores_nome' },
    ],    
    salas: [],
    sessoes_orais: []
  }),

  created() {
    //Pegando todos salas
    this.getAxiosArraySalas()
    //Pegando todos Sessoes Orais
    this.getArrayAxiosSessoesOrais()
  },

  //methods
  methods: {
    gerarRelatorioSalasPDF() {

    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFontStyle('bold');
    doc.text('APRENDENDO Rowspan and colspan', 40, 50);

    doc.autoTable({
        startY: 60,
        head: this.headersSala,
        body: this.salas,
        theme: 'grid' //grid
    });
    doc.save('salas.pdf');

    },

    gerarRelatorioSessoesOraisPDF() {
      var doc = new jsPDF('p', 'pt');
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFontStyle('bold');
      doc.text('Relatório de Sessões Orais', 40, 50);

      //setando a matriz com os objetos rowSpans corretos
      this.sessoes_orais = helpers.jsPDFautoTable_rowSpan(this.sessoes_orais, 'nome')
      this.sessoes_orais = helpers.jsPDFautoTable_rowSpan(this.sessoes_orais, 'data')
      this.sessoes_orais = helpers.jsPDFautoTable_rowSpan(this.sessoes_orais, 'horario')
      this.sessoes_orais = helpers.jsPDFautoTable_rowSpan(this.sessoes_orais, 'instituto')
      this.sessoes_orais = helpers.jsPDFautoTable_rowSpan(this.sessoes_orais, 'salas_nome')
      this.sessoes_orais = helpers.jsPDFautoTable_rowSpan(this.sessoes_orais, 'avaliacoes_trabalho_id')
      //this.sessoes_orais = helpers.jsPDFautoTable_rowSpan(this.sessoes_orais, 'avaliadores_nome')

      doc.autoTable({
          startY: 100,
          columns: this.headersSessoesOrais,
          body: this.sessoes_orais,
          theme: 'grid' //grid
      });
      doc.save('sessoes_orais.pdf')
    },


    /**
     * Gets do componente
     */
    getAxiosArraySalas() {
      axios_instance({
        method: 'get',
        url: '/sala'
      })
        .then(response => {
          this.salas = response.data.map(sala => {
            if (sala.tipo === 0) sala.tipo = 'Oral'
            if (sala.tipo === 1) sala.tipo = 'Painel'
            return sala
          })
          //console.log('SALAS: ', this.salas)
        })
        .catch(error => {
          console.log(error)
        })
    },

    getArrayAxiosSessoesOrais() {
      //Pegando todos Avaliacoes
      axios_instance({
        method: 'get',
        url: '/sessao_report'
      })
        .then(response => {
          this.sessoes_orais = response.data.filter(sessao => {
            if(sessao.tipo === 0){
              sessao.data = moment(sessao.data).format('DD/MM/YYYY')
              sessao.horario = sessao.horario.split(":")[0] + ':' + sessao.horario.split(":")[1] + 
                ' às ' + sessao.horariofim.split(":")[0] + ':' + sessao.horariofim.split(":")[1]  
              //sessao.horariofim = sessao.horariofim.split(":")[0] + ':' + sessao.horariofim.split(":")[1]  
              return sessao
            }  
          })


          console.log('SESSOES: ', this.sessoes_orais)
        })
        .catch(error => {
          console.log(error)
        })
    },    
  }
}
</script>
