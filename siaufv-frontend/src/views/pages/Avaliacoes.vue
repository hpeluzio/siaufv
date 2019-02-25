<template>
<div class="animated fadeIn">

      
<div v-if="submitted && errors.has('defaulterror2')" style="color: red" class="container">{{ errors.first('defaulterror2') }}</div>

<div data-app="true">
    <v-toolbar flat color="white">
      <i class="icon-people"></i> <strong>Avaliações</strong>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Procurar"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn slot="activator" class="primary" color="green">Nova Avaliação</v-btn>
        <v-card>
          <v-card-title>
            <v-icon large color="green darken-2">business</v-icon> 
            <span class="headline"><h5>{{ formTitle }}</h5></span> 
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <!--<v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="id"></v-text-field>
                </v-flex>-->

              <!-- DATA -->
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
                  ></v-text-field>
                  <v-date-picker color="green lighten-1" locale="pt-br" no-title scrollable
                    v-model="editedItem.data"
                    @change="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              
                <!-- Horario -->
                <v-flex xs12 sm6 md2>
                  <v-select :items="horarios" item-value="horario" item-text="horario"  outline v-model="editedItem.horario" label="Horário"  data-vv-name="horario" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('horario') }"></v-select>
                  <div v-if="submitted && errors.has('horario')" style="color: red">{{ errors.first('horario') }}</div>
                </v-flex>  

                <!-- Tipos de Avaliação -->
                <v-flex xs12 sm6 md2>
                  <v-select :items="avaliacao_tipos" item-value="id" item-text="nome"  outline v-model="editedItem.tipo" label="Tipos"  data-vv-name="tipo" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('tipo') }"></v-select>
                  <div v-if="submitted && errors.has('tipo')" style="color: red">{{ errors.first('tipo') }}</div>
                </v-flex>              

                <!-- Salas -->
                <v-flex xs12 sm6 md2>
                  <v-select :items="salas" item-value="id" item-text="nome"  outline v-model="editedItem.sala_id" label="Salas"  data-vv-name="sala" v-validate="'required|integer'" :class="{ 'is-invalid': submitted && errors.has('sala') }"></v-select>
                  <div v-if="submitted && errors.has('sala')" style="color: red">{{ errors.first('sala') }}</div>
                </v-flex>

                <!-- Instituto -->
                <v-flex xs12 sm6 md2>
                  <v-select :items="institutos" item-value="instituto" item-text="instituto"  outline v-model="editedItem.instituto" label="Instituto"  data-vv-name="instituto" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('instituto') }"></v-select>
                  <div v-if="submitted && errors.has('instituto')" style="color: red">{{ errors.first('instituto') }}</div>
                </v-flex>  

                <!-- Trabalhos -->
                <v-flex xs12 sm6 md7>
                  <v-select :items="trabalhos" v-on:change="changedautor" item-value="trabalho_id" item-text="nome"  outline v-model="editedItem.trabalho_id" label="Trabalhos"  data-vv-name="trabalho" v-validate="'required|integer'" :class="{ 'is-invalid': submitted && errors.has('trabalho') }"></v-select>
                  <div v-if="submitted && errors.has('trabalho')" style="color: red">{{ errors.first('trabalho') }}</div>
                </v-flex>

                <!-- Orientadores -->
                <v-flex xs12 sm6 md5>
                  <v-select disabled :items="trabalhos" item-value="trabalho_id" item-text="orientador"  outline v-model="editedItem.trabalho_id" label="Orientador" ></v-select>
                  <div v-if="submitted && errors.has('trabalho')" style="color: red">{{ errors.first('trabalho') }}</div>
                </v-flex>

                <!-- Autores -->
                <v-flex xs12 sm6 md12><h5>Autores do trabalho</h5></v-flex>
                <v-flex xs12 sm6 md5 v-for="(autoress, i) in editedItem.trabalhos_autores" :key="i + '-first'">
                  <v-select disabled :items="editedItem.trabalhos_autores" item-value="id" item-text="autor" v-model="editedItem.trabalhos_autores[i].id" label="Autor" outline></v-select>
                </v-flex>

                <!-- Avaliadores -->
                <v-flex xs12 sm6 md12><h5>Avaliadores</h5></v-flex>
                
                <v-flex xs12 sm6 md6 v-for="(avaliadoress, i) in editedItem.avaliadores_nome" :key="i + '-second'">
                  <v-select  :items="avaliadores" item-value="id" item-text="nome"  outline v-model="editedItem.avaliadores_nome[i].avaliadores_id" label="Avaliador"  data-vv-name="avaliadores" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('avaliadores') }"></v-select>
                  <div v-if="submitted && errors.has('avaliadores')" style="color: red">{{ errors.first('avaliadores') }}</div>
                </v-flex>

                <!-- Default Erro -->
                <div v-if="submitted && errors.has('defaulterror')" style="color: red" class="container">{{ errors.first('defaulterror') }}</div>

              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" color="orange" @click="close">Cancelar</v-btn>
            <v-btn class="primary" color="blue" @click="handleSubmit">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="avaliacoes"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <!--<td>{{ props.item.name }}</td>-->
        <!--<td class="text-xs-right">{{ props.item.id }}</td>-->
        <td class="text-xs-right">{{ props.item.data | formatDate }}</td>
        <td class="text-xs-right">{{ props.item.horario }}</td>
        <span v-if="props.item.tipo === 0">
          <td class="text-xs-right">Oral</td>
        </span>
        <span v-else-if="props.item.tipo === 1">
          <td class="text-xs-right">Painel</td>
        </span>
        <td class="text-xs-right">{{ props.item.salas_nome }}</td>
        
        <!-- AVALIADORES -->
         <td class="text-xs-right">
            <span v-for="(avaliador, index) in props.item.avaliadores_nome" :key="index"> {{ avaliador.avaliadores_nome }} <br></span>
         </td>
        <!-- AVALIADORES -->
        <td class="text-xs-right">{{ props.item.instituto }}</td>
        <td class="text-xs-right">{{ props.item.anos_ano }}</td>
        <td class="text-xs-right">{{ props.item.trabalho_id }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        <div style="color: red">Sua procura por <strong>"{{ search }}"</strong> não achou resultados.</div>
      </v-alert>
    </v-data-table>
    <!-- Data Table -->
  </div>
  
  </div>
</template>

<script>
import axios_instance from '../../axios';
import moment from 'moment'

export default {
    data: () => ({
      menu: false,
      submitted: false,
      dialog: false,
      search: '',
      headers: [
        { text: 'Data', value: 'data' },
        { text: 'Horário', value: 'horario' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Sala', value: 'sala_id' },
        { text: 'Avaliadores', value: 'avaliadores_nome' },
        { text: 'Instituto', value: 'instituto' },
        { text: 'Ano', value: 'anos_ano' },
        { text: 'Trabalho', value: 'trabalho_id' },
        { text: 'Ações', value: 'name', sortable: false }
      ],
      trabalhos: [],
      avaliacoes: [],
      avaliadores: [],
      autores: [],
      salas: [],
      horarios: [],
      institutos: [],
      avaliacao_tipos: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        data: '',
        horario: '',
        tipo: '',
        instituto: '',
        trabalhos_orientador: '',
        sala_id: '',
        avaliadores_nome: [{ id: '' }, { nome: '' }],
        trabalhos_autores: [],
        trabalho_id: '',
      },
      defaultItem: {
        id: '',
        data: '',
        horario: '',
        tipo: '',
        instituto: '',
        trabalhos_orientador: '',
        sala_id: '',
        avaliadores_nome: [{ id: '' }, { nome: '' }],
        trabalhos_autores: [],
        trabalho_id: '',      
      },
      rowsPerPageItems: [10, 20, 50, 100],
      pagination: {
          rowsPerPage: 10
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nova Avaliação' : 'Editar Avaliação'
      },
      computedDateFormattedMomentjs () {
        return this.editedItem.data ? moment(this.editedItem.data).format('DD/MM/YYYY') : ''
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
        this.errors.clear() //Limpar os erros
      },
    },

    created () {
      //Mudando o locale do Vuetify
      this.changeLocale () 
      //Pegando todos avaliacoes
      this.getAxiosArrayAvaliacoes()
      //Pegando todos os anos
      this.getAxiosArrayTrabalhos()
      //Pegando todas sa salas
      this.getAxiosArraySalas()
      //Pegando todos os avaliadores
      this.getAxiosArrayAvaliadores()
      //Setando tipos
      this.setArrayTipo()   
      //Setando Horários
      this.setArrayHorarios()
      //Setando Institutos
      this.setArrayInstitutos() 
    },

    //filters
    filters: {
      formatDate(date) {
        if (date) {
          return moment(String(date)).format('DD/MM/YYYY')
        }
      },
    },

    //Methods
    methods: {
      changedautor(event){
        console.log(event)
        this.trabalhos.map( (item) => {
          if(item.trabalho_id === event )
            this.editedItem.trabalhos_autores = item.autores
        })
      },
      getAxiosArrayAvaliacoes() {
        //Pegando todos Avaliacoes 
        axios_instance({
            method:'get',
            url: '/avaliacao'
        })
        .then(response => {
          //console.log(response.data)
          this.avaliacoes = response.data
          this.avaliacoes.map( item => {
            item.horario = item.horario.split(':')[0] + ":" + item.horario.split(':')[1]
            item.data = moment(String(item.data)).format('YYYY-MM-DD')
          })
          console.log('this.avaliacoes: ', this.avaliacoes)
        })
        .catch((error) => {
            console.log(error);
        });
      },

      getAxiosArrayTrabalhos() {
        //Pegando todos os anos
        axios_instance({
            method:'get',
            url: '/trabalho'
        })
        .then(response => {
          this.trabalhos = response.data
          //console.log(this.trabalhos)
        })
        .catch((error) => {
            console.log(error);
        });
      },

      getAxiosArraySalas() {
        axios_instance({
            method:'get',
            url: '/sala'
        })
        .then(response => {
          //this.salas = response.data
          for(let i in response.data)
            this.salas.push({ 'id': response.data[i].id, 'nome':  response.data[i].nome })
          //console.log('Salas', this.salas)
        })
        .catch((error) => {
            console.log(error);
        });
      },

      getAxiosArrayAvaliadores() {
        axios_instance({
            method:'get',
            url: '/avaliador'
        })
        .then(response => {
          this.avaliadores = response.data
          //console.log("AVALIADORES", this.avaliadores)
        })
        .catch((error) => {
            console.log(error);
        });
      },

      setArrayTipo() {
        this.avaliacao_tipos = [{ id: 0, nome: 'Oral'}, { id: 1, nome: 'Painel'}]
      },

      setArrayHorarios() {
        this.horarios = [{ horario: '08:00' }, { horario: '10:00' }, { horario: '12:00' }, { horario: '14:00' },
                         { horario: '16:00' }, { horario: '18:00' }, { horario: '20:00' }, { horario: '22:00' }]
      },

      setArrayInstitutos() {
        this.institutos = [{ instituto: 'IAP' }, { instituto: 'IBP' }, { instituto: 'IEP' }, { instituto: 'IHP' } ]
      },

      //Checar o formulário em busca de erros
      handleSubmit(e) {
        this.submitted = true;
        this.$validator.validate().then(valid => {
            if (valid) {
                this.save()
            }
        });
      },
      
      changeLocale () {
        this.$vuetify.lang.current = 'pt'
      },

      editItem (item) {
        this.editedIndex = this.avaliacoes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        //Setando algumas variaveis para uso do delete
        const index = this.avaliacoes.indexOf(item)

        // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
        confirm('Está certo que deseja deletar este item?') &&
        axios_instance({
            method: 'delete',
            url: '/avaliacao/'+ item.id +'',
          })
          .then(response => {
            this.getAxiosArrayAvaliacoes()
          })
          .catch((error) => {
            this.errors.add({ field: 'defaulterror2', msg: 'Erro ao deletar item' })
          })
          this.getAxiosArrayAvaliacoes()
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) { // Se this.editedIndex  > -1 entao estamos na edição
          //Editando item chama-se o metodo put na rota avaliacoes e irá para update
          axios_instance({
            method: 'put',
            url: '/avaliacao/'+ this.editedItem.id +'',
            data: {
              id: this.editedItem.id,
              data: moment(String(this.editedItem.data)).format('YYYY/MM/DD'),
              horario: this.editedItem.horario,
              tipo: this.editedItem.tipo,
              sala_id: this.editedItem.sala_id,
              trabalho_id: this.editedItem.trabalho_id,
              avaliadores_nome: this.editedItem.avaliadores_nome,
              instituto: this.editedItem.instituto
            }
          })
          .then(response => {
            alert('Avaliacao editada.');
            this.getAxiosArrayAvaliacoes()
            this.close()
          })
          .catch((error) => {
            this.errors.clear() //Limpar os erros antes de setar novos erros
            if(error.response.data.error[0].message)
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error[0].message })
            else
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error.message })
          })

        } else { // Se this.editedIndex  == -1 entao estamos na inserção
          axios_instance({
            method: 'post',
            url: '/avaliacao',
            data: {
              //newavaliacao: JSON.stringify(this.editedItem)
              //avaliacao: this.editedItem
              id: this.editedItem.id,
              data: this.editedItem.data,
              horario: this.editedItem.horario,
              tipo: this.editedItem.tipo,
              sala_id: this.editedItem.sala_id,
              trabalho_id: this.editedItem.trabalho_id,
              avaliadores_nome: this.editedItem.avaliadores_nome,
              instituto: this.editedItem.instituto
            }
          })
          .then(response => {
            //Inclui o item no array de item do front end
            alert('Avaliacoes adicionada.');
            this.getAxiosArrayAvaliacoes()
            this.close()
          })
          .catch((error) => {
            console.log(error)

            // this.errors.clear()
            // if(error.response.data.error[0].message)
            //   this.errors.add({ field: 'defaulterror', msg: error.response.data.error[0].message })
            // else
            //   this.errors.add({ field: 'defaulterror', msg: error.response.data.error.message })
          })
        }
        
        //this.close()
      },
    }
  }
</script>
