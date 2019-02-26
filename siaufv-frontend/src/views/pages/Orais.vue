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
            <td class="text-xs-left">{{ props.item.salas_nome }}</td>
            <td class="text-xs-left">{{ props.item.instituto }}</td>
            <td class="text-xs-left">{{ props.item.anos_ano }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
            <v-form ref="form" lazy-validation>
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
                            :class="{ 'is-invalid': submitted && errors.has('data') }"
                            v-on:change="setSalasDisponiveis"
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
                          v-if="submitted && errors.has('data')"
                          style="color: red"
                        >{{ errors.first('data') }}</div>
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
                          :class="{ 'is-invalid': submitted && errors.has('horario') }"
                          :disabled="horarioIsDisabled"
                          v-on:change="setSalasDisponiveis"
                        ></v-select>
                        <div
                          v-if="submitted && errors.has('horario')"
                          style="color: red"
                        >{{ errors.first('horario') }}</div>
                      </v-flex>
                      <!-- Salas -->
                      <v-flex xs12 sm6 md3>
                        <v-select
                          :items="salas_disponiveis"
                          item-value="id"
                          item-text="nome"
                          outline
                          v-model="editedSessao.sala_id"
                          label="Salas Disponíveis"
                          data-vv-name="sala"
                          v-validate="'required'"
                          :class="{ 'is-invalid': submitted && errors.has('sala') }"
                          :disabled="salaIsDisabled"
                        ></v-select>
                        <div
                          v-if="submitted && errors.has('sala')"
                          style="color: red"
                        >{{ errors.first('sala') }}</div>
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
                          :class="{ 'is-invalid': submitted && errors.has('instituto') }"
                        ></v-select>
                        <div
                          v-if="submitted && errors.has('instituto')"
                          style="color: red"
                        >{{ errors.first('instituto') }}</div>
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
                          v-validate="'required|integer'"
                          :class="{ 'is-invalid': submitted && errors.has('ano') }"
                        ></v-select>
                        <div
                          v-if="submitted && errors.has('ano')"
                          style="color: red"
                        >{{ errors.first('ano') }}</div>
                      </v-flex>
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
                              <v-flex xs12 sm6 md7>
                                <v-select
                                  :items="trabalhos"
                                  v-on:change="changedautor"
                                  item-value="trabalho_id"
                                  item-text="data"
                                  outline
                                  v-model="editedAvaliacao.trabalho_id"
                                  label="Trabalhos"
                                  data-vv-name="trabalho"
                                  v-validate="'required'"
                                  :class="{ 'is-invalid': submittedAvaliacao && errors.has('trabalho') }"
                                >
                                  <template
                                    slot="selection"
                                    slot-scope="data"
                                  >{{ data.item.trabalho_id }} - {{ data.item.nome }}</template>
                                  <template
                                    slot="item"
                                    slot-scope="data"
                                  >{{ data.item.trabalho_id }} - {{ data.item.nome }}</template>
                                </v-select>
                                <div
                                  v-if="submittedAvaliacao && errors.has('trabalho')"
                                  style="color: red"
                                >{{ errors.first('trabalho') }}</div>
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

                              <v-flex
                                xs12
                                sm6
                                md6
                                v-for="(avaliadoress, i) in editedAvaliacao.avaliadores"
                                :key="i + '-second'"
                              >
                                <v-select
                                  :items="avaliadores"
                                  item-value="id"
                                  item-text="nome"
                                  outline
                                  v-model="editedAvaliacao.avaliadores[i].avaliadores_id"
                                  label="Avaliador"
                                  data-vv-name="avaliadores"
                                  v-validate="'required'"
                                  :class="{ 'is-invalid': submittedAvaliacao && errors.has('avaliadores') }"
                                ></v-select>
                                <div
                                  v-if="submittedAvaliacao && errors.has('avaliadores')"
                                  style="color: red"
                                >{{ errors.first('avaliadores') }}</div>
                              </v-flex>

                            <v-layout>                                <v-spacer></v-spacer>
                                <v-btn
                                  class="primary"
                                  color="green"
                                  @click="handleSubmitAvaliacao"
                                >Adicionar Avaliação</v-btn></v-layout>

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
                    :items="avaliacoesParaSeremAdicionadas"
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                    :search="search"
                    class="elevation-1"
                  >
                    <template slot="items" slot-scope="props">
                      <!--<td>{{ props.item.name }}</td>-->
                      <!--<td class="text-xs-right">{{ props.item.id }}</td>-->
                      <!-- AVALIADORES -->
                      <td class="text-xs-left">
                        <span v-for="(avaliador, index) in props.item.avaliadores" :key="index">
                          {{ avaliador.avaliadores }}
                          <br>
                        </span>
                      </td>
                      <!-- AVALIADORES -->
                      <!-- <td v-for="(avaliador, index) in props.item.avaliador_nome" :key="index" class="text-xs-left">{{ avaliador.nome }}</td> -->
                      <td class="text-xs-left">{{ props.item.avaliadores[0].nome }}</td>
                      <td class="text-xs-left">{{ props.item.avaliadores[1].nome }}</td>
                      <td class="text-xs-left">{{ props.item.trabalho_id }}</td>
                      <td class="justify-center layout px-0">
                        <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
                  <v-spacer></v-spacer>
                  <v-btn class="primary" color="red" @click="cadastrarSessaoOnOf(false)">Cancelar</v-btn>
                  <v-btn class="primary" color="blue" @click="handleSubmit">Salvar Sessão</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
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
        menu: false,
        submitted: false,
        submittedAvaliacao: false,
        //dialog: false,
        search: '',
        trabalhos: [],
        sessoes: [],
        avaliacoes: [],
        avaliadores: [],
        salas: [],
        salas_disponiveis: [],
        horarios: [],
        institutos: [],
        anos: [],
        avaliacoesParaSeremAdicionadas: [],
        editedSessaoIndex: -1,
        sessaoHeaders: [
            { text: 'Data', value: 'data' },
            { text: 'Horário', value: 'horario' },
            { text: 'Sala', value: 'sala_id' },
            { text: 'Instituto', value: 'instituto' },
            { text: 'Ano', value: 'anos_ano' },
            { text: 'Ações', value: 'name', sortable: false }
        ],
        avaliacaoHeaders: [
            { text: 'Avaliador', value: 'avaliadores' },
            { text: 'Avaliador', value: 'avaliadores' },
            { text: 'Trabalho', value: 'trabalho_id' },
            { text: 'Ações', value: 'name', sortable: false }
        ],
        editedAvaliacao: {
            id: '',
            trabalhos_orientador: '',
            avaliadores: [{ id: '' }, { nome: '' }],
            trabalhos_autores: [''],
            trabalho_id: ''
        },
        defaultAvaliacao: {
            id: '',
            trabalhos_orientador: '',
            avaliadores: [{ id: '' }, { nome: '' }],
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
        }
    },

    watch: {
        // dialog(val) {
        //     val || this.close()
        //     this.errors.clear() //Limpar os erros
        // },
        cadastrarSessao(val) {
            console.log(val)
            if (val === false) {
                this.editedAvaliacao = Object.assign({}, this.defaultAvaliacao)
                this.editedSessao = Object.assign({}, this.defaultSessao)
            }
        }
    },

    created() {
        //Mudando o locale do Vuetify
        this.changeLocale()
        //Pegando todos sessoes
        this.getAxiosArraySessoes()
        //Pegando todos avaliacoes
        this.getAxiosArrayAvaliacoes()
        //Pegando todos os Trabalhos
        this.getAxiosArrayTrabalhos()
        //Pegando todas sa salas
        this.getAxiosArraySalas()
        //Pegando todos os avaliadores
        this.getAxiosArrayAvaliadores()
        //Setando Horarios
        this.setArrayHorarios()
        //Setando Institutos
        this.setArrayInstitutos()
        //Pegando todos os anos
        this.getAxiosArrayAnos()
    },

    //filters
    filters: {
        formatDate(date) {
            if (date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        }
    },

    //Methods
    methods: {
        cadastrarSessaoOnOf(value) {
            this.cadastrarSessao = value
        },
        adicionarAvaliacao() {
            this.avaliacoesParaSeremAdicionadas.push(this.editedAvaliacao)
            console.log(
                'avaliacoesParaSeremAdicionadas:',
                this.avaliacoesParaSeremAdicionadas
            )
        },
        changedautor(event) {
            this.trabalhos.map(item => {
                if (item.trabalho_id === event)
                    this.editedAvaliacao.trabalhos_autores = item.autores
            })
        },
        setSalasDisponiveis(event) {
            this.salas_disponiveis = JSON.parse(JSON.stringify(this.salas))
            // console.log('horario event: ', event)
            // //this.salas_disponiveis = JSON.parse(JSON.stringify(this.salas))
            // if (this.editedAvaliacao.data === '') return
            // if (this.editedAvaliacao.horario === '') return

            // this.avaliacoes.map(avaliacao => {
            //     this.salas_disponiveis = this.salas.filter( (sala) => {
            //       if(moment(String(avaliacao.data)).format('DD/MM/YYYY') ===
            //           moment(String(this.editedAvaliacao.data)).format('DD/MM/YYYY'))
            //         //if()
            //         //console.log("Igual")

            //       console.log('setSalasDisponiveis:', moment(String(avaliacao.data)).format('DD/MM/YYYY'), this.editedAvaliacao.data)

            //     })
            // })

            console.log('salas_disponiveis: ', this.salas_disponiveis)
        },
        getAxiosArrayAvaliacoes() {
            //Pegando todos Avaliacoes
            axios_instance({
                method: 'get',
                url: '/avaliacao'
            })
                .then(response => {
                    console.log(response.data)
                    this.avaliacoes = response.data
                    this.avaliacoes.map(item => {
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
        getAxiosArraySessoes() {
            //Pegando todos Avaliacoes
            axios_instance({
                method: 'get',
                url: '/sessao'
            })
                .then(response => {
                    //console.log(response.data)
                    this.sessoes = response.data
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
        getAxiosArrayTrabalhos() {
            //Pegando todos os anos
            axios_instance({
                method: 'get',
                url: '/trabalho'
            })
                .then(response => {
                    this.trabalhos = response.data
                    //console.log(this.trabalhos)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getAxiosArraySalas() {
            axios_instance({
                method: 'get',
                url: '/sala'
            })
                .then(response => {
                    //this.salas = response.data
                    for (let i in response.data)
                        this.salas.push({
                            id: response.data[i].id,
                            nome: response.data[i].nome
                        })
                    //console.log('Salas', this.salas)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getAxiosArrayAvaliadores() {
            axios_instance({
                method: 'get',
                url: '/avaliador'
            })
                .then(response => {
                    this.avaliadores = response.data
                    //console.log("AVALIADORES", this.avaliadores)
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
                { instituto: 'IAP' },
                { instituto: 'IBP' },
                { instituto: 'IEP' },
                { instituto: 'IHP' }
            ]
        },
        getAxiosArrayAnos() {
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
        handleSubmit(e) {
            this.submitted = true
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.save()
                }
            })
        },

        //Checar o formulário em busca de erros
        handleSubmitAvaliacao(e) {
            this.submittedAvaliacao = true
            //this.adicionarAvaliacao()
            this.$validator.validate().then(valid => {
                if (valid) {
                    console.log('oi')
                    this.adicionarAvaliacao()
                }
            })
        },

        changeLocale() {
            this.$vuetify.lang.current = 'pt'
        },

        editItem(item) {
            this.editedSessaoIndex = this.sessoes.indexOf(item)
            this.editedSessao = Object.assign({}, item)
            console.log('item: ', item)
            console.log('editedSessao: ', this.editedSessao)
            this.cadastrarSessao = true
        },

        deleteItem(item) {
            //Setando algumas variaveis para uso do delete
            const index = this.sessoes.indexOf(item)

            // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
            confirm('Está certo que deseja deletar este item?') &&
                axios_instance({
                    method: 'delete',
                    url: '/sessao/' + item.id + ''
                })
                    .then(response => {
                        this.getAxiosArraySessoes()
                        this.getAxiosArrayAvaliacoes()
                    })
                    .catch(error => {
                        this.errors.add({
                            field: 'defaulterror2',
                            msg: 'Erro ao deletar item'
                        })
                    })
            this.getAxiosArraySessoes()
            this.getAxiosArrayAvaliacoes()
        },

        close() {
            // this.dialog = false
            this.cadastrarSessao = false
            setTimeout(() => {
                this.editedSessao = Object.assign({}, this.defaultSessao)
                this.editedAvaliacao = Object.assign({}, this.defaultAvaliacao)
                this.editedSessaoIndex = -1
            }, 300)
        },

        save() {
            if (this.editedSessaoIndex > -1 && this.cadastrarSessao == true) {
                // Se this.editedSessaoIndex  > -1 entao estamos na edição
                //Editando item chama-se o metodo put na rota avaliacoes e irá para update
                axios_instance({
                    method: 'put',
                    url: '/avaliacao/' + this.editedAvaliacao.id + '',
                    data: {
                        id: this.editedAvaliacao.id,
                        data: moment(String(this.editedAvaliacao.data)).format(
                            'YYYY/MM/DD'
                        ),
                        horario: this.editedAvaliacao.horario,
                        sala_id: this.editedAvaliacao.sala_id,
                        trabalho_id: this.editedAvaliacao.trabalho_id,
                        avaliadores: this.editedAvaliacao.avaliadores,
                        instituto: this.editedAvaliacao.instituto
                    }
                })
                    .then(response => {
                        alert('Avaliacao editada.')
                        this.getAxiosArraySessoes()
                        this.getAxiosArrayAvaliacoes()
                        this.close()
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
                    url: '/Sessao',
                    data: {
                        id: this.editedSessao.id,
                        data: this.editedSessao.data,
                        horario: this.editedSessao.horario,
                        sala_id: this.editedSessao.sala_id,
                        instituto: this.editedSessao.instituto,
                        ano_id: this.editedSessao.ano_id,
                        tipo: 0

                        //Avaliacoes
                        // id: this.editedAvaliacao.id,
                        // instituto: this.editedAvaliacao.instituto,
                        // trabalho_id: this.editedAvaliacao.trabalho_id,
                        // avaliadores: this.editedAvaliacao.avaliadores
                    }
                })
                    .then(response => {
                        //Inclui o item no array de item do front end
                        alert('Avaliacoes adicionada.')
                        this.getAxiosArraySessoes()
                        this.getAxiosArrayAvaliacoes()
                        this.close()
                    })
                    .catch(error => {
                        console.log(error)

                        // this.errors.clear()
                        // if(error.response.data.error[0].message)
                        //   this.errors.add({ field: 'defaulterror', msg: error.response.data.error[0].message })
                        // else
                        //   this.errors.add({ field: 'defaulterror', msg: error.response.data.error.message })
                    })
            }

            //this.close()
        }
    }
}
</script>
