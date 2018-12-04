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
                </v-flex></br>
                <v-flex xs12 sm6 md3>
                  <v-select :items="anos" outline v-model="editedItem.ano" label="Ano"  data-vv-name="ano" v-validate="'required|integer'" :class="{ 'is-invalid': submitted && errors.has('ano') }"></v-select>
                  <div v-if="submitted && errors.has('ano')" style="color: red">{{ errors.first('ano') }}</div>
                </v-flex>
                <div v-if="submitted && errors.has('defaulterror')" style="color: red" class="container">{{ errors.first('defaulterror') }}</div>
                
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" color="blue" @click="close">Cancelar</v-btn>
            <v-btn class="primary" color="blue" @click="handleSubmit">Salvar</v-btn>
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
        { text: 'Matrícula', value: 'matricula' },
        { text: 'Nome', value: 'nome' },
        { text: 'Curso', value: 'curso' },
        { text: 'instituto', value: 'instituto' },
        { text: 'E-mail', value: 'email' },
        { text: 'Ano', value: 'ano' },
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
        return this.editedIndex === -1 ? 'Novo Avaliador' : 'Editar Avaliador'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
        console.log(this.errors)
        this.errors.clear() //Limpar os erros
      }
    },

    created () {
      //Mudando o locale do Vuetify
      this.changeLocale () 

      //Pegando todos avaliadores 
      axios_instance({
          method:'get',
          url: '/avaliador'
       })
      .then(response => {
        //console.log("response . data  avaliadores")
        this.avaliadores = response.data
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
        //console.log(this.avaliadores.indexOf(item))
        this.editedIndex = this.avaliadores.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log("editedIndex  -  editedItem")
        console.log(this.editedIndex)
        console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        //Setando algumas variaveis para uso do delete
        const index = this.avaliadores.indexOf(item)

        // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
        confirm('Está certo que deseja deletar este item?') &&
        axios_instance({
            method: 'delete',
            url: '/avaliador/'+ item.id +'',
          })
          .then(response => {
            this.avaliadores.splice(index, 1)
          })
          .catch((error) => {
            console.log("error: ")
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
          //Editando item chama-se o metodo put na rota avaliador e irá para update
          axios_instance({
            method: 'put',
            url: '/avaliador/'+ this.editedItem.id +'',
            data: {
              //newavaliador: JSON.stringify(this.editedItem)
              //avaliador: this.editedItem
              id: this.editedItem.id,
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
            alert('Avaliador editado.');
            Object.assign(this.avaliadores[this.editedIndex], this.editedItem)
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
            url: '/avaliador',
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
            //Inclui o item no array de item do front end
            alert('Avaliador adicionado.');
            this.avaliadores.push(this.editedItem)
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
