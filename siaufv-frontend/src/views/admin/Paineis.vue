<template>
  <div class="animated fadeIn">
    <div data-app="true">
      <!-- Exibição das sessões -->
      <span v-if="!cadastrarSessaoForm">
        <v-toolbar color="grey lighten-3">
          <i class="icon-people"></i>
          <strong>Sessões</strong>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Procurar"
            single-line
            hide-details
          ></v-text-field>
          <v-btn class="primary" color="green" @click="estadoCadastroDeSessao()">Adicionar Sessão</v-btn>
        </v-toolbar>

        <!-- Data Table de sessões-->
        <v-data-table
          :headers="sessaoHeaders"
          :items="sessoesPaineis"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          :search="search"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <!--<td>{{ props.item.name }}</td>-->
            <!--<td class="text-xs-right">{{ props.item.id }}</td>-->
            <td class="text-xs-left">{{ props.item.nome }}</td>
            <td class="text-xs-left">{{ props.item.data | formatDate }}</td>
            <td class="text-xs-left">{{ props.item.horario | formatHour}} às {{ props.item.horariofim | formatHour }}</td>
            <td class="text-xs-left">{{ props.item.sala_nome }}</td>
            <td class="text-xs-left">{{ props.item.instituto }}</td>
            <td class="text-xs-left">{{ props.item.anos_ano }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="editSessao(props.item)">edit</v-icon>
              <v-icon small @click="deleteSessao(props.item)">delete</v-icon>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            <div style="color: red">
              Sua procura por
              <strong>"{{ search }}"</strong> não achou resultados.
            </div>
          </v-alert>
        </v-data-table>
      </span>
      <!-- Data Table de sessões-->
      <!-- Cadastro de sessão -->
      <!-- Cadastro de sessão -->
      <!-- Cadastro de sessão -->
      <!-- Cadastro de sessão -->
      <!-- Cadastro de sessão -->
      <span v-if="cadastrarSessaoForm">
        <v-layout wrap>
          <v-flex xs12>
            <v-form lazy-validation data-vv-scope="form-sessao">
              <v-card>
                <v-card-title>
                  <v-icon large color="green darken-2">business</v-icon>
                  <span class="headline">
                    <h5>Cadastro de sessão de avaliação painel</h5>
                  </span>
                </v-card-title>

                <v-card-text>
                  <!-- DATA -->
                  <v-container grid-list-md border>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md3>
                        <v-menu
                          v-model="menudata"
                          :close-on-content-click="false"
                          full-width
                          max-width="290"
                        >
                          <v-text-field
                            slot="activator"
                            :value="computedDateFormattedMomentjs"
                            clearable
                            outline
                            prepend-icon="event"
                            label="Data"
                            data-vv-name="data"
                            v-validate="'required'"
                            :class="{ 'is-invalid': errors.has('form-sessao.data')}"
                          ></v-text-field>
                          <v-date-picker
                            color="green lighten-1"
                            locale="pt-br"
                            no-title
                            scrollable
                            v-model="editedSessao.data"
                            @change="menudata = false"
                          ></v-date-picker>
                        </v-menu>
                        <div
                          v-if="errors.has('form-sessao.data')"
                          style="color: red"
                        >{{ errors.first('form-sessao.data') }}</div>
                      </v-flex>
                      <!-- Horario -->
                      <v-flex xs12 sm6 md3>
                        <v-select
                          :items="horarios"
                          item-value="horario"
                          item-text="horario"
                          outline
                          v-model="editedSessao.horario"
                          label="Horário"
                          prepend-icon="access_time"
                          data-vv-name="horario"
                          v-validate="'required'"
                          :class="{ 'is-invalid': errors.has('form-sessao.horario')}"
                        >
                          <template
                            slot="selection"
                            slot-scope="data"
                          >{{ data.item.horario.split(":")[0] }}:{{ data.item.horario.split(":")[1] }}</template>
                          <template
                            slot="item"
                            slot-scope="data"
                          >{{ data.item.horario.split(":")[0] }}:{{ data.item.horario.split(":")[1] }}</template>
                        </v-select>
                        <div
                          v-if="errors.has('form-sessao.horario')"
                          style="color: red"
                        >{{ errors.first('form-sessao.horario') }}</div>
                      </v-flex>
                      <!-- Horario Final -->
                      <v-flex xs12 sm6 md3>
                        <v-select
                          :items="horariosFimDisponiveis"
                          item-value="horario"
                          item-text="horario"
                          outline
                          v-model="editedSessao.horariofim"
                          label="Horário de Término"
                          prepend-icon="access_time"
                          data-vv-name="horariofim"
                          v-validate="'required'"
                          :class="{ 'is-invalid': errors.has('form-sessao.horariofim')}"
                        >
                          <template
                            slot="selection"
                            slot-scope="data"
                          >{{ data.item.horario.split(":")[0] }}:{{ data.item.horario.split(":")[1] }}</template>
                          <template
                            slot="item"
                            slot-scope="data"
                          >{{ data.item.horario.split(":")[0] }}:{{ data.item.horario.split(":")[1] }}</template>
                        </v-select>
                        <div
                          v-if="errors.has('form-sessao.horariofim')"
                          style="color: red"
                        >{{ errors.first('form-sessao.horariofim') }}</div>
                      </v-flex>
                      <!-- Salas -->
                      <v-flex xs12 sm6 md3>
                        <v-select
                          :items="salas"
                          item-value="id"
                          item-text="nome"
                          outline
                          v-model="editedSessao.sala_id"
                          label="Salas Disponíveis"
                          data-vv-name="sala"
                          v-validate="'required'"
                          :class="{ 'is-invalid': errors.has('form-sessao.sala') }"
                        ></v-select>
                        <div
                          v-if="errors.has('form-sessao.sala')"
                          style="color: red"
                        >{{ errors.first('form-sessao.sala') }}</div>
                      </v-flex>
                      <!-- Nome -->
                      <v-flex xs12 sm6 md8>
                        <v-text-field
                          outline
                          v-model="editedSessao.nome"
                          label="Nome da Sessão"
                          data-vv-name="nome"
                          v-validate="'required'"
                          :class="{ 'is-invalid': errors.has('form-sessao.nome') }"
                        ></v-text-field>
                        <div
                          v-if="errors.has('form-sessao.nome')"
                          style="color: red"
                        >{{ errors.first('form-sessao.nome') }}</div>
                      </v-flex>
                      <!-- Instituto -->
                      <v-flex xs12 sm6 md2>
                        <v-select
                          :items="institutos"
                          item-value="instituto"
                          item-text="instituto"
                          outline
                          v-model="editedSessao.instituto"
                          label="Instituto"
                          data-vv-name="instituto"
                          v-validate="'required'"
                          :class="{ 'is-invalid': errors.has('form-sessao.instituto') }"
                        ></v-select>
                        <div
                          v-if="errors.has('form-sessao.instituto')"
                          style="color: red"
                        >{{ errors.first('form-sessao.instituto') }}</div>
                      </v-flex>
                      <v-flex xs12 sm6 md2>
                        <v-select
                          :items="anos"
                          item-value="id"
                          item-text="ano"
                          outline
                          v-model="editedSessao.ano_id"
                          label="Ano"
                          data-vv-name="ano"
                          v-validate="'required'"
                          :class="{ 'is-invalid': errors.has('form-sessao.ano') }"
                        ></v-select>
                        <div
                          v-if="errors.has('form-sessao.ano')"
                          style="color: red"
                        >{{ errors.first('form-sessao.ano') }}</div>
                      </v-flex>
                      <!-- Avaliacoes -->
                      <!-- Avaliacoes -->
                      <!-- Avaliacoes -->
                      <!-- Avaliadores -->
                    </v-layout>
                  </v-container>

                  <!-- Data Table Avaliaçoes da sessão-->
                  <!-- Data Table Avaliaçoes da sessão-->
                </v-card-text>
              </v-card>
            </v-form>

            <!-- Formulario de avaliacoes -->
            <!-- Formulario de avaliacoes -->
            <!-- Formulario de avaliacoes -->
            <v-form lazy-validation data-vv-scope="form-avaliacao" v-if="avaliacaoCadastroForm">
              <v-card>
                <v-card-text>
                  <!-- DATA -->
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <!-- Avaliacoes -->
                      <!-- Avaliacoes -->
                      <!-- Avaliacoes -->
                      <!-- Avaliadores -->
                      <v-flex xs12 sm6 md12>
                        <h5>Avaliação</h5>
                      </v-flex>
                      <v-card>
                        <v-card-text>
                          <v-container grid-list-md border>
                            <v-layout wrap>
                              <!-- Trabalhos -->
                              <v-flex xs12 sm6 md12>
                                <h5>Trabalho</h5>
                              </v-flex>
                              <!-- Filtro Instituto Trabalho -->
                              <v-flex xs12 sm6 md2>
                                <v-select
                                  :items="institutos"
                                  item-value="instituto"
                                  item-text="instituto"
                                  outline
                                  v-model="filtroInstitutoTrabalho"
                                  label="Instituto"
                                ></v-select>
                              </v-flex>
                              <v-flex xs12 sm6 md10>
                                <v-select
                                  :items="trabalhosNaoCadastrados | filterTrabalhos(filtroInstitutoTrabalho)"
                                  v-on:change="changedautor"
                                  item-value="trabalho_id"
                                  item-text="data"
                                  outline
                                  v-model="editedAvaliacao.trabalho_id"
                                  label="Trabalhos"
                                  data-vv-name="trabalho"
                                  v-validate="'required'"
                                  :class="{ 'is-invalid': errors.has('form-avaliacao.trabalho') }"
                                >
                                  <template
                                    slot="selection"
                                    slot-scope="data"
                                  >{{ data.item.trabalho_id }} - {{ data.item.instituto }} - {{ data.item.nome }}</template>
                                  <template
                                    slot="item"
                                    slot-scope="data"
                                  >{{ data.item.trabalho_id }} - {{ data.item.instituto }} - {{ data.item.nome }}</template>
                                </v-select>
                                <div
                                  v-if="errors.has('form-avaliacao.trabalho')"
                                  style="color: red"
                                >{{ errors.first('form-avaliacao.trabalho') }}</div>
                              </v-flex>

                              <!-- Orientadores -->
                              <v-flex xs12 sm6 md5>
                                <v-select
                                  disabled
                                  :items="trabalhos"
                                  item-value="trabalho_id"
                                  item-text="orientador"
                                  outline
                                  v-model="editedAvaliacao.trabalho_id"
                                  label="Orientador"
                                ></v-select>
                              </v-flex>

                              <!-- Autores -->
                              <v-flex
                                xs12
                                sm6
                                md5
                                v-for="(autoress, i) in editedAvaliacao.trabalhos_autores"
                                :key="i + '-first'"
                              >
                                <v-select
                                  disabled
                                  :items="editedAvaliacao.trabalhos_autores"
                                  item-value="id"
                                  item-text="autor"
                                  v-model="editedAvaliacao.trabalhos_autores[i].id"
                                  label="Autor"
                                  outline
                                ></v-select>
                              </v-flex>

                              <!-- Avaliadores -->
                              <v-flex xs12 sm6 md12>
                                <h5>Avaliadores</h5>
                              </v-flex>

                              <!-- Filtro Instituto Avaliador1 -->
                              <v-flex xs12 sm6 md1>
                                <v-select
                                  :items="institutos"
                                  item-value="instituto"
                                  item-text="instituto"
                                  outline
                                  v-model="filtroInstitutoAvaliador1"
                                  label="Instituto"
                                ></v-select>
                              </v-flex>
                              <v-flex xs12 sm6 md5>
                                <v-select
                                  :items="avaliadoresLivresParaAvaliar | filterAvaliadorInstituto1(filtroInstitutoAvaliador1)"
                                  item-value="id"
                                  item-text="data"
                                  outline
                                  v-model="editedAvaliacao.avaliador1"
                                  label="Avaliador 1"
                                  data-vv-name="avaliador1"
                                  v-validate="'required'"
                                  :class="{ 'is-invalid': errors.has('form-avaliacao.avaliador1') }"
                                >
                                  <template
                                    slot="selection"
                                    slot-scope="data"
                                  >{{ data.item.instituto }} - {{ data.item.nome }}</template>
                                  <template
                                    slot="item"
                                    slot-scope="data"
                                  >{{ data.item.instituto }} - {{ data.item.nome }}</template>
                                </v-select>
                                <div
                                  v-if="errors.has('form-avaliacao.avaliador1')"
                                  style="color: red"
                                >{{ errors.first('form-avaliacao.avaliador1') }}</div>
                              </v-flex>

                              <!-- Filtro Instituto Avaliador2 -->
                              <v-flex xs12 sm6 md1>
                                <v-select
                                  :items="institutos"
                                  item-value="instituto"
                                  item-text="instituto"
                                  outline
                                  v-model="filtroInstitutoAvaliador2"
                                  label="Instituto"
                                ></v-select>
                              </v-flex>
                              <v-flex xs12 sm6 md5>
                                <v-select
                                  :items="avaliadoresLivresParaAvaliar | filterAvaliadores(editedAvaliacao.avaliador1)  | filterAvaliadorInstituto1(filtroInstitutoAvaliador2)"
                                  item-value="id"
                                  item-text="data"
                                  outline
                                  :disabled="avaliadorIsDisabled"
                                  v-model="editedAvaliacao.avaliador2"
                                  label="Avaliador 2"
                                  data-vv-name="avaliador2"
                                  v-validate="'required'"
                                  :class="{ 'is-invalid': errors.has('form-avaliacao.avaliador2') }"
                                >
                                  <template
                                    slot="selection"
                                    slot-scope="data"
                                  >{{ data.item.instituto }} - {{ data.item.nome }}</template>
                                  <template
                                    slot="item"
                                    slot-scope="data"
                                  >{{ data.item.instituto }} - {{ data.item.nome }}</template>
                                </v-select>
                                <div
                                  v-if="errors.has('form-avaliacao.avaliador2')"
                                  style="color: red"
                                >{{ errors.first('form-avaliacao.avaliador2') }}</div>
                              </v-flex>

                              <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn
                                  class="primary"
                                  color="green"
                                  @click="validateForm('form-avaliacao')"
                                >Adicionar Avaliação</v-btn>
                              </v-layout>
                            </v-layout>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions></v-card-actions>
              </v-card>
            </v-form>
            <v-card v-if="avaliacaoCadastroForm">
              <v-card-text>
                <!-- Data Table Avaliaçoes da sessão-->
                <!-- Data Table Avaliaçoes da sessão-->
                <v-data-table
                  :headers="avaliacaoHeaders"
                  :items="avaliacoesDaSessao"
                  :rows-per-page-items="rowsPerPageItems"
                  :pagination.sync="pagination"
                  :search="search"
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.trabalho_id }}</td>
                    <td class="text-xs-left">{{ props.item.avaliador1_nome }}</td>
                    <td class="text-xs-left">{{ props.item.avaliador2_nome }}</td>
                    <td class="text-xs-left">{{ props.item.trabalho_nome }}</td>
                    <td class="text-xs-left">{{ props.item.orientador }}</td>
                    <td>
                      <p
                        class="text-xs-left"
                        v-for="(autores, i) in props.item.trabalho_autores"
                        v-bind:key="i"
                      >{{ autores }}</p>
                    </td>
                    <td class="justify-center layout px-0">
                      <v-icon small @click="deleteAvaliacao(props.item)">delete</v-icon>
                    </td>
                  </template>
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    <div style="color: red">
                      Sua procura por
                      <strong>"{{ search }}"</strong> não achou resultados.
                    </div>
                  </v-alert>
                </v-data-table>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>

            <v-layout>
              <v-btn
                class="primary justify-right"
                color="red"
                @click="estadoListagemSessao()"
              >Voltar</v-btn>
              <v-spacer></v-spacer>

              <v-btn class="primary" color="blue" @click="validateForm('form-sessao')">Salvar Sessão</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </span>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
