<template>
  <div class="animated fadeIn">

<!-- Data Table -->
<div data-app="true">
    <v-toolbar flat color="white">
      <i class="icon-pencil"></i> <strong>Trabalhos</strong>
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
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="700px">
        <v-btn slot="activator" class="primary" color="green">Novo Trabalho</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md3>
                  <v-text-field outline v-model="editedItem.trabalho_id" label="ID" data-vv-name="trabalho_id" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('trabalho_id') }"></v-text-field>
                  <div v-if="submitted && errors.has('trabalho_id')" style="color: red">{{ errors.first('trabalho_id') }}</div>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field outline v-model="editedItem.nome" label="Nome" data-vv-name="nome" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('nome') }"></v-text-field>
                  <div v-if="submitted && errors.has('nome')" style="color: red">{{ errors.first('nome') }}</div>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-select :items="anos" outline v-model="editedItem.ano" label="Ano"  data-vv-name="ano" v-validate="'required|integer'" :class="{ 'is-invalid': submitted && errors.has('ano') }"></v-select>
                  <div v-if="submitted && errors.has('ano')" style="color: red">{{ errors.first('ano') }}</div>
                </v-flex>    
                <v-flex xs12 sm6 md4>
                  <v-text-field outline v-model="editedItem.orientador" label="Orientador" data-vv-name="orientador" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('orientador') }"></v-text-field>
                  <div v-if="submitted && errors.has('orientador')" style="color: red">{{ errors.first('orientador') }}</div>
                </v-flex>                            
                <v-flex xs12 sm6 md4>
                  <v-text-field outline v-model="editedItem.area" label="Área" data-vv-name="modalidade" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('area') }"></v-text-field>
                  <div v-if="submitted && errors.has('area')" style="color: red">{{ errors.first('area') }}</div>
                </v-flex>     

                <v-flex xs12 sm6 md4>
                  <v-text-field outline v-model="editedItem.modalidade" label="Modalidade" data-vv-name="modalidade" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('modalidade') }"></v-text-field>
                  <div v-if="submitted && errors.has('modalidade')" style="color: red">{{ errors.first('modalidade') }}</div>
                </v-flex>
                <!-- Multiple input text for autor-->
                <v-flex xs12 sm6 md9>
                  <v-text-field outline v-model="editedItem.autor" label="Autor" data-vv-name="autor" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('autor') }"></v-text-field >
                  <div v-if="submitted && errors.has('autor')" style="color: red">{{ errors.first('autor') }}</div>
                </v-flex>  

                <div>
                  <v-flex v-for="autor in editedItem.autor" xs12 sm6 md9 >
                    <v-text-field outline   label="Autor" data-vv-name="autor" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('autor') }">
                      <input v-model="autor.value">
                      <div v-if="submitted && errors.has('autor')" style="color: red">{{ errors.first('autor') }}</div>
                    </v-text-field >
                  </v-flex>  

                </div>            
                <!-- Multiple input text for autor-->
                <div v-if="submitted && errors.has('defaulterror')" style="color: red" class="container">{{ errors.first('defaulterror') }}</div>
                
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            
            <v-btn @click="addFind" slot="activator" class="primary" color="green">+ Autor</v-btn>
            <v-btn @click="delFind" slot="activator" class="primary" color="red">- Autor</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="primary" color="blue"  @click="close">Cancelar</v-btn>
            <v-btn class="primary" color="blue"  @click="handleSubmit">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
