<template>
  <div class="animated fadeIn">

      
 <div v-if="submitted && errors.has('defaulterror2')" style="color: red" class="container">{{ errors.first('defaulterror2') }}</div>
<!-- Data Table -->
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
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <!--<v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="id"></v-text-field>
                </v-flex>-->

              <!-- -->
              <v-flex xs12 sm6 md3>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    :format="formatDate"
                    outline
                    slot="activator"
                    v-model="editedItem.data"
                    prepend-icon="event"
                    readonly
                    label="Data" data-vv-name="data"
                    v-validate="'required'"
                    :class="{ 'is-invalid': submitted && errors.has('data') }"                    
                  ></v-text-field>
                  
                  <v-date-picker locale="pt-br" v-model="editedItem.data" no-title scrollable color="green lighten-1">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <div v-if="submitted && errors.has('data')" style="color: red">{{ errors.first('data') }}</div>
                </v-flex>
              <!-- -->

                <v-flex xs12 sm6 md3>
                  <v-select :items="horarios" item-value="horario" item-text="horario"  outline v-model="editedItem.horario" label="Horário"  data-vv-name="horario" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('horario') }"></v-select>
                  <div v-if="submitted && errors.has('horario')" style="color: red">{{ errors.first('horario') }}</div>
                </v-flex>  

                <v-flex xs12 sm6 md3>
                  <v-select :items="avaliacao_tipos" item-value="id" item-text="nome"  outline v-model="editedItem.tipo" label="Tipos"  data-vv-name="tipo" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('tipo') }"></v-select>
                  <div v-if="submitted && errors.has('tipo')" style="color: red">{{ errors.first('tipo') }}</div>
                </v-flex>              

                <v-flex xs12 sm6 md3>
                  <v-select :items="salas" item-value="id" item-text="nome"  outline v-model="editedItem.sala_id" label="Salas"  data-vv-name="sala" v-validate="'required|integer'" :class="{ 'is-invalid': submitted && errors.has('sala') }"></v-select>
                  <div v-if="submitted && errors.has('sala')" style="color: red">{{ errors.first('sala') }}</div>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-select :items="trabalhos" item-value="trabalho_id" item-text="nome"  outline v-model="editedItem.trabalho_id" label="Trabalhos"  data-vv-name="trabalho" v-validate="'required|integer'" :class="{ 'is-invalid': submitted && errors.has('trabalho') }"></v-select>
                  <div v-if="submitted && errors.has('trabalho')" style="color: red">{{ errors.first('trabalho') }}</div>
                </v-flex>


                <v-flex v-for="(avaliadoress, index) in editedItem.avaliadores_nome" :key="index" xs12 sm6 md6 >
                  <v-select :items="avaliadores" item-value="id" item-text="nome"  outline v-model="editedItem.avaliadores_nome[index].avaliadores_id" label="Avaliador"  data-vv-name="avaliadores" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('avaliadores') }"></v-select>
                  <div v-if="submitted && errors.has('avaliadores')" style="color: red">{{ errors.first('avaliadores') }}</div>
                </v-flex>

                <!-- <v-flex xs12 sm6 md6>
                <v-select :items="avaliadores" item-value="id" item-text="nome"  outline v-model="editedItem.avaliadores_nome[0].avaliadores_id" label="Avaliador"  data-vv-name="avaliadores" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('avaliadores') }"></v-select>
                <div v-if="submitted && errors.has('avaliadores')" style="color: red">{{ errors.first('avaliadores') }}</div>
                </v-flex>

                <v-flex xs12 sm6 md6>
                <v-select :items="avaliadores" item-value="id" item-text="nome"  outline v-model="editedItem.avaliadores_nome[1].avaliadores_id" label="Avaliador"  data-vv-name="avaliadores" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('avaliadores') }"></v-select>
                <div v-if="submitted && errors.has('avaliadores')" style="color: red">{{ errors.first('avaliadores') }}</div>  
                </v-flex> -->

                <!--
                <v-flex v-for="(avaliadores, index) in editedItem.avaliadores_nome" :key="index" xs12 sm6 md6 >
                  <v-text-field outline v-model="avaliadores.avaliadores_nome"  label="Avaliador " data-vv-name="avaliadores" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('avaliadores') }"></v-text-field >
                  <div v-if="submitted && errors.has('avaliadores')" style="color: red">{{ errors.first('avaliadores') }}</div>
                </v-flex>
                -->

                <v-flex xs12 sm6 md3>
                  <v-text-field outline v-model="editedItem.instituto" label="Instituto" data-vv-name="instituto" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('instituto') }"></v-text-field>
                  <div v-if="submitted && errors.has('instituto')" style="color: red">{{ errors.first('instituto') }}</div>
                </v-flex>

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
        <td class="text-xs-right">{{ props.item.data }}</td>
        <td class="text-xs-right">{{ props.item.horario }}</td>
        <span v-if="props.item.tipo === 0">
          <td class="text-xs-right">Oral</td>
        </span>
        <span v-else-if="props.item.tipo === 0">
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
  </div>
  <!-- Data Table -->
  </div>
