<template>
  <div class="animated fadeIn">
    <div data-app="true">
      <!-- Exibição das seções -->
      <span v-if="!cadastrarSessao">
        <v-toolbar color="grey lighten-3">
          <i class="icon-people"></i>
          <strong>Seções</strong>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Procurar"
            single-line
            hide-details
          ></v-text-field>
          <v-btn class="primary" color="green" @click="cadastrarSessaoOnOf(true)">Adicionar Seção</v-btn>
        </v-toolbar>

        <!-- Data Table de seções-->
        <v-data-table
          :headers="sessaoHeaders"
          :items="sessoes"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          :search="search"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <!--<td>{{ props.item.name }}</td>-->
            <!--<td class="text-xs-right">{{ props.item.id }}</td>-->
            <td class="text-xs-left">{{ props.item.data | formatDate }}</td>
            <td class="text-xs-left">{{ props.item.horario }}</td>
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
      <!-- Data Table de seções-->
      <!-- Cadastro de seção -->
      <!-- Cadastro de seção -->
      <!-- Cadastro de seção -->
      <!-- Cadastro de seção -->
      <!-- Cadastro de seção -->
      <!-- Cadastro de seção -->
      <!-- Cadastro de seção -->
      <!-- Cadastro de seção -->
      <!-- Cadastro de seção -->
      <!-- Cadastro de seção -->
      <span v-if="cadastrarSessao">
        <v-layout wrap>
          <v-flex xs12>
            <v-form lazy-validation data-vv-scope="form-sessao">
              <v-card>
                <v-card-title>
                  <v-icon large color="green darken-2">business</v-icon>
                  <span class="headline">
                    <h5>- SESSÃO DE AVALIAÇÃO ORAL</h5>
                  </span>
                </v-card-title>

                <v-card-text>
                  <!-- DATA -->
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md3>
                        <v-menu
                          v-model="menu"
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
                            @change="menu = false"
                          ></v-date-picker>
                        </v-menu>
                        <div
                          v-if="errors.has('form-sessao.data')"
                          style="color: red"
                        >{{ errors.first('form-sessao.data') }}</div>
                      </v-flex>
                      <!-- Horario -->
                      <v-flex xs12 sm6 md2>
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
                        ></v-select>
                        <div
                          v-if="errors.has('form-sessao.sala')"
                          style="color: red"
                        >{{ errors.first('form-sessao.sala') }}</div>
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
                  <!-- Data Table Avaliaçoes da sessão-->
                  <!-- Data Table Avaliaçoes da sessão-->
                  <!-- Data Table Avaliaçoes da sessão-->
                  <!-- Data Table Avaliaçoes da sessão-->
                </v-card-text>
              </v-card>
            </v-form>
            <!-- Formulario de avaliacoes -->
            <!-- Formulario de avaliacoes -->
            <!-- Formulario de avaliacoes -->
            <v-form lazy-validation data-vv-scope="form-avaliacao" v-if="avaliacaoFormEnable">
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
                              <v-flex xs12 sm6 md7>
                                <v-select
                                  :items="trabalhos | filterTrabalhos(filtroInstitutoTrabalho)"
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
                                  :items="avaliadores | filterAvaliadorInstituto1(filtroInstitutoAvaliador1)"
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
                                  :items="avaliadores | filterAvaliadores(editedAvaliacao.avaliador1)  | filterAvaliadorInstituto1(filtroInstitutoAvaliador2)"
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

                  <!-- Data Table Avaliaçoes da sessão-->
                  <!-- Data Table Avaliaçoes da sessão-->
                  <!-- Data Table Avaliaçoes da sessão-->
                  <!-- Data Table Avaliaçoes da sessão-->
                  <!-- Data Table Avaliaçoes da sessão-->
                  <!-- Data Table Avaliaçoes da sessão-->
                  <v-data-table
                    :headers="avaliacaoHeaders"
                    :items="avaliacoesDatatable"
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
                      <td class="text-xs-left">{{ props.item.trabalho_autores }}</td>

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
                <v-card-actions>
                  

                </v-card-actions>
              </v-card>
            </v-form>
            <v-layout>
            <v-spacer></v-spacer>
                  <v-btn class="primary justify-right" color="red" @click="cadastrarSessaoOnOf(false)">Cancelar</v-btn>
                  <v-btn
                    class="primary"
                    color="blue"
                    @click="validateForm('form-sessao')"
                  >Salvar Sessão</v-btn>
                  </v-layout>     
          </v-flex>
        </v-layout>
      </span>
    </div>
  </div>
