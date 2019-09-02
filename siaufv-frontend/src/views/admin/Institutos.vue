<template>
  <div class="animated fadeIn">

      
 <div v-if="submitted && errors.has('defaulterror2')" style="color: red" class="container">{{ errors.first('defaulterror2') }}</div>
<!-- Data Table -->
<div data-app="true">
    <v-toolbar flat color="white">
      <i class="icon-calendar"></i> <strong> Institutos</strong>
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
        <v-btn slot="activator" class="primary" color="green">Novo Instituto</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12 sm6 md4>
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
      :items="institutos"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">

        <td class="text-xs-center"><b><h3>{{ props.item.instituto }}</h3></b></td>
        <td class="justify-center layout px-0"><h3>
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
          </v-icon></h3>
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

export default {
    data: () => ({
      submitted: false,
      dialog: false,
      search: '',
      headers: [
        { text: 'Instituto', value: 'instituto' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      institutos: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        instituto: '',
      },
      defaultItem: {
        id: '',
        instituto: '',
      },
      rowsPerPageItems: [10, 20, 50, 100],
      pagination: {
          rowsPerPage: 10
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Instituto' : 'Editar Instituto'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
        //console.log(this.errors)
        this.errors.clear() //Limpar os erros
      }
    },

    created () {
      //console.log(this.$store)
      // console.log('sessionStorage.getItem: ',sessionStorage.getItem('user'))
      // console.log(this.$axios.defaults.headers.common['Authorization'] )


      document.title = "SIA - Institutos"
      //Pegando todos Institutos 
      this.getAxiosArrayInstitutos()
      //Mudando o locale do Vuetify
      this.changeLocale () 
    },

    //methods
    methods: {

      getAxiosArrayInstitutos() {
        this.$axios({
            method:'get',
            url: '/instituto/',
        })
        .then(response => {
          //console.log("response . data  institutos")
          this.institutos = response.data
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
        //console.log(this.institutos.indexOf(item))
        this.editedIndex = this.institutos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        //console.log("editedIndex  -  editedItem")
        //console.log(this.editedIndex)
        //console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        //Setando algumas variaveis para uso do delete
        const index = this.institutos.indexOf(item)

        // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
        console.log('Oi')
        confirm('Está certo que deseja deletar este item?') &&
        // axios.post(process.env.VUE_APP_API_URL + ':' + process.env.VUE_APP_API_PORT + '/register', {
        //   name: this.name,
        //   email: this.email,
        //   password: this.password,
        //   confirm_password: this.confirm_password
        // })        
        this.$axios({
            method: 'delete',
            url: '/instituto/' + item.id +'',
          })
          .then(response => {
            this.getAxiosArrayInstitutos()
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
          //Editando item chama-se o metodo put na rota instituto e irá para update
          this.$axios({
            method: 'put',
            url: '/instituto/' + this.editedItem.id +'',
            data: {
              instituto: this.editedItem.instituto,
            }
          })
          .then(response => {
            alert('Instituto editado.');
            this.getAxiosArrayInstitutos()
            this.close()
          })
          .catch((error) => {
            this.errors.clear() //Limpar os erros antes de setar novos erros
            if(error.response.data.error[0].message)
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error[0].message })
            else
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error.message })
            //confirm('Algum erro erro ocorreu.')
          })

        } else { // Se this.editedIndex  == -1 entao estamos na inserção
          this.$axios({
            method: 'post',
            url:  '/instituto/',
            data: {
              instituto: this.editedItem.instituto,
            }
          })                       
          .then(response => {
            //Inclui o item no array de item do front end
            alert('Instituto adicionado.');
            this.getAxiosArrayInstitutos()
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
