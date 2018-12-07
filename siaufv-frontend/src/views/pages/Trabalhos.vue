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
                  <v-flex v-for="(autors, index) in paraSeremEditadosAutores" :key="index" xs12 sm6 md9 >
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
      :custom-filter="customFilter"
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
      paraSeremEditadosAutores: [{id: '', trabalho_id: '', autor: ''}],
      paraSeremDeletadosAutores:[],
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
        if(this.editedIndex === -1 ){ 
          this.paraSeremEditadosAutores = [{id: '', trabalho_id: '', autor: ''}]
          this.paraSeremDeletadosAutores = []
        }
        console.log(this.editedIndex)
        //this.paraSeremEditadosAutores = []
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

      //Pegando todos trabalhos... Importa ARRAY TRABALHO do
      this.getAxiosArrayTrabalhos()

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
      getAxiosArrayTrabalhos() {
              axios_instance({
          method:'get',
          url: '/trabalho'
       })
      .then(response => {
        // Pegando os trabalhos e os autores desses trabalhos
        this.trabalhos = response.data.trabalhos
        this.trabalhos_autores = response.data.trabalhos_autores
        // Zerando array trabalhos[].autores
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

        //console.log("Array trabalhos depois do AXIOS GET")
        //console.log(this.trabalhos)
        })
        .catch((error) => {
            console.log(error);
        })
      },

       customFilter(items, search, filter, headers) {
        // console.log(search)
        

        //search = search.toString().toLowerCase()
        console.log(search)

        if (!search) 
          return items
        /////////////////////////////////////////////

        //console.log("OBJECT KEEEEEEEEEEEYS")
        //console.log(Object.entries(items))


        
        // return Object.keys(items).some( verif => (k,v) (
        //   console.log(verif)
        // ))


        // for (var [key, value] of Object.entries(items)) {
        //     console.log(key + ' ' + JSON.stringify(value)); // "a 5", "b 7", "c 9"
        // }
        ///////////////////////////////////////////

        // var ositemsquesaoretornados = items.filter(i => (
        //   Object.keys(i).some(j => filter(i[j], search))
        // ))
        // console.log("KKKKKKKKKKKKKKKKKKKKK KEEEEEEEEEEEYS", ositemsquesaoretornados )
        // return ositemsquesaoretornados



        // function fil(valor) {
        //   console.log(valor)
        //   return valor>=2
        // }

        // function dididi(item) {
        //   if (item.ano == 2018) 
        //     return item
        //   else return false
        // }
        const props = headers.map(h => h.value)
        console.log(props)


        return items.filter((itemdoitemporitem) => {
          //console.log(JSON.stringify(itemano))
          if (search.includes(itemdoitemporitem.trabalho_id)) 
            return itemdoitemporitem
          if (search.includes(itemdoitemporitem.ano)) 
            return itemdoitemporitem
          if (search.includes(itemdoitemporitem.nome)) 
            return itemdoitemporitem
          if (search.includes(itemdoitemporitem.orientador)) 
            return itemdoitemporitem
          if (search.includes(itemdoitemporitem.area)) 
            return itemdoitemporitem
          else 
            return false
       })



        // return items.filter(dididi)

        // const filtered = Object.keys(items).filter(fil)
        // console.log(filtered)





        // return filtered

        // // const filtered = Object.keys(items).filter(retorna => (
        // //   if (items.indexOf > 1)
        // //     return 
        // // ))
        // //           items.filter(i => (
        // //   //console.log(i),
        // //   Object.keys(i).some(j => filter(i[j], search))
        // // ))


        // console.log("filteredddddddddddddddddddd")
        // console.log(filtered)
        // return filtered



        // // Filtro Waltim
        // return items.filter(item  => {
        //     return Object.entries(item).some(([key,value]) => {
        //       if(value != null || value != undefined) {
        //         if(typeof value === 'object'){
        //           return value.some(autor => {
        //             return search.includes(autor.autor)
        //           })
        //         }
        //         console.log("QUALUQR COISAUASHpl")
        //         return search.includes(value)
        //       }
        //     })
        //   }
        // )

        // //PEguei da net
        return items.filter(i => (
          Object.keys(i).some(j => filter(i[j], search))
        ))
      
      },

      adicionarAutor:  function () {
        //this.editedItem.autores.push({ value: '' });
        this.paraSeremEditadosAutores.push({id: '', trabalho_id: '', autor: ''});
        //console.log(this.editedItem.autores.length)
        //console.log(this.editedItem.autores)
        //console.log(this.paraSeremEditadosAutores)
      },
      removerAutor: function () {
        if(this.paraSeremEditadosAutores.length > 1){
          //if(this.editedItem.autores[this.editedItem.autores.length - 1].autor == '')
            //this.editedItem.autores.pop();
            const pop = this.paraSeremEditadosAutores.pop();
            if(pop.id)
              this.paraSeremDeletadosAutores.push(pop)

            console.log(this.paraSeremDeletadosAutores)
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
           this.paraSeremEditadosAutores = Object.assign([], this.editedItem.autores)

        //console.log('editAutor')
        //console.log(this.paraSeremEditadosAutores)
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
            //Nao precisa dar o splice pq o getAxiosArrayTrabalhos atualiza pra gente
            //this.trabalhos.splice(index, 1)
          })
          .catch((error) => {
            console.log("error: ")
            console.log(error)
            alert(JSON.stringify(error))
            //alert(error.response.data)
          })
          this.getAxiosArrayTrabalhos()
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
        //EDICAO
        if (this.editedIndex > -1) { // EDICAO EDICAO EDICAO  Se this.editedIndex  > -1 entao estamos na edição
          //Editando item chama-se o metodo put na rota trabalho e irá para update
          axios_instance({
            method: 'put',
            url: '/trabalho/' + this.editedItem.trabalho_id + '',
            data: {
              id: this.editedItem.id,
              trabalho_id: this.editedItem.trabalho_id,
              nome: this.editedItem.nome,
              autores: this.paraSeremEditadosAutores,
              deletedAutores: this.paraSeremDeletadosAutores,
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
            //this.editedItem.autores = Object.assign([], this.paraSeremEditadosAutores)
            //Object.assign(this.trabalhos[this.editedIndex], this.editedItem)
            this.getAxiosArrayTrabalhos()
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
        // INSERT
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
              autores: this.paraSeremEditadosAutores,
              orientador: this.editedItem.orientador,
              modalidade: this.editedItem.modalidade,
              area: this.editedItem.area,
              ano: this.editedItem.ano,
            }
          })
          .then(response => {
            //Inclui o item no array de item do front end
            alert('Trabalho adicionado.');
            //this.trabalhos.push(this.editedItem)
            this.getAxiosArrayTrabalhos()
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
        // Importando novamente o array trabalho depois do save
        
      }
    }
  }
</script>

<style>
.mytable .v-table tbody tr:not(:last-child) {
    border-bottom: none;
}
</style>
