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
                  <v-text-field outline v-model="editedItem.area" label="Área" data-vv-name="area" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('area') }"></v-text-field>
                  <div v-if="submitted && errors.has('area')" style="color: red">{{ errors.first('area') }}</div>
                </v-flex>     

                <v-flex xs12 sm6 md4>
                  <v-text-field outline v-model="editedItem.modalidade" label="Modalidade" data-vv-name="modalidade" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('modalidade') }"></v-text-field>
                  <div v-if="submitted && errors.has('modalidade')" style="color: red">{{ errors.first('modalidade') }}</div>
                </v-flex>
                
                <!--<v-flex xs12 sm6 md9>
                  <v-text-field outline v-model="editedItem.autores" label="Autores" data-vv-name="autores" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('autores') }"></v-text-field >
                  <div v-if="submitted && errors.has('autores')" style="color: red">{{ errors.first('autores') }}</div>
                </v-flex>-->  

                
                <!-- Multiple input text for autor-->
                  <v-flex v-for="(autors, index) in editedAutores" :key="index" xs12 sm6 md9 >
                    <v-text-field outline v-model="autors.autor"  label="Autor" data-vv-name="autores" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('autores') }"></v-text-field >
                    <div v-if="submitted && errors.has('autores')" style="color: red">{{ errors.first('autores') }}</div>
                  </v-flex>
                <!-- Multiple input text for autor-->

                <!-- Errors-->
                <div v-if="submitted && errors.has('defaulterror')" style="color: red" class="container">{{ errors.first('defaulterror') }}</div>
                
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="removerAutor()" slot="activator" class="primary" color="red">- Autor</v-btn>
            <v-btn @click="adicionarAutor()" slot="activator" class="primary" color="green">+ Autor</v-btn>
            
            <v-spacer></v-spacer>
            <v-btn class="primary" color="orange"  @click="close">Cancelar</v-btn>
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
        
        <!-- AUTOR -->
         <td class="text-xs-right">
            <span v-for="autor in props.item.autores"> {{ autor.autor }}</span></br>
         </td>
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
      find: [],
      headers: [
        { text: 'ID', value: 'trabalho_id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Autor(es)', value: 'autores' },
        { text: 'orientador', value: 'orientador' },
        { text: 'E-mail', value: 'modalidade' },
        { text: 'Área', value: 'area' },
        { text: 'Ano', value: 'ano' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      trabalhos: [],
      trabalhos_autores: [],
      editedAutores: [{id: '', trabalho_id: '', autor: ''}],
      editedIndex: -1,
      editedItem: {
        id: '',
        trabalho_id: '',
        nome: '',
        autores: [{id: '', trabalho_id: '', autor: ''}],
        orientador: '',
        modalidade: '',
        area: '',
        ano: '',
      },
      defaultItem: {
        id: '',
        trabalho_id: '',
        nome: '',
        autores: [{id: '', trabalho_id: '', autor: ''}],
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
        if(this.editedIndex === -1 ) 
          this.editedAutores = [{}]
        console.log(this.editedIndex)
        //this.editedAutores = []
        //this.editedItem.autores = this.editAutores
        //for (let i=0; i < this.editAutores.length; i++)
        // this.editedItem.autores[i] = Object.assign(this.editedItem.autores[i], this.editAutores[i])
        //this.editedItem.autores = Object.assign({}, this.editAutores)
      }
    },

    created () {
      console.log('created()')
      //Mudando o locale do Vuetify
      this.changeLocale () 

      //Pegando todos trabalhos 
      axios_instance({
          method:'get',
          url: '/trabalho'
       })
      .then(response => {
        // Pegando os trabalhos e os autores desses trabalhos
        this.trabalhos = response.data.trabalhos
        this.trabalhos_autores = response.data.trabalhos_autores

        for(let i=0; i < this.trabalhos.length; i++){
          this.trabalhos[i].autores = []
        }

        //Setando autores array base desse componente
        for(let i=0; i < this.trabalhos.length; i++){
          for(let j=0; j < this.trabalhos_autores.length; j++){
            if (this.trabalhos[i].trabalho_id == this.trabalhos_autores[j].trabalho_id){
              this.trabalhos[i].autores.push({ id: this.trabalhos_autores[j].id, trabalho_id: this.trabalhos_autores[j].trabalho_id, autor: this.trabalhos_autores[j].autor })
            }
          }
        }

        //Criando o array trabalhos_backup para utilizar como default
        //Object.assign(this.trabalhos_backup, this.trabalhos)

        console.log("array trabalhos depois de adicoinar autores")
        console.log(this.trabalhos)

      })
      .catch((error) => {
          console.log(error);
      })

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
      })
            
    },

    methods: {
       //customFilter(items, search, filter, headers) {

        // var autors = []
        // if(items){
        //   for(let i=0; i < items.length; i++){
        //     for(let j=0; j < items[i].autores.length; j++){
        //       //if (this.trabalhos[i].trabalho_id == this.trabalhos_autores[j].trabalho_id)
        //         autors.push(items[i].autores[j].autor)
        //         //console.log(autors)
        //       }
        //       items[i].autores = autors.join(', ')

        //   }
        // }

      //   console.log('items convertidos')
      //   console.log(items)
      //   //console.log(autors)

      //   // search = search.toString().toLowerCase()
      //   // if (search.trim() === '') return items

      //   // const props = headers.map(h => h.value)

      //   // return items.filter(item => props.some(prop => filter(getObjectValueByPath(item, prop, item[prop]), search)))
      //   //   type: Function,

      //   console.log(items)

      //   search = search.toString().toLowerCase()
      //   return items.filter(i => (
      //     Object.keys(i).some(j => filter(i[j], search))
      //   ))
      
      // },

      adicionarAutor:  function () {
        //this.editedItem.autores.push({ value: '' });
        this.editedAutores.push({ value: '' });
        //console.log(this.editedItem.autores.length)
        //console.log(this.editedItem.autores)
        console.log(this.editedAutores)
      },
      removerAutor: function () {
        if(this.editedAutores.length > 1){
          //if(this.editedItem.autores[this.editedItem.autores.length - 1].autor == '')
            //this.editedItem.autores.pop();
            this.editedAutores.pop();
            console.log(this.editedAutores)
          //else 
          //  alert('Necessário deletar os valores do campo autor')
        } else 
            alert('Necesssário pelo menos um autor')
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
        this.editedIndex = this.trabalhos.indexOf(item)
        this.editedItem = Object.assign({}, item)

        for(let i=0; i < this.trabalhos.length; i++)
           this.editedAutores = Object.assign([], this.editedItem.autores)

        console.log('editAutor')
        console.log(this.editedAutores)
        this.dialog = true
      },

      deleteItem (item) {
        //Setando algumas variaveis para uso do delete
        const index = this.trabalhos.indexOf(item)

        // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
        confirm('Está certo que deseja deletar este item?') &&
        axios_instance({
            method: 'delete',
            url: '/trabalho/'+ item.trabalho_id +'',
          })
          .then(response => {
            this.trabalhos.splice(index, 1)
          })
          .catch((error) => {
            console.log("error: ")
            console.log(error)
            alert(JSON.stringify(error))
            //alert(error.response.data)
          })
      },

      close () {
        //console.log(this.editedIndex)
        //this.trabalhos[this.editedIndex].autores = Object.assign({}, this.trabalhos_backup[this.editedIndex].autores)
        //this.trabalhos[this.editedIndex].autores = this.trabalhos_backup[this.editedIndex].autores
        //console.log(this.trabalhos[this.editedIndex].autores)
        //console.log(this.trabalhos_backup[this.editedIndex].autores)
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
        //this.trabalhos.autores[this.editedIndex] = this.trabalhos_backup[this.editedIndex].autores

      },

      save () {
        if (this.editedIndex > -1) { // EDICAO EDICAO EDICAO  Se this.editedIndex  > -1 entao estamos na edição
          //Editando item chama-se o metodo put na rota trabalho e irá para update
          axios_instance({
            method: 'put',
            url: '/trabalho/' + this.editedItem.trabalho_id + '',
            data: {
              id: this.editedItem.id,
              trabalho_id: this.editedItem.trabalho_id,
              nome: this.editedItem.nome,
              autores: this.editedAutores,
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
            this.editedItem.autores = Object.assign([], this.editedAutores)
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

        } else { // INSERT INSERT Se this.editedIndex  == -1 entao estamos na inserção de um novo trabalho
          axios_instance({
            method: 'post',
            url: '/trabalho',
            data: {
              //newtrabalho: JSON.stringify(this.editedItem)
              //trabalho: this.editedItem
              id: this.editedItem.id,
              trabalho_id: this.editedItem.trabalho_id,
              nome: this.editedItem.nome,
              autores: this.editedAutores,
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
            //alert('Inclusão de autores feita com sucesso');
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
