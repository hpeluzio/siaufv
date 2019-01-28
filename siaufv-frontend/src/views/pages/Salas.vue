<template>
  <div class="animated fadeIn">

      
 <div v-if="submitted && errors.has('defaulterror2')" style="color: red" class="container">{{ errors.first('defaulterror2') }}</div>
<!-- Data Table -->
<div data-app="true">
    <v-toolbar flat color="white">
      <i class="icon-calendar"></i> <strong> Salas</strong>
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
      <v-dialog v-model="dialog" max-width="600px">
        <v-btn slot="activator" class="primary" color="green">Nova Sala</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12 sm6 md4>
                  <v-text-field outline v-model="editedItem.nome" label="Nome" data-vv-name="nome" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('nome') }"></v-text-field>
                  <div v-if="submitted && errors.has('nome')" style="color: red">{{ errors.first('nome') }}</div>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field outline v-model="editedItem.descricao" label="descricao" data-vv-name="Descrição" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('descricao') }"></v-text-field>
                  <div v-if="submitted && errors.has('descricao')" style="color: red">{{ errors.first('descricao') }}</div>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field outline v-model="editedItem.capacidade" label="capacidade" data-vv-name="Capacidade" v-validate="'required|integer'" :class="{ 'is-invalid': submitted && errors.has('capacidade') }"></v-text-field>
                  <div v-if="submitted && errors.has('capacidade')" style="color: red">{{ errors.first('capacidade') }}</div>
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
      :items="salas"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">

        <td class="text-xs-right">{{ props.item.nome }}</td>
        <td class="text-xs-right">{{ props.item.descricao }}</td>
        <td class="text-xs-right">{{ props.item.capacidade }}</td>
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
      submitted: false,
      dialog: false,
      search: '',
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Descrição', value: 'descricao' },
        { text: 'Capacidade', value: 'capacidade' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      salas: [],
      editedIndex: -1,
      editedItem: {
        nome: '',
        descricao: '',
        capacidade: '',
      },
      defaultItem: {
        nome: '',
        descricao: '',
        capacidade: '',
      },
      rowsPerPageItems: [10, 20, 50, 100],
      pagination: {
          rowsPerPage: 10
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo sala' : 'Editar Sala'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
        //console.log(this.errors)
        this.errors.clear() //Limpar os erros
      }
    },

    created () {
      //Pegando todos salas 
      this.getAxiosArraySalas()

      //Mudando o locale do Vuetify
      this.changeLocale () 
    },

    //methods
    methods: {
      
      getAxiosArraySalas() {
        axios_instance({
            method:'get',
            url: '/sala'
        })
        .then(response => {
          //console.log("response . data  salas")
          this.salas = response.data
        })
        .catch((error) => {
            console.log(error);
        });
      },

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

      editItem (item) {
        //console.log(this.salas.indexOf(item))
        this.editedIndex = this.salas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        //console.log("editedIndex  -  editedItem")
        //console.log(this.editedIndex)
        //console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        //Setando algumas variaveis para uso do delete
        const index = this.salas.indexOf(item)

        // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
        confirm('Está certo que deseja deletar este item?') &&
        axios_instance({
            method: 'delete',
            url: '/sala/'+ item.id +'',
          })
          .then(response => {
            this.getAxiosArraySalas()
          })
          .catch((error) => {
            console.log(error)
            this.errors.add({ field: 'defaulterror2', msg: 'Erro ao deletar item' })
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
        if (this.editedIndex > -1) { // Se this.editedIndex  > -1 entao estamos na edição
          //Editando item chama-se o metodo put na rota sala e irá para update
          axios_instance({
            method: 'put',
            url: '/sala/'+ this.editedItem.id +'',
            data: {
              nome: this.editedItem.nome,
              descricao: this.editedItem.descricao,
              capacidade: this.editedItem.capacidade,
            }
          })
          .then(response => {
            alert('Sala editada.');
            this.getAxiosArraySalas()
            this.close()
          })
          .catch((error) => {
            //console.log("error: ")
            //console.log(error)
            this.errors.clear() //Limpar os erros antes de setar novos erros
            if(error.response.data.error[0].message)
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error[0].message })
            else
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error.message })
            //confirm('Algum erro erro ocorreu.')
          })

        } else { // Se this.editedIndex  == -1 entao estamos na inserção
          axios_instance({
            method: 'post',
            url: '/sala',
            data: {
              nome: this.editedItem.nome,
              descricao: this.editedItem.descricao,
              capacidade: this.editedItem.capacidade,
            }
          })
          .then(response => {
            //Inclui o item no array de item do front end
            alert('Sala adicionada.');
            this.getAxiosArraySalas()
            this.close()
            //alert('Inclusão de autor feita com sucesso');
          })
          .catch((error) => {
            //console.log("error: ")
            //console.log(error.response.data.error[0].message)
            this.errors.clear()
            if(error.response.data.error[0].message)
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error[0].message })
            else
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error.message })
          })
        }
        
        //this.close()
      }
    }
  }
</script>
