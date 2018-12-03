<template>
  <div class="animated fadeIn">

      
 
<!-- Data Table -->
<div data-app="true">
    <v-toolbar flat color="white">
      <i class="icon-people"></i> <strong> Avaliadores</strong>
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
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Novo</v-btn>
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
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.matricula" label="Matrícula" data-vv-name="matricula" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('matricula') }"></v-text-field>
                  <div v-if="submitted && errors.has('matricula')" style="color: red">{{ errors.first('matricula') }}</div>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.nome" label="Nome" data-vv-name="nome" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('nome') }"></v-text-field>
                  <div v-if="submitted && errors.has('curso')" style="color: red">{{ errors.first('nome') }}</div>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.curso" label="Curso" data-vv-name="curso" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('curso') }"></v-text-field>
                  <div v-if="submitted && errors.has('curso')" style="color: red">{{ errors.first('curso') }}</div>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.instituto" label="Instituto" data-vv-name="instituto" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('instituto') }"></v-text-field>
                  <div v-if="submitted && errors.has('instituto')" style="color: red">{{ errors.first('instituto') }}</div>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" label="E-mail" data-vv-name="email" v-validate="'required|email'" :class="{ 'is-invalid': submitted && errors.has('email') }"></v-text-field>
                  <div v-if="submitted && errors.has('email')" style="color: red">{{ errors.first('email') }}</div>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.ano" label="Ano" data-vv-name="ano" v-validate="'required|integer'" :class="{ 'is-invalid': submitted && errors.has('ano') }"></v-text-field>
                  <div v-if="submitted && errors.has('ano')" style="color: red">{{ errors.first('ano') }}</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="handleSubmit">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="avaliadores"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <!--<td>{{ props.item.name }}</td>-->
        <!--<td class="text-xs-right">{{ props.item.id }}</td>-->
        <td class="text-xs-right">{{ props.item.matricula }}</td>
        <td class="text-xs-right">{{ props.item.nome }}</td>
        <td class="text-xs-right">{{ props.item.curso }}</td>
        <td class="text-xs-right">{{ props.item.instituto }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.ano }}</td>
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
      <!--<template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>-->
    </v-data-table>
  </div>
  <!-- Data Table -->
       
      
 
   
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate';

import pt_BR from 'vee-validate/dist/locale/pt_BR';

Vue.use(VeeValidate, {fieldsBagName: 'formFields'}); // Esse fieldsBagName é só pra tirar o warn de conflito com field do veevalidate
Validator.localize('pt_BR', pt_BR);

export default {
    data: () => ({
      submitted: false,
      dialog: false,
      search: '',
      headers: [
        // {
        //   text: 'Dessert (100g serving)',
        //   align: 'left',
        //   sortable: false,
        //   value: 'name'
        // },
        //{ text: 'Id', value: 'id' },
        { text: 'Matrícula', value: 'matricula' },
        { text: 'Nome', value: 'nome' },
        { text: 'Curso', value: 'curso' },
        { text: 'instituto', value: 'instituto' },
        { text: 'E-mail', value: 'email' },
        { text: 'Ano', value: 'ano' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      //desserts: [],
      avaliadores: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        matricula: '',
        nome: '',
        curso: '',
        instituto: '',
        email: '',
        ano: '',
      },
      defaultItem: {
        id: '',
        matricula: '',
        nome: '',
        curso: '',
        instituto: '',
        email: '',
        ano: '',
      },
      rowsPerPageItems: [10, 20, 50, 100],
      pagination: {
          rowsPerPage: 10
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo' : 'Editar'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.changeLocale ()
      
      axios({
          method:'get',
          url:'http://127.0.0.1:3333/avaliador'
      })
      .then(response => {
        //console.log("response . data  avaliadores")
        this.avaliadores = response.data
      })
      .catch((error) => {
          console.log(error);
      });
    },

    methods: {
      //Checar o formulário em busca de erros
      handleSubmit(e) {
        this.submitted = true;
        this.$validator.validate().then(valid => {
            if (valid) {
                this.save()
                //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
            }
        });
      },  
      changeLocale () {
        this.$vuetify.lang.current = 'pt'
      },
      //initialize () {  },

      editItem (item) {
        //console.log(this.avaliadores.indexOf(item))
        this.editedIndex = this.avaliadores.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log("editedIndex  -  editedItem")
        console.log(this.editedIndex)
        console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        console.log(item.id)
        const index = this.avaliadores.indexOf(item)
        confirm('Está certo que deseja deletar este item?') &&

        axios({
            method: 'delete',
            url: 'http://127.0.0.1:3333/avaliador/'+ item.id +'',
          })
          .then(response => {
            this.avaliadores.splice(index, 1)
          })
          .catch((error) => {
            console.log("error: ")
            console.log(error)
            this.errors.add({ field: 'auth', msg: 'E-mail ou senha inválidos' })
          })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          //Editando item chama-se o metodo put na rota avaliador e irá para update
          axios({
            method: 'put',
            url: 'http://127.0.0.1:3333/avaliador/'+ this.editedItem.id +'',
            data: {
              //newavaliador: JSON.stringify(this.editedItem)
              //avaliador: this.editedItem
              matricula: this.editedItem.matricula,
              nome: this.editedItem.nome,
              curso: this.editedItem.curso,
              instituto: this.editedItem.instituto,
              email: this.editedItem.email,
              ano: this.editedItem.ano,
            }
          })
          .then(response => {
            //console.log("response: ")
            //console.log(response)
            //Inclui o item no array de item do front end 
            Object.assign(this.avaliadores[this.editedIndex], this.editedItem)
            alert('Sucesso! Avaliador foi editado.');
          })
          .catch((error) => {
            console.log("error: ")
            console.log(error)
          })

        } else {
          axios({
            method: 'post',
            url: 'http://127.0.0.1:3333/avaliador',
            data: {
              //newavaliador: JSON.stringify(this.editedItem)
              //avaliador: this.editedItem
              matricula: this.editedItem.matricula,
              nome: this.editedItem.nome,
              curso: this.editedItem.curso,
              instituto: this.editedItem.instituto,
              email: this.editedItem.email,
              ano: this.editedItem.ano,
            }
          })
          .then(response => {
            //console.log("response: ")
            //console.log(response)
            //Inclui o item no array de item do front end 
            this.avaliadores.push(this.editedItem)
            //alert('Inclusão de autor feita com sucesso');
          })
          .catch((error) => {
            console.log("error: ")
            console.log(error)
            this.errors.add({ field: 'auth', msg: 'E-mail ou senha inválidos' })
          })
        }
        
        this.close()
      }
    }
  }
</script>
