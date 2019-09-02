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
      </v-toolbar>
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
          <td class="text-xs-left">{{ props.item.trabalho_id }}</td>
          <td class="text-xs-left">{{ props.item.nome }}</td>

          <!-- AUTOR -->
          <td class="text-xs-left">
            <span v-for="(autor, index) in props.item.autores" :key="index">{{ autor.autor }}</span>
          </td>
          <!-- AUTOR -->
          <td class="text-xs-left">{{ props.item.orientador }}</td>
          <td class="text-xs-left">{{ props.item.modalidade }}</td>
          <td class="text-xs-left">{{ props.item.instituto }}</td>
          <td class="text-xs-left">{{ props.item.area }}</td>
          <td class="text-xs-left">{{ props.item.ano }}</td>
          <td class="text-xs-left">
            <span
              style="color: blue"
              v-for="(sessao, index) in props.item.sessao"
              :key="index"
            >{{ sessao.instituto }} {{ sessao.nome }}</span>
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

export default {
  data: () => ({
    dialog: false,
    search: '',
    headers: [
      { text: 'ID', value: 'trabalho_id' },
      { text: 'Nome', value: 'nome' },
      { text: 'Autor(es)', value: 'autores' },
      { text: 'orientador', value: 'orientador' },
      { text: 'Modalidade', value: 'modalidade' },
      { text: 'Instituto', value: 'instituto' },
      { text: 'Área', value: 'area' },
      { text: 'Ano', value: 'ano' },
      { text: 'Sessão', value: 'sessao' }
    ],
    trabalhos: [],
    rowsPerPageItems: [10, 20, 50, 100],
    pagination: {
      rowsPerPage: 10
    }
  }),

  created() {
    document.title = 'SIA - Trabalhos'
    //Mudando o locale do Vuetify
    this.changeLocale()
    //Pegando todos trabalhos... Importa ARRAY TRABALHO do
    this.getAxiosArrayTrabalhos()
  },

  methods: {
    // Pega todos trabalhos
    getAxiosArrayTrabalhos() {
      this.$axios({
        method: 'get',
        url: '/trabalho'
      })
        .then(response => {
          // Pegando os trabalhos e os autores desses trabalhos
          this.trabalhos = response.data //.trabalhos;
          //console.log('TRABALHOS: ', this.trabalhos)
        })
        .catch(error => {
          console.log(error)
        })
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
        if (helpers.normaliza(item.area).includes(search)) return item
        for (var item of item.sessao)
          if (helpers.normaliza(item.nome).includes(search)) return item
      })
    },

    changeLocale() {
      this.$vuetify.lang.current = 'pt'
    }
  }
}
</script>

<style>
.mytable .v-table tbody tr:not(:last-child) {
  border-bottom: none;
}
</style>