</template>

<script>
import axios_instance from '../../axios';

export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      submitted: false,
      dialog: false,
      search: '',
      trabalhos: [],
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
      avaliacoes: [],
      avaliadores: [],
      salas: [],
      horarios: [],
      avaliacao_tipos: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        data: '',
        horario: '',
        tipo: '',
        instituto: '',
        sala_id: '',
        avaliadores_nome: [{ id: '' }, { nome: '' }],
        trabalho_id: '',
      },
      defaultItem: {
        id: '',
        data: '',
        horario: '',
        tipo: '',
        instituto: '',
        sala_id: '',
        avaliadores_nome: [{ id: '' }, { nome: '' }],
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
    },

    //methods
    methods: {
formatDate (date) {
  return moment(date).format('DD-MM-YYYY')
},      
      getAxiosArrayAvaliacoes() {
        //Pegando todos Avaliacoes 
        axios_instance({
            method:'get',
            url: '/avaliacao'
        })
        .then(response => {
          this.avaliacoes = response.data
          //console.log(this.avaliacoes) 
          //////////////////
          let arrei = JSON.parse(JSON.stringify(this.avaliacoes))
          let arrei2 = []
          // Trabalhando os dados brutos do response.data
          var agrupadoArrei = arrei.reduce( (accumulatedLine, currentLine) => {
              var hasOwnProperty = Object.prototype.hasOwnProperty;
              //Funcao que verifica se um array de objetos está vazio
              function isEmpty(obj) {
                  // null and undefined are "empty"
                  if (obj == null) return true;
                  // Assume if it has a length property with a non-zero value
                  // that that property is correct.
                  if (obj.length > 0)    return false;
                  if (obj.length === 0)  return true;
                  // If it isn't an object at this point
                  // it is empty, but it can't be anything *but* empty
                  // Is it empty?  Depends on your application.
                  if (typeof obj !== "object") return true;
                  // Otherwise, does it have any properties of its own?
                  // Note that this doesn't handle
                  // toString and valueOf enumeration bugs in IE < 9
                  for (var key in obj) {
                      if (hasOwnProperty.call(obj, key)) return false;
                  }
                  return true;
              }

              //Ferifica se o accumulatedLine
              if(isEmpty(accumulatedLine)) {
                arrei2.push(currentLine)
                let av = arrei2[arrei2.length-1].avaliadores_nome  
                arrei2[arrei2.length-1].avaliadores_nome = []
                arrei2[arrei2.length-1].avaliadores_nome.push({ 'avaliadores_id': arrei2[arrei2.length-1].avaliadores_id,  
                                                                'avaliadores_nome': av  })
                //console.log(arrei2)
                return currentLine
              }
              
              if(arrei2[arrei2.length-1].id === currentLine.id) {
                //arrei2[arrei2.length-1].avaliadores_nome = []
                arrei2[arrei2.length-1].
                  avaliadores_nome
                  .push({'avaliadores_id': currentLine.avaliadores_id,  
                  'avaliadores_nome': currentLine.avaliadores_nome} )

              }
              else {
                arrei2.push(currentLine)
              }

          }, {})

          this.avaliacoes = JSON.parse(JSON.stringify(arrei2))
          console.log(arrei2)
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
          for(let i in response.data.trabalhos)
            this.trabalhos.push({ 'trabalho_id': response.data.trabalhos[i].trabalho_id, 
                                  'nome': `${response.data.trabalhos[i].trabalho_id} - ${response.data.trabalhos[i].nome}` })
          
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
          //console.log(response.data)
          for(let i in response.data)
            this.salas.push({ 'id': response.data[i].id, 'nome':  response.data[i].nome })
          //console.log(this.salas)
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
          console.log("AVALIADORES")
          //console.log(this.avaliadores)
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
            //this.getAxiosArrayAvaliacoes()
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
            //this.close()
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
