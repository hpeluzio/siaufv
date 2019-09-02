<template>
  <div class="animated fadeIn">

      
 <div v-if="submitted && errors.has('defaulterror2')" style="color: red" class="container">{{ errors.first('defaulterror2') }}</div>
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
      <v-dialog v-model="dialog" max-width="600px">
        <v-btn slot="activator" class="primary" color="green">Novo Avaliador</v-btn>
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
                <v-flex xs12 sm6 md3>
                  <v-text-field outline v-model="editedItem.matricula" label="Matrícula" data-vv-name="matricula" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('matricula') }"></v-text-field>
                  <div v-if="submitted && errors.has('matricula')" style="color: red">{{ errors.first('matricula') }}</div>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field outline v-model="editedItem.nome" label="Nome" data-vv-name="nome" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('nome') }"></v-text-field>
                  <div v-if="submitted && errors.has('nome')" style="color: red">{{ errors.first('nome') }}</div>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-text-field outline v-model="editedItem.instituto" label="Instituto" data-vv-name="instituto" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('instituto') }"></v-text-field>
                  <div v-if="submitted && errors.has('instituto')" style="color: red">{{ errors.first('instituto') }}</div>
                </v-flex>                
                <v-flex xs12 sm6 md4>
                  <v-text-field outline v-model="editedItem.curso" label="Curso" data-vv-name="curso" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('curso') }"></v-text-field>
                  <div v-if="submitted && errors.has('curso')" style="color: red">{{ errors.first('curso') }}</div>
                </v-flex>

                <v-flex xs12 sm6 md5>
                  <v-text-field outline v-model="editedItem.email" label="E-mail" data-vv-name="email" v-validate="'required|email'" :class="{ 'is-invalid': submitted && errors.has('email') }"></v-text-field>
                  <div v-if="submitted && errors.has('email')" style="color: red">{{ errors.first('email') }}</div>
                </v-flex>

                <v-flex xs12 sm6 md5>
                  <!-- <v-checkbox color="red" v-model="ativo" :label="`Avaliador ativo (Disponível)`"></v-checkbox> -->
                  <v-switch color="blue" v-model="editedItem.ativo" :label="`Avaliador ativo (Disponível)`"></v-switch>
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
      :items="avaliadores"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
      :custom-filter="customFilter"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <!--<td>{{ props.item.name }}</td>-->
        <!--<td class="text-xs-right">{{ props.item.id }}</td>-->
        <td class="text-xs-left">{{ props.item.matricula }}</td>
        <td class="text-xs-left">{{ props.item.nome }}</td>
        <td class="text-xs-left">{{ props.item.curso }}</td>
        <td class="text-xs-left">{{ props.item.instituto }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <!-- Ativo -->
          <td v-if="props.item.ativo === 1" class="text-xs-left" style="color: green"><b>Ativo</b></td>
          <td v-else class="text-xs-right">  </td>

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
          <v-icon
            small
            @click="ativarAvaliador(props.item)"
          >
            done_outline
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
const helpers = require('../../helpers')

export default {
    data: () => ({
      submitted: false,
      dialog: false,
      search: '',
      headers: [
        { text: 'Matrícula', value: 'matricula' },
        { text: 'Nome', value: 'nome' },
        { text: 'Curso', value: 'curso' },
        { text: 'instituto', value: 'instituto' },
        { text: 'E-mail', value: 'email' },
        { text: 'Ativo', value: 'ativo' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      avaliadores: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        matricula: '',
        nome: '',
        curso: '',
        instituto: '',
        email: '',
        ativo: false
      },
      defaultItem: {
        id: '',
        matricula: '',
        nome: '',
        curso: '',
        instituto: '',
        ativo: false
      
      },
      rowsPerPageItems: [10, 20, 50, 100],
      pagination: {
          rowsPerPage: 10
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Avaliador' : 'Editar Avaliador'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
        this.errors.clear() //Limpar os erros
      }
    },

    created () {
      document.title = "SIA - Avaliadores"
      //Mudando o locale do Vuetify
      this.changeLocale () 
      //Pegando todos avaliadores
      this.getAxiosArrayAvaliadores()
    },

    //methods
    methods: {
      getAxiosArrayAvaliadores() {
        //Pegando todos avaliadores 
        this.$axios({
            method:'get',
            url: '/avaliador'
        })
        .then(response => {
          this.avaliadores = response.data
        })
        .catch((error) => {
            console.log(error);
        });
      },

    //Custom filter da datatable
    customFilter(items, search, filter, headers) {
      //Normalizando a search
      if (search.trim() === "") return items;
      search = helpers.normaliza(search).trim();

      return items.filter(item => {
        if (helpers.normaliza(item.matricula).includes(search)) return item;
        if (helpers.normaliza(item.nome).includes(search)) return item;
        if (helpers.normaliza(item.curso).includes(search)) return item;
        if (helpers.normaliza(item.instituto).includes(search)) return item;
        if (helpers.normaliza(item.email).includes(search)) return item;
        if(search.includes('ativo') && item.ativo !== null)
          return item
      });
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
        this.editedIndex = this.avaliadores.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        //Setando algumas variaveis para uso do delete
        const index = this.avaliadores.indexOf(item)

        // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
        confirm('Está certo que deseja deletar este item?') &&
        this.$axios({
            method: 'delete',
            url: '/avaliador/'+ item.id +'',
          })
          .then(response => {
            //this.getAxiosArrayAvaliadores()
          })
          .catch((error) => {
            this.errors.add({ field: 'defaulterror2', msg: 'Erro ao deletar item' })
          })
          this.getAxiosArrayAvaliadores()
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
          //Editando item chama-se o metodo put na rota avaliador e irá para update
          this.$axios({
            method: 'put',
            url: '/avaliador/'+ this.editedItem.id +'',
            data: {
              id: this.editedItem.id,
              matricula: this.editedItem.matricula,
              nome: this.editedItem.nome,
              curso: this.editedItem.curso,
              instituto: this.editedItem.instituto,
              email: this.editedItem.email,
              ativo: this.editedItem.ativo
              }
          })
          .then(response => {
            alert('Avaliador editado.');
            this.getAxiosArrayAvaliadores()
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
          this.$axios({
            method: 'post',
            url: '/avaliador',
            data: {
              //newavaliador: JSON.stringify(this.editedItem)
              //avaliador: this.editedItem
              matricula: this.editedItem.matricula,
              nome: this.editedItem.nome,
              curso: this.editedItem.curso,
              instituto: this.editedItem.instituto,
              email: this.editedItem.email,
              ativo: this.editedItem.ativo,
            }
          })
          .then(response => {
            //Inclui o item no array de item do front end
            alert('Avaliador adicionado.');
            this.getAxiosArrayAvaliadores()
            this.close()
          })
          .catch((error) => {
            console.log(error)

            this.errors.clear()
            if(error.response.data.error[0].message)
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error[0].message })
            else
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error.message })
          })
        }
        
        //this.close()
      },
      ativarAvaliador (item) {
        //Setando algumas variaveis para uso
        var ativar = 1
        if(item.ativo === 1)
          ativar = 0

        //Ativando ou desativando o avaliador
        this.$axios({
          method: 'put',
          url: '/avaliador_ativar/'+ item.id +'',
          data: {
            ativo: ativar
          }
        })
        .then(response => {
          //alert('Avaliador ativado.')
          this.getAxiosArrayAvaliadores()
          this.close()
        })
        .catch((error) => {
          this.errors.clear() //Limpar os erros antes de setar novos erros
          if(error.response.data.error[0].message)
            this.errors.add({ field: 'defaulterror', msg: error.response.data.error[0].message })
          else
            this.errors.add({ field: 'defaulterror', msg: error.response.data.error.message })
        })
    }
    }
  }
</script>
