<template>
  <div class="animated fadeIn">
    <!-- Data Table -->
    <div data-app="true">
      <v-toolbar flat color="white">
        <i class="icon-pencil"></i>
        <strong>Trabalhos</strong>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Procurar" hide-details></v-text-field>

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
                    <v-text-field
                      outline
                      v-model="editedItem.trabalho_id"
                      label="Trabalho ID"
                      data-vv-name="trabalho_id"
                      v-validate="'required'"
                      :class="{ 'is-invalid': submitted && errors.has('trabalho_id') }"
                    ></v-text-field>
                    <div
                      v-if="submitted && errors.has('trabalho_id')"
                      style="color: red"
                    >{{ errors.first('trabalho_id') }}</div>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      outline
                      v-model="editedItem.nome"
                      label="Nome"
                      data-vv-name="nome"
                      v-validate="'required'"
                      :class="{ 'is-invalid': submitted && errors.has('nome') }"
                    ></v-text-field>
                    <div
                      v-if="submitted && errors.has('nome')"
                      style="color: red"
                    >{{ errors.first('nome') }}</div>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-select
                      :items="anos"
                      item-value="id"
                      item-text="ano"
                      outline
                      v-model="editedItem.ano_id"
                      label="Ano"
                      data-vv-name="ano"
                      v-validate="'required|integer'"
                      :class="{ 'is-invalid': submitted && errors.has('ano') }"
                    ></v-select>
                    <div
                      v-if="submitted && errors.has('ano')"
                      style="color: red"
                    >{{ errors.first('ano') }}</div>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      outline
                      v-model="editedItem.orientador"
                      label="Orientador"
                      data-vv-name="orientador"
                      v-validate="'required'"
                      :class="{ 'is-invalid': submitted && errors.has('orientador') }"
                    ></v-text-field>
                    <div
                      v-if="submitted && errors.has('orientador')"
                      style="color: red"
                    >{{ errors.first('orientador') }}</div>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      outline
                      v-model="editedItem.area"
                      label="Área"
                      data-vv-name="area"
                      v-validate="'required'"
                      :class="{ 'is-invalid': submitted && errors.has('area') }"
                    ></v-text-field>
                    <div
                      v-if="submitted && errors.has('area')"
                      style="color: red"
                    >{{ errors.first('area') }}</div>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      outline
                      v-model="editedItem.modalidade"
                      label="Modalidade"
                      data-vv-name="modalidade"
                      v-validate="'required'"
                      :class="{ 'is-invalid': submitted && errors.has('modalidade') }"
                    ></v-text-field>
                    <div
                      v-if="submitted && errors.has('modalidade')"
                      style="color: red"
                    >{{ errors.first('modalidade') }}</div>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="institutos"
                      item-value="instituto"
                      item-text="instituto"
                      outline
                      v-model="editedItem.instituto"
                      label="Instituto"
                      data-vv-name="instituto"
                      v-validate="'required'"
                      :class="{ 'is-invalid': submitted && errors.has('instituto') }"
                    ></v-select>
                    <div
                      v-if="submitted && errors.has('instituto')"
                      style="color: red"
                    >{{ errors.first('instituto') }}</div>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="tipos"
                      item-value="tipo"
                      item-text="tipo"
                      outline
                      v-model="editedItem.tipo"
                      label="Tipo"
                      data-vv-name="tipo"
                      v-validate="'required'"
                      :class="{ 'is-invalid': submitted && errors.has('tipo') }"
                    ></v-select>
                    <div
                      v-if="submitted && errors.has('tipo')"
                      style="color: red"
                    >{{ errors.first('tipo') }}</div>
                  </v-flex>

                  <!--<v-flex xs12 sm6 md9>
                  <v-text-field outline v-model="editedItem.autores" label="Autores" data-vv-name="autores" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('autores') }"></v-text-field >
                  <div v-if="submitted && errors.has('autores')" style="color: red">{{ errors.first('autores') }}</div>
                  </v-flex>-->
                  <!-- Multiple input text for autor-->
                  <v-flex
                    v-for="(autors, index) in paraSeremEditadosAutores"
                    :key="index"
                    xs12
                    sm6
                    md9
                  >
                    <v-text-field
                      outline
                      v-model="autors.autor"
                      label="Autor"
                      data-vv-name="autores"
                      v-validate="'required'"
                      :class="{ 'is-invalid': submitted && errors.has('autores') }"
                    ></v-text-field>
                    <div
                      v-if="submitted && errors.has('autores')"
                      style="color: red"
                    >{{ errors.first('autores') }}</div>
                  </v-flex>
                  <!-- Multiple input text for autor-->
                  <!-- Errors-->
                  <div
                    v-if="submitted && errors.has('defaulterror')"
                    style="color: red"
                    class="container"
                  >{{ errors.first('defaulterror') }}</div>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="removerAutor()" slot="activator" class="primary" color="red">- Autor</v-btn>
              <v-btn
                @click="adicionarAutor()"
                slot="activator"
                class="primary"
                color="green"
              >+ Autor</v-btn>

              <v-spacer></v-spacer>
              <v-btn class="primary" color="orange" @click="close">Cancelar</v-btn>
              <v-btn class="primary" color="blue" @click="handleSubmit">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <!-- Data Table -->
      <!-- Data Table -->
      <!-- Data Table -->
      <!-- :custom-filter="customFilter" -->
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
          <td class="text-xs-left">{{ props.item.trabalho_id }}</td>
          <td class="text-xs-left">{{ props.item.nome }}</td>

          <!-- AUTOR -->
          <td class="text-xs-left">
            <p v-for="(autor, index) in props.item.autores" :key="index">{{ autor.autor }}</p>
          </td>
          <!-- AUTOR -->
          <td class="text-xs-left">{{ props.item.orientador }}</td>
          <td class="text-xs-left">{{ props.item.modalidade }}</td>
          <td class="text-xs-left">{{ props.item.instituto }}</td>
          <td class="text-xs-left">{{ props.item.tipo }}</td>
          <td class="text-xs-left">{{ props.item.area }}</td>
          <td class="text-xs-left">{{ props.item.ano }}</td>
          <td class="text-xs-left">
            <span
              style="color: blue"
              v-for="(sessao, index) in props.item.sessao"
              :key="index"
            >{{ sessao.instituto }} {{ sessao.nome }}</span>
          </td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          <div style="color: red">
            Sua procura por
            <strong>"{{ search }}"</strong> não achou resultados.
          </div>
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
    sem_sessao: 'Sem sessão',
    anos: [],
    find: [],
    headers: [
      { text: 'ID', value: 'trabalho_id' },
      { text: 'Nome', value: 'nome' },
      { text: 'Autor(es)', value: 'autores' },
      { text: 'Orientador', value: 'orientador' },
      { text: 'Modalidade', value: 'modalidade' },
      { text: 'Instituto', value: 'instituto' },
      { text: 'Tipo', value: 'tipo' },
      { text: 'Área', value: 'area' },
      { text: 'Ano', value: 'ano' },
      { text: 'Sessão', value: 'sessao' },
      { text: 'Ações', value: 'name', sortable: false }
    ],
    trabalhos: [],
    trabalhos_autores: [],
    paraSeremEditadosAutores: [{ id: '', trabalho_id: '', autor: '' }],
    paraSeremDeletadosAutores: [],
    institutos: [],
    tipos: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      trabalho_id: '',
      nome: '',
      autores: [{ id: '', trabalho_id: '', autor: '' }],
      orientador: '',
      modalidade: '',
      instituto: '',
      tipo: [],
      area: '',
      ano_id: ''
    },
    defaultItem: {
      id: '',
      trabalho_id: '',
      nome: '',
      autores: [{ id: '', trabalho_id: '', autor: '' }],
      orientador: '',
      modalidade: '',
      instituto: '',
      tipo: [],
      area: '',
      ano_id: ''
    },
    rowsPerPageItems: [10, 20, 50, 100],
    pagination: {
      rowsPerPage: 10
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Trabalho' : 'Editar Trabalho'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
      this.errors.clear() //Limpar os erros
      if (this.editedIndex === -1) {
        this.paraSeremEditadosAutores = [{ id: '', trabalho_id: '', autor: '' }]
        this.paraSeremDeletadosAutores = []
      }
    }
  },

  created() {
    document.title = 'SIA - Trabalhos'
    //Mudando o locale do Vuetify
    this.changeLocale()
    //Pegando todos trabalhos... Importa ARRAY TRABALHO do
    this.getAxiosArrayTrabalhos()
    //Pegando todos os anos
    this.getAxiosArrayAnos()
    //Setando Institutos
    this.setArrayInstitutos()
    //Setando Institutos
    this.setArrayTipos()
  },

  // filters: {
  //   filtroTipo(tipo){
  //     if(tipo == '0')
  //       return 'Oral'
  //     else
  //       return 'Painel'
  //   }
  // },

  methods: {
    // Pega todos trabalhos
    getAxiosArrayTrabalhos() {
      this.$axios({
        method: 'get',
        url: '/trabalho'
      })
        .then(response => {
          // Pegando os trabalhos e os autores desses trabalhos
          this.trabalhos = response.data.map(trabalho => {
            if (trabalho.tipo == '0') {
              trabalho.tipo = 'Oral'
              return trabalho
            } else if (trabalho.tipo == '1') {
              trabalho.tipo = 'Painel'
              return trabalho
            }
          })
          console.log('TRABALHOS: ', this.trabalhos)
        })
        .catch(error => {
          console.log(error)
        })
    },

    getAxiosArrayAnos() {
      //Pegando todos os anos
      this.$axios({
        method: 'get',
        url: '/ano'
      })
        .then(response => {
          for (let i in response.data)
            this.anos.push({
              id: response.data[i].id,
              ano: response.data[i].ano
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

    setArrayInstitutos() {
      this.institutos = [
        { instituto: 'IAP' },
        { instituto: 'IBP' },
        { instituto: 'IEP' },
        { instituto: 'IHP' }
      ]
    },

    setArrayTipos() {
      this.tipos.push(
        { id: '', tipo: '' },
        { id: 0, tipo: 'Oral' },
        { id: 1, tipo: 'Painel' }
      )
    },

    //Custom filter da datatable
    customFilter(items, search, filter, headers) {
      //Normalizando a search
      if (search.trim() === '') return items
      search = helpers.normaliza(search).trim()

      return items.filter(item => {
        if (helpers.normaliza(item.trabalho_id).includes(search)) return item
        if (helpers.normaliza(item.ano).includes(search)) return item
        if (helpers.normaliza(item.nome).includes(search)) return item
        for (var autors of item.autores)
          if (helpers.normaliza(autors.autor).includes(search)) return item
        if (helpers.normaliza(item.orientador).includes(search)) return item
        if (helpers.normaliza(item.modalidade).includes(search)) return item
        if (helpers.normaliza(item.instituto).includes(search)) return item
        if (helpers.normaliza(item.tipo).includes(search)) return item
        if (helpers.normaliza(item.area).includes(search)) return item
        for (var item of item.sessao)
          if (helpers.normaliza(item.nome).includes(search)) return item
      })
    },

    adicionarAutor: function() {
      this.paraSeremEditadosAutores.push({
        id: '',
        trabalho_id: '',
        autor: ''
      })
    },

    removerAutor: function() {
      if (this.paraSeremEditadosAutores.length > 1) {
        const pop = this.paraSeremEditadosAutores.pop()
        if (pop.id) {
          this.paraSeremDeletadosAutores.push(pop)
        }
      } else alert('Necesssário pelo menos um autor')
    },

    //Checar o formulário em busca de erros
    handleSubmit(e) {
      this.submitted = true
      this.$validator.validate().then(valid => {
        if (valid) {
          this.save()
          //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
        }
      })
    },

    changeLocale() {
      this.$vuetify.lang.current = 'pt'
    },

    editItem(item) {
      this.editedIndex = this.trabalhos.indexOf(item)
      this.editedItem = Object.assign({}, item)

      for (let i = 0; i < this.trabalhos.length; i++)
        this.paraSeremEditadosAutores = Object.assign(
          [],
          this.editedItem.autores
        )

      this.dialog = true
    },

    deleteItem(item) {
      //Setando algumas variaveis para uso do delete
      const index = this.trabalhos.indexOf(item)

      // Confirmando && enviando o ... as duas linhas abaixo estão atreladas
      confirm('Está certo que deseja deletar este item?') &&
        this.$axios({
          method: 'delete',
          url: '/trabalho/' + item.id + ''
        })
          .then(response => {
            //Nao precisa dar o splice pq o getAxiosArrayTrabalhos atualiza pra gente
            //this.trabalhos.splice(index, 1)
            this.getAxiosArrayTrabalhos()
          })
          .catch(error => {
            console.log(error)
            alert(JSON.stringify(error))
            //alert(error.response.data)
          })
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
      this.search = ''
      this.getAxiosArrayTrabalhos()
    },

    save() {
      //EDICAO
      if (this.editedIndex > -1) {
        // EDICAO EDICAO EDICAO  Se this.editedIndex  > -1 entao estamos na edição
        //Editando item chama-se o metodo put na rota trabalho e irá para update
        if (this.editedItem.tipo == 'Oral') 
          this.editedItem.tipo = 0
        else if (this.editedItem.tipo == 'Painel') 
          this.editedItem.tipo = 1

        this.$axios({
          method: 'put',
          url: '/trabalho/' + this.editedItem.id + '',
          data: {
            id: this.editedItem.id,
            trabalho_id: this.editedItem.trabalho_id,
            nome: this.editedItem.nome,
            autores: this.paraSeremEditadosAutores,
            deletedAutores: this.paraSeremDeletadosAutores,
            orientador: this.editedItem.orientador,
            modalidade: this.editedItem.modalidade,
            instituto: this.editedItem.instituto,
            tipo: this.editedItem.tipo,
            area: this.editedItem.area,
            ano_id: this.editedItem.ano_id
          }
        })
          .then(response => {
            alert('Trabalho editado.')
            this.close()
          })
          .catch(error => {
            console.log(error)

            this.errors.clear()
            if (error.response.data[0].message)
              this.errors.add({
                field: 'defaulterror',
                msg: error.response.data[0].message
              })
            else
              this.errors.add({
                field: 'defaulterror',
                msg: error.response.data.message
              })
          })
        // INSERT
      } else {
        // INSERT INSERT Se this.editedIndex  == -1 entao estamos na inserção de um novo trabalho
        if (this.editedItem.tipo == 'Oral') 
          this.editedItem.tipo = 0
        else if (this.editedItem.tipo == 'Painel') 
          this.editedItem.tipo = 1

        this.$axios({
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
            instituto: this.editedItem.instituto,
            tipo: this.editedItem.tipo,
            area: this.editedItem.area,
            ano_id: this.editedItem.ano_id
          }
        })
          .then(response => {
            //Inclui o item no array de item do front end
            alert('Trabalho adicionado.')
            this.close()
          })
          .catch(error => {
            console.log(error.response)

            this.errors.clear()
            if (error.response.data[0].message)
              this.errors.add({
                field: 'defaulterror',
                msg: error.response.data[0].message
              })
            else
              this.errors.add({
                field: 'defaulterror',
                msg: error.response.data.message
              })
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