const helpers = require('../../helpers')

export default {
  data: () => ({
    cadastrarSessaoForm: false,
    avaliacaoCadastroForm: false,
    filtroInstitutoTrabalho: '',
    filtroInstitutoAvaliador1: '',
    filtroInstitutoAvaliador2: '',
    menudata: false,
    menuhorarioinicio: false,
    menuhorariofim: false,
    search: '',
    trabalhos: [],
    trabalhos_nao_cadastrados: [],
    sessoes: [],
    avaliacoes: [],
    avaliadores: [],
    salas: [],
    horarios: [],
    institutos: [],
    anos: [],
    editedSessaoIndex: -1,
    sessaoHeaders: [
      { text: 'Nome', value: 'nome' },
      { text: 'Data', value: 'data' },
      { text: 'Horário', value: 'horario' },
      //{ text: 'Término', value: 'horariofim' },
      { text: 'Sala', value: 'sala_id' },
      { text: 'Instituto', value: 'instituto' },
      { text: 'Ano', value: 'anos_ano' },
      { text: 'Ações', value: 'name', sortable: false }
    ],
    avaliacaoHeaders: [
      { text: 'Trabalho ID', value: 'trabalho_id' },
      { text: 'Avaliador 1', value: 'avaliadores' },
      { text: 'Avaliador 2', value: 'avaliadores' },
      { text: 'Trabalho', value: 'trabalho_nome' },
      { text: 'Orientador', value: 'trabalho_orientador' },
      { text: 'Autores', value: 'trabalho_autores' },
      { text: 'Ações', value: 'name', sortable: false }
    ],
    editedAvaliacao: {
      id: '',
      trabalhos_orientador: '',
      avaliador1: [],
      avaliador2: [],
      trabalhos_autores: [''],
      trabalho_id: ''
    },
    defaultAvaliacao: {
      id: '',
      trabalhos_orientador: '',
      avaliador1: [],
      avaliador2: [],
      trabalhos_autores: [''],
      trabalho_id: ''
    },
    editedSessao: {
      id: '',
      nome: '',
      data: '',
      horario: '',
      horariofim: '',
      tipo: '',
      instituto: '',
      ano_id: '',
      sala_id: ''
    },
    defaultSessao: {
      id: '',
      nome: '',
      data: '',
      horario: '',
      horariofim: '',
      tipo: '',
      instituto: '',
      ano_id: '',
      sala_id: ''
    },
    rowsPerPageItems: [10, 20, 50, 100],
    pagination: {
      rowsPerPage: 10
    }
  }),

  created() {
    document.title = "SIA - Painéis";
    //Mudando o locale do Vuetify
    this.changeLocale()
    //Pegando todos sessoes
    this.getArrayAxiosSessoes()
    //Pegando todos avaliacoes
    this.getArrayAxiosAvaliacoes()
    //Pegando todos os Trabalhos
    this.getArrayAxiosTrabalhos()
    //Pegando todas sa salas
    this.getArrayAxiosSalas()
    //Pegando todos os avaliadores
    this.getArrayAxiosAvaliadoresAtivos()
    //Setando Horarios
    this.setArrayHorarios()
    //Setando Institutos
    this.setArrayInstitutos()
    //Pegando todos os anos
    this.getArrayAxiosAnos()
  },

  computed: {
    salasPorDataHorario() {
      //Se nao existe sessao entao retornar todas as salas
      if (this.sessoes.length === 0) return this.salas

      var filtrarEstaSala = false

      var salasVazias = this.salas.filter(sala => {
        filtrarEstaSala = false
        this.sessoes.map(sessao => {
          //Filtro das salas que já estao cadastrados na mesma data e mesmo horário
          if (moment.utc(sessao.data).format('DD/MM/YYYY') === moment.utc(this.editedSessao.data).format('DD/MM/YYYY') &&
              helpers.checkRangeIntervalHorario(sessao.horario, sessao.horariofim, this.editedSessao.horario, this.editedSessao.horariofim) && 
                sessao.sala_nome === sala.nome)
            filtrarEstaSala = true
          //Se a sala já pertece a sessao editada entao inclui-se ela também
          if (this.editedSessaoIndex > -1 && sala.id === this.editedSessao.sala_id)
            filtrarEstaSala = false
        })
        if (filtrarEstaSala === false) return sala
      })

      // console.log('salas:', this.salas)
      // console.log('salasVazias:', salasVazias)
      return salasVazias
    },
    computedDateFormattedMomentjs() {
      return this.editedSessao.data
        ? moment.utc(this.editedSessao.data).format('DD/MM/YYYY')
        : ''
    },
    horarioIsDisabled() {
      if (this.editedSessao.data === '') return true
      return false
    },
    salaIsDisabled() {
      if (this.editedSessao.data === '') return true
      if (this.editedSessao.horario === '') return true
      return false
    },
    avaliadorIsDisabled() {
      if (typeof this.editedAvaliacao.avaliador1 !== 'number') return true
      return false
    },
    trabalhosNaoCadastrados() {
      return this.trabalhos.filter(trabalho => {
        //Filtro
        var filterTrabalho = false

        this.avaliacoes.map(avaliacao => {
          if (trabalho.trabalho_id === avaliacao.trabalho_id)
            filterTrabalho = true
        })

        if (filterTrabalho === false) return trabalho
      })
    },
    avaliacoesDaSessao() {
      var avaliacoesDaSessaoAtual = []
      //Populando avaliacoes datatable com seus respectivos atributos
      this.avaliacoes.map(avaliacao => {
        if (avaliacao.sessao_id === this.editedSessao.id) {
          //console.log('avaliacao_id:', avaliacao.id, 'this.editedSessao.id: ', this.editedSessao.id )
          var autores = avaliacao.trabalho[0].autores.map(item => {
            return item.autor
          })
          avaliacoesDaSessaoAtual.push({
            id: avaliacao.id,
            trabalho_id: avaliacao.trabalho_id,
            avaliador1_id: avaliacao.avaliador1,
            avaliador2_id: avaliacao.avaliador2,
            trabalho_nome: avaliacao.trabalho[0].nome,
            orientador: avaliacao.trabalho[0].orientador,
            avaliador1_nome: avaliacao.avaliadores[0].nome,
            avaliador2_nome: avaliacao.avaliadores[1].nome,
            trabalho_autores: autores
          })
        }
      })
      //Retornando as avaliacoes da sessão a ser editada
      return avaliacoesDaSessaoAtual
    },
    horariosFimDisponiveis() {
      var horariosFim = this.horarios.filter(item => {
        if (item.horario > this.editedSessao.horario) return item.horario
      })
      return horariosFim
    },
    //avaliadoresLivresParaAvaliar com mesma data/horario 
    avaliadoresLivresParaAvaliar() {
      //Filtrador de avaliador inicializado como false
      var filtrarEsteAvaliador = false

      var avaliadoresLivres = this.avaliadores.filter(avaliadorlivre => {
        //Iniciando a variavel filtrarEsteAvaliador como false
        filtrarEsteAvaliador = false
        //avaliador está em outra sessão com o mesmo horario que esta?
        //Verificar se existe sessões
        this.sessoes.map( sessao => {
          //Verificar quais sessões tem mesma data e horario que a atual (EDITADA)
          if (moment.utc(sessao.data).format('DD/MM/YYYY') === moment.utc(this.editedSessao.data).format('DD/MM/YYYY') &&
              sessao.id !== this.editedSessao.id && 
              //sessao.tipo === 1 && // Fazer o filtro sem levar em conta as sessoes de orais
              helpers.checkRangeIntervalHorario(sessao.horario, sessao.horariofim, this.editedSessao.horario, this.editedSessao.horariofim)){
            
            sessao.avaliacoes.map( avaliacao => {
              avaliacao.avaliadores.map( avaliador => {
                if(avaliador.id === avaliadorlivre.id)
                  filtrarEsteAvaliador = true
              })
            })            
          }
        })

        if (filtrarEsteAvaliador === false) return avaliadorlivre
      })
      
      return avaliadoresLivres
    },    
    sessoesPaineis(){
      return this.sessoes.filter(sessao => {
        if(sessao.tipo === 1)
          return sessao
      })      
    }
  },

  watch: {
    cadastrarSessaoForm(val) {
      //this.editedAvaliacao = Object.assign({}, this.defaultAvaliacao)
      if (val === false) {
        this.getArrayAxiosSessoes()
        this.editedSessao = Object.assign({}, this.defaultSessao)
        this.editedAvaliacao = Object.assign({}, this.defaultSessao)
      }
    },
    avaliacaoCadastroForm(val) {
      if (val === true) {
        this.getArrayAxiosAvaliacoes()
      }
    }
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
    },     
    filterTrabalhos(trabalhos, filtroInstitutoTrabalho) {
      if (filtroInstitutoTrabalho === '') return trabalhos
      else
        return trabalhos.filter(trabalho => {
          if (filtroInstitutoTrabalho === trabalho.instituto) return trabalho
        })
    },
    filterAvaliadores(avaliadores, id_avaliador1) {
      return avaliadores.filter(avaliador => {
        if (avaliador.id !== id_avaliador1) return avaliador
      })
    },
    filterAvaliadorInstituto1(avaliadores1, instituto) {
      if (instituto === '') return avaliadores1
      else
        return avaliadores1.filter(avaliador1 => {
          if (instituto === avaliador1.instituto) return avaliador1
        })
    },
    filterAvaliadorInstituto2(avaliadores2, instituto) {
      if (instituto === '') return avaliadores2
      else
        return avaliadores2.filter(avaliador2 => {
          if (instituto === avaliador2.instituto) return avaliador2
        })
    }
  },

  methods: {
    updateComponentData() {
      this.getArrayAxiosSessoes()
      this.getArrayAxiosAvaliacoes()
    },
    estadoListagemSessao() {
      this.cadastrarSessaoForm = false
      this.editedSessaoIndex = -1
      this.avaliacaoCadastroForm = false
    },
    estadoCadastroDeSessao() {
      this.cadastrarSessaoForm = true
      this.editedSessaoIndex = -1
      this.avaliacaoCadastroForm = false
    },
    estadoEditSessao() {
      this.cadastrarSessaoForm = true
      this.avaliacaoCadastroForm = true
    },
    changedautor(event) {
      this.trabalhos.map(item => {
        if (item.trabalho_id === event)
          this.editedAvaliacao.trabalhos_autores = item.autores
      })
    },
    getArrayAxiosAvaliacoes() {
      //Pegando todos Avaliacoes
      this.$axios({
        method: 'get',
        url: '/avaliacao'
      })
        .then(response => {
          this.avaliacoes = response.data
          //console.log('AVALIACOES: ', this.avaliacoes)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getArrayAxiosSessoes() {
      //Pegando todos Avaliacoes
      this.$axios({
        method: 'get',
        url: '/sessao'
      })
        .then(response => {
          this.sessoes = response.data
          // this.sessoes = response.data.filter(sessao => {
          //   if(sessao.tipo === 1)
          //     return sessao
          // })
          //console.log('SESSOES: ', this.sessoes)

        })
        .catch(error => {
          console.log(error)
        })
    },
    getArrayAxiosTrabalhos() {
      //Pegando todos os anos
      this.$axios({
        method: 'get',
        url: '/trabalho'
      })
        .then(response => {
          this.trabalhos = response.data.filter( trabalho => {
            if(trabalho.tipo === 1)
              return trabalho
          })
          //console.log('TRABALHOS: ', this.trabalhos)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getArrayAxiosSalas() {
      this.$axios({
        method: 'get',
        url: '/sala'
      })
        .then(response => {
          this.salas = response.data.filter( sala => {
            if(sala.tipo === 1)
              return sala
          })
          //console.log('Salas', this.salas)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getArrayAxiosAvaliadoresAtivos() {
      this.$axios({
        method: 'get',
        url: '/avaliador_ativo'
      })
        .then(response => {
          this.avaliadores = response.data
          //console.log('AVALIADORES', this.avaliadores)
        })
        .catch(error => {
          console.log(error)
        })
    },
    setArrayHorarios() {
      this.horarios = [
        { horario: '06:00:00' },
        { horario: '07:00:00' },
        { horario: '08:00:00' },
        { horario: '09:00:00' },
        { horario: '10:00:00' },
        { horario: '11:00:00' },
        { horario: '12:00:00' },
        { horario: '13:00:00' },
        { horario: '14:00:00' },
        { horario: '15:00:00' },
        { horario: '16:00:00' },
        { horario: '17:00:00' },
        { horario: '18:00:00' },
        { horario: '19:00:00' },
        { horario: '20:00:00' },
        { horario: '21:00:00' },
        { horario: '22:00:00' },
        { horario: '23:00:00' },
        { horario: '23:59:00' }
      ]
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
    getArrayAxiosAnos() {
      //Pegando todos os anos
      this.$axios({
        method: 'get',
        url: '/ano'
      })
        .then(response => {
          for (let i in response.data)
            this.anos.push({
              id: response.data[i].id,
              ano: response.data[i].ano
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

    //Checar o formulário em busca de erros
    validateForm(scope) {
      if (scope === 'form-sessao') {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.saveSessao()
            this.editedSessao = Object.assign({}, this.editedSessao)
            this.$validator.reset()
          }
        })
      } else if (scope === 'form-avaliacao') {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.saveAvaliacao()
            this.editedAvaliacao = Object.assign({}, this.defaultSessao)
            this.$validator.reset()
          }
        })
      }
    },

    changeLocale() {
      this.$vuetify.lang.current = 'pt'
    },

    editSessao(item) {
      this.editedSessaoIndex = this.sessoes.indexOf(item)
      this.editedSessao = Object.assign({}, item)
      this.estadoEditSessao()
      this.updateComponentData()
    },

    deleteSessao(item) {
      //Setando algumas variaveis para uso do delete
      const index = this.sessoes.indexOf(item)

      // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
      confirm('Está certo que deseja deletar este item?') &&
        this.$axios({
          method: 'delete',
          url: '/sessao/' + item.id + ''
        })
          .then(response => {
            //alert('Sessão deletada.')
            this.updateComponentData()
            this.estadoListagemSessao()
          })
          .catch(error => {
            alert('Algum erro aconteceu! \n' + error)
            this.updateComponentData()
            this.estadoListagemSessao()
          })
    },

    saveSessao() {
      if (this.editedSessaoIndex > -1 && this.cadastrarSessaoForm == true) {
        // Se this.editedSessaoIndex  > -1 entao estamos na edição
        //Editando item chama-se o metodo put na rota avaliacoes e irá para update
        this.$axios({
          method: 'put',
          url: '/sessao/' + this.editedSessao.id + '',
          data: {
            id: this.editedSessao.id,
            nome: this.editedSessao.nome,
            data: moment.utc(String(this.editedSessao.data)).format('YYYY-MM-DD'),
            horario: this.editedSessao.horario,
            horariofim: this.editedSessao.horariofim,
            sala_id: this.editedSessao.sala_id,
            instituto: this.editedSessao.instituto,
            ano_id: this.editedSessao.ano_id,
            tipo: 1
          }
        })
          .then(response => {
            alert('Sessão editada.')
            this.updateComponentData()
            this.estadoEditSessao()
          })
          .catch(error => {
            console.log(error)
            this.updateComponentData()
            this.estadoListagemSessao()
            alert('Algum erro aconteceu! \n' + error)
          })
      } else {
        // Se this.editedSessaoIndex  == -1 entao estamos na inserção
        this.$axios({
          method: 'post',
          url: '/sessao',
          data: {
            id: this.editedSessao.id,
            nome: this.editedSessao.nome,
            data: moment.utc(String(this.editedSessao.data)).format('YYYY-MM-DD'),
            horario: this.editedSessao.horario,
            horariofim: this.editedSessao.horariofim,
            sala_id: this.editedSessao.sala_id,
            instituto: this.editedSessao.instituto,
            ano_id: this.editedSessao.ano_id,
            tipo: 1
          }
        })
          .then(response => {
            this.editedSessaoIndex = this.sessoes.length

            this.editedSessao.id = response.data.sessao_id
            alert('Sessão criada.')
            this.updateComponentData()
            this.estadoEditSessao()
          })
          .catch(error => {
            console.log(error)
            this.updateComponentData()
            this.estadoListagemSessao()
            alert('Algum erro aconteceu! \n' + error)
          })
      }
    },

    saveAvaliacao() {
      this.$axios({
        method: 'post',
        url: '/avaliacao',
        data: {
          //id: this.editedAvaliacao.id,
          trabalho_id: this.editedAvaliacao.trabalho_id,
          sessao_id: this.editedSessao.id,
          avaliador1_id: this.editedAvaliacao.avaliador1,
          avaliador2_id: this.editedAvaliacao.avaliador2
        }
      })
        .then(response => {
          this.updateComponentData()
          this.estadoEditSessao()
          alert('Avaliação adicionada.')
        })
        .catch(error => {
          console.log(error)
          alert('Algum erro aconteceu! \n' + error)
          this.updateComponentData()
          this.estadoListagemSessao()
        })
    },

    deleteAvaliacao(item) {
      //Setando algumas variaveis para uso do delete
      // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
      confirm('Está certo que deseja deletar este item?') &&
        this.$axios({
          method: 'delete',
          url: '/avaliacao/' + item.id + ''
        })
          .then(response => {
            this.updateComponentData()
            this.estadoEditSessao()
            alert('Avaliação deletada.')
          })
          .catch(error => {
            this.updateComponentData()
            this.estadoListagemSessao()
            alert('Algum erro aconteceu! \n' + error)
          })
    }
  }
}
</script>