</template>

<script>
import axios_instance from '../../axios'
import moment from 'moment'

export default {
    data: () => ({
        cadastrarSessao: false,
        filtroInstitutoTrabalho: '',
        filtroInstitutoAvaliador1: '',
        filtroInstitutoAvaliador2: '',
        menu: false,
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
        avaliacoesDatatable: [],
        editedSessaoIndex: -1,
        //avaliacaoFormEnable: false,
        sessaoHeaders: [
            { text: 'Data', value: 'data' },
            { text: 'Horário', value: 'horario' },
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
            data: '',
            horario: '',
            tipo: '',
            instituto: '',
            ano_id: '',
            sala_id: ''
        },
        defaultSessao: {
            id: '',
            data: '',
            horario: '',
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
        computedDateFormattedMomentjs() {
            return this.editedSessao.data
                ? moment(this.editedSessao.data).format('DD/MM/YYYY')
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
        avaliacaoFormEnable() {
            //console.log('avaliacaoFormEnable ', avaliacaoFormEnable)
            console.log('this.editedSessaoIndex', this.editedSessaoIndex)
            if (this.editedSessaoIndex > -1 ) return true
            return false
        },             
    },

    watch: {
        cadastrarSessao(val) {
            this.editedAvaliacao = Object.assign({}, this.defaultAvaliacao)
            if (val === false) {
                this.getArrayAxiosAvaliacoes()
                this.getArrayAxiosSessoes()
                this.getArrayAxiosTrabalhos()

                this.editedSessao = Object.assign({}, this.defaultSessao)
                this.avaliacoesDatatable = []
            }
        },
        // editedSessaoIndex(val){
        //   if(val > -1)
        //     this.avaliacaoFormEnable = true
        //   if (val = -1)
        //     this.avaliacaoFormEnable = false
        // }
    },

    filters: {
        formatDate(date) {
            if (date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },
        filterTrabalhos(trabalhos, filtroInstitutoTrabalho) {
          if (filtroInstitutoTrabalho === '')
            return trabalhos
          else
            return trabalhos.filter((trabalho) => {
              if(filtroInstitutoTrabalho === trabalho.instituto)
                return trabalho
            })
        },
        filterAvaliadores(avaliadores, id_avaliador1) {
          return avaliadores.filter((avaliador) => {
            if(avaliador.id !== id_avaliador1)
              return avaliador
          })          
        },
        filterAvaliadorInstituto1(avaliadores1, instituto) {
          if (instituto === '')
            return avaliadores1
          else
            return avaliadores1.filter((avaliador1) => {
              if(instituto === avaliador1.instituto)
                return avaliador1
            })
        },
        filterAvaliadorInstituto1(avaliadores2, instituto) {
          if (instituto === '')
            return avaliadores2
          else
            return avaliadores2.filter((avaliador2) => {
              if(instituto === avaliador2.instituto)
                return avaliador2
            })
        },                 
    },

    methods: {
        updateComponent() {
          this.getArrayAxiosSessoes()
          this.getArrayAxiosAvaliacoes()
          cadastrarSessaoOnOf(false)
        },
        cadastrarSessaoOnOf(value) {
            this.cadastrarSessao = value
            this.editedSessaoIndex = -1
        },
        adicionarAvaliacao() {
          let id = this.avaliacoesDatatable.length
          let avaliador1_nome, avaliador2_nome, trabalho_nome, orientador, autores = ''

            this.avaliadores.map( item => {              
              if(item.id === this.editedAvaliacao.avaliador1)
                avaliador1_nome = item.nome
              if(item.id === this.editedAvaliacao.avaliador2)
                avaliador2_nome = item.nome
            })

            this.trabalhos.map( item => {              
              if(item.trabalho_id === this.editedAvaliacao.trabalho_id){
                trabalho_nome = item.nome
                orientador = item.orientador
                for(let trab_autores of item.autores) {
                  autores = autores + ' ' + trab_autores.autor
                }   
              }
            })
            
            this.avaliacoesDatatable.push({
              id: id,
              trabalho_id: this.editedAvaliacao.trabalho_id,              
              avaliador1_id: this.editedAvaliacao.avaliador1,
              avaliador2_id: this.editedAvaliacao.avaliador2,
              trabalho_nome: trabalho_nome,
              orientador: orientador,
              avaliador1_nome: avaliador1_nome,
              avaliador2_nome: avaliador2_nome,
              trabalho_autores: autores
            })

            //console.log(this.avaliacoesDatatable)
        },
        changedautor(event) {
            this.trabalhos.map(item => {
                if (item.trabalho_id === event)
                    this.editedAvaliacao.trabalhos_autores = item.autores
            })
        },
        getArrayAxiosAvaliacoes() {
            //Pegando todos Avaliacoes
            axios_instance({
                method: 'get',
                url: '/avaliacao'
            })
                .then(response => {
                    this.avaliacoes = response.data
                    //console.log('AVALIACOES: ', this.avaliacoes)
                    // this.avaliacoes.map(item => {
                    //     item.horario =
                    //         item.horario.split(':')[0] +
                    //         ':' +
                    //         item.horario.split(':')[1]
                    //     item.data = moment(String(item.data)).format(
                    //         'YYYY-MM-DD'
                    //     )
                    // })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getArrayAxiosSessoes() {
            //Pegando todos Avaliacoes
            axios_instance({
                method: 'get',
                url: '/sessao'
            })
                .then(response => {
                    this.sessoes = response.data
                    //console.log('SESSOES: ', this.sessoes)
                    this.sessoes.map(item => {
                        item.horario =
                            item.horario.split(':')[0] +
                            ':' +
                            item.horario.split(':')[1]
                        item.data = moment(String(item.data)).format(
                            'YYYY-MM-DD'
                        )
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getArrayAxiosTrabalhos() {
            //Pegando todos os anos
            axios_instance({
                method: 'get',
                url: '/trabalho'
            })
                .then(response => {
                    this.trabalhos = response.data
                    //console.log('TRABALHOS: ', this.trabalhos)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getArrayAxiosSalas() {
            axios_instance({
                method: 'get',
                url: '/sala'
            })
                .then(response => {
                    this.salas = response.data
                    // for (let i in response.data)
                    //     this.salas.push({
                    //         id: response.data[i].id,
                    //         nome: response.data[i].nome
                    //     })
                    // //console.log('Salas', this.salas)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getArrayAxiosAvaliadoresAtivos() {
            axios_instance({
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
                { horario: '08:00' },
                { horario: '10:00' },
                { horario: '12:00' },
                { horario: '14:00' },
                { horario: '16:00' },
                { horario: '18:00' },
                { horario: '19:00' },
                { horario: '20:00' },
                { horario: '21:00' }
            ]
        },
        setArrayInstitutos() {
            this.institutos = [
                { instituto: '' },
                { instituto: 'IAP' },
                { instituto: 'IBP' },
                { instituto: 'IEP' },
                { instituto: 'IHP' }
            ]
        },
        getArrayAxiosAnos() {
            //Pegando todos os anos
            axios_instance({
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
            // console.log('SCOPE: ', scope)
            // console.log('errors: ', this.errors)
            if( scope === 'form-sessao' ){
              this.$validator.validateAll(scope).then(result => {
                  if (result) {
                      this.save()
                      this.$validator.reset()
                      this.cadastrarSessao = false                 
                  }
              })
            }
            else if ( scope === 'form-avaliacao' ){
              this.$validator.validateAll(scope).then(result => {
                if (result) {
                    this.adicionarAvaliacao()
                    this.editedAvaliacao = this.defaultAvaliacao
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
            this.avaliacoes.filter(avaliacao => {
              //console.log('AVALIACAO:', avaliacao)
              if(avaliacao.id){
                if(this.editedSessao.id === avaliacao.sessao_id){
                  this.avaliacoesDatatable.push({
                    id: avaliacao.id,
                    trabalho_id: avaliacao.trabalho_id,              
                    avaliador1_id: avaliacao.avaliadores[0].id,
                    avaliador2_id: avaliacao.avaliadores[1].id,
                    trabalho_nome: avaliacao.trabalho[0].nome,
                    orientador: avaliacao.trabalho[0].orientador,
                    avaliador1_nome: avaliacao.avaliadores[0].nome,
                    avaliador2_nome: avaliacao.avaliadores[1].nome,
                    trabalho_autores: avaliacao.avaliadores[1].autores,
                  })
                }
              }

            })
            //console.log('avaliacoesDatatable: ', this.avaliacoesDatatable)
            // console.log('item: ', item)
            // console.log('editedSessao: ', this.editedSessao)
            this.cadastrarSessao = true
        },

        deleteAvaliacao(item) {
            this.avaliacoesDatatable.map((avaliacao, index) => {
              if(avaliacao.id === item.id)
                this.avaliacoesDatatable.splice(index, index+1)
            })
            //console.log('avaliacoesDatatable: ', this.avaliacoesDatatable)
        },

        deleteSessao(item) {
            //Setando algumas variaveis para uso do delete
            const index = this.sessoes.indexOf(item)

            // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
            confirm('Está certo que deseja deletar este item?') &&
                axios_instance({
                    method: 'delete',
                    url: '/sessao/' + item.id + ''
                })
                .then(response => {
                    this.updateComponent()
                })
                .catch(error => {
                    this.errors.add({
                        field: 'defaulterror2',
                        msg: 'Erro ao deletar item'
                    })
                })

        },

        save() {
            if (this.editedSessaoIndex > -1 && this.cadastrarSessao == true) {
                // Se this.editedSessaoIndex  > -1 entao estamos na edição
                //Editando item chama-se o metodo put na rota avaliacoes e irá para update
                axios_instance({
                    method: 'put',
                    url: '/sessao/' + this.editedSessao.id + '',
                    data: {
                        id: this.editedSessao.id,
                        data: moment(String(this.editedSessao.data)).format(
                            'YYYY-MM-DD'
                        ),
                        horario: this.editedSessao.horario,
                        sala_id: this.editedSessao.sala_id,
                        instituto: this.editedSessao.instituto,
                        ano_id: this.editedSessao.ano_id,
                        tipo: 0,

                        //Avaliacoes
                        avaliacoes: this.avaliacoesDatatable,

                    }
                })
                    .then(response => {
                        alert('Sessão editada.')
                        this.updateComponent()
                    })
                    .catch(error => {
                        this.errors.clear() //Limpar os erros antes de setar novos erros
                        if (error.response.data.error[0].message)
                            this.errors.add({
                                field: 'defaulterror',
                                msg: error.response.data.error[0].message
                            })
                        else
                            this.errors.add({
                                field: 'defaulterror',
                                msg: error.response.data.error.message
                            })
                    })
            } else {
                // Se this.editedSessaoIndex  == -1 entao estamos na inserção
                axios_instance({
                    method: 'post',
                    url: '/sessao',
                    data: {
                        id: this.editedSessao.id,
                        data: moment(String(this.editedSessao.data)).format(
                            'YYYY-MM-DD'
                        ),
                        horario: this.editedSessao.horario,
                        sala_id: this.editedSessao.sala_id,
                        instituto: this.editedSessao.instituto,
                        ano_id: this.editedSessao.ano_id,
                        tipo: 0,

                        //Avaliacoes
                        avaliacoes: this.avaliacoesDatatable
                    }
                })
                    .then(response => {
                        //Inclui o item no array de item do front end
                        alert('Sessão adicionada.')
                        this.updateComponent()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
}
</script>