<!-- Data Table -->
<!-- Data Table -->
<!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="trabalhos"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
      class="elevation-1"
      
    >
      <template slot="items" slot-scope="props">
       
        <td class="text-xs-right">{{ props.item.trabalho_id }}</td>
        <td class="text-xs-right">{{ props.item.nome }}</td>
        <td class="text-xs-right">{{ props.item.autor }}</td>

        <!-- AUTOR -->
        <!--<td class="text-xs-right">
        {{ props.item.autor.length }}
          <a v-for="autor in props.item.autor">
              {{ props.item.autor }}
              
          </a>
        </td>-->
        <!-- AUTOR -->

        <td class="text-xs-right">{{ props.item.orientador }}</td>
        <td class="text-xs-right">{{ props.item.modalidade }}</td>
        <td class="text-xs-right">{{ props.item.area }}</td>
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
      anos: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Autor', value: 'autor' },
        { text: 'orientador', value: 'orientador' },
        { text: 'E-mail', value: 'modalidade' },
        { text: 'Ano', value: 'ano' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      trabalhos: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        trabalho_id: '',
        nome: '',
        autor: {},
        orientador: '',
        modalidade: '',
        area: '',
        ano: '',
      },
      defaultItem: {
        id: '',
        trabalho_id: '',
        nome: '',
        autor: {},
        orientador: '',
        modalidade: '',
        area: '',
        ano: '',
      },
      rowsPerPageItems: [10, 20, 50, 100],
      pagination: {
          rowsPerPage: 10
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Trabalho' : 'Editar Trabalho'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
        this.errors.clear() //Limpar os erros
      }
    },

    created () {
      //Mudando o locale do Vuetify
      this.changeLocale () 

      //Pegando todos trabalhos 
      axios_instance({
          method:'get',
          url: '/trabalho'
       })
      .then(response => {
        //console.log("response . data  trabalhos")
        this.trabalhos = response.data
      })
      .catch((error) => {
          console.log(error);
      });

      //Pegando todos os anos
      axios_instance({
          method:'get',
          url: '/getAnos'
       })
      .then(response => {
         for(let i=0; i < response.data.length; i++)
          this.anos.push(response.data[i].ano)
       })
      .catch((error) => {
          console.log(error);
      });      
    },

    //methods
    methods: {

      addFind: function () {
        this.editedItem.autor.push({ value: '' });
        console.log(this.editedItem.autor.length)
      },
      delFind: function () {
        if(this.editedItem.autor.length > 0){
          var pop = this.editedItem.autor.pop();
          console.log(pop.value)  
        }
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
        //console.log(this.trabalhos.indexOf(item))
        this.editedIndex = this.trabalhos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log("editedIndex  -  editedItem")
        console.log(this.editedIndex)
        console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        //Setando algumas variaveis para uso do delete
        const index = this.trabalhos.indexOf(item)

        // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
        confirm('Está certo que deseja deletar este item?') &&
        axios_instance({
            method: 'delete',
            url: '/trabalho/'+ item.id +'',
          })
          .then(response => {
            this.trabalhos.splice(index, 1)
          })
          .catch((error) => {
            console.log("error: ")
            console.log(error)
            //alert(JSON.stringify(error))
            alert(error.response.data)
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
          //Editando item chama-se o metodo put na rota trabalho e irá para update
          axios_instance({
            method: 'put',
            url: '/trabalho/'+ this.editedItem.id +'',
            data: {
              id: this.editedItem.id,
              trabalho_id: this.editedItem.trabalho_id,
              nome: this.editedItem.nome,
              autor: this.editedItem.autor,
              orientador: this.editedItem.orientador,
              modalidade: this.editedItem.modalidade,
              area: this.editedItem.area,
              ano: this.editedItem.ano,
            }
          })
          .then(response => {
            //console.log("response: ")
            //console.log(response)
            //Inclui o item no array de item do front end 
            alert('Trabalho editado.');
            Object.assign(this.trabalhos[this.editedIndex], this.editedItem)
            this.close()
          })
          .catch((error) => {
            //console.log("error: ")
            console.log(error)

            this.errors.clear()
            if(error.response.data[0].message)
              this.errors.add({ field: 'defaulterror', msg: error.response.data[0].message })
            else
              this.errors.add({ field: 'defaulterror', msg: error.response.data.message })
          })

        } else { // Se this.editedIndex  == -1 entao estamos na inserção de um novo trabalho
          axios_instance({
            method: 'post',
            url: '/trabalho',
            data: {
              //newtrabalho: JSON.stringify(this.editedItem)
              //trabalho: this.editedItem
              id: this.editedItem.id,
              trabalho_id: this.editedItem.trabalho_id,
              nome: this.editedItem.nome,
              autor: this.editedItem.autor,
              orientador: this.editedItem.orientador,
              modalidade: this.editedItem.modalidade,
              area: this.editedItem.area,
              ano: this.editedItem.ano,
            }
          })
          .then(response => {
            //Inclui o item no array de item do front end
            alert('Trabalho adicionado.');
            this.trabalhos.push(this.editedItem)
            this.close()
            //alert('Inclusão de autor feita com sucesso');
          })
          .catch((error) => {
            console.log("error: ")
            console.log(error.response)

            this.errors.clear()
            if(error.response.data[0].message)
              this.errors.add({ field: 'defaulterror', msg: error.response.data[0].message })
            else
              this.errors.add({ field: 'defaulterror', msg: error.response.data.message })

            // this.errors.clear()
            // if(error.response.data[0].message)
            //   alert(error.response.data[0].message)
            // else
            //   alert(error.response.data.message)

          })
        }
        
        //this.close()
      }
    }
  }
</script>

<style>
.mytable .v-table tbody tr:not(:last-child) {
    border-bottom: none;
}
</style>
