<template>
  <div class="animated fadeIn">
    <!-- Data Table -->
    <div data-app="true">
      <v-toolbar flat color="white">
        <i class="icon-people"></i>
        <strong>Avaliadores</strong>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Procurar"
          single-line
          hide-details
        ></v-text-field>
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
          <td v-if="props.item.ativo === 1" class="text-xs-left" style="color: green">
            <b>Ativo</b>
          </td>
          <td v-else class="text-xs-right"></td>
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
import http_api from '@/http/api'
const helpers = require('../../helpers')

export default {
  data: () => ({
    search: '',
    headers: [
      { text: 'Matrícula', value: 'matricula' },
      { text: 'Nome', value: 'nome' },
      { text: 'Curso', value: 'curso' },
      { text: 'instituto', value: 'instituto' },
      { text: 'E-mail', value: 'email' },
      { text: 'Ativo', value: 'ativo' }
    ],
    avaliadores: [],
    rowsPerPageItems: [10, 20, 50, 100],
    pagination: {
      rowsPerPage: 10
    }
  }),

  created() {
    document.title = 'SIA - Avaliadores'
    //Mudando o locale do Vuetify
    this.changeLocale()
    //Pegando todos avaliadores
    this.getAxiosArrayAvaliadores()
  },

  //methods
  methods: {
    getAxiosArrayAvaliadores() {
      //Pegando todos avaliadores
      http_api({
        method: 'get',
        url: '/avaliador'
      })
        .then(response => {
          this.avaliadores = response.data
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
        if (helpers.normaliza(item.matricula).includes(search)) return item
        if (helpers.normaliza(item.nome).includes(search)) return item
        if (helpers.normaliza(item.curso).includes(search)) return item
        if (helpers.normaliza(item.instituto).includes(search)) return item
        if (helpers.normaliza(item.email).includes(search)) return item
        if (search.includes('ativo') && item.ativo !== null) return item
      })
    },

    changeLocale() {
      this.$vuetify.lang.current = 'pt'
    }
  }
}
</script>
