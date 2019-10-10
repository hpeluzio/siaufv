<template>
  <div class="animated fadeIn">

    <!-- Data Table -->
    <div data-app="true">
      <v-toolbar flat color="white">
        <i class="icon-calendar"></i>
        <strong>Salas</strong>
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
        :items="salas"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        :search="search"
        :custom-filter="customFilter"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.nome }}</td>
          <td class="text-xs-left">{{ props.item.descricao }}</td>
          <td class="text-xs-left">{{ props.item.capacidade }}</td>
          <td v-if="props.item.tipo === 0" class="text-xs-left">Oral</td>
          <td v-if="props.item.tipo === 1" class="text-xs-left">Painel</td>
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
      { text: 'Nome', value: 'nome' },
      { text: 'Descrição', value: 'descricao' },
      { text: 'Capacidade', value: 'capacidade' },
      { text: 'Tipo', value: 'tipo' }
    ],
    salas: [],
    tipos: [],
    rowsPerPageItems: [10, 20, 50, 100],
    pagination: {
      rowsPerPage: 10
    }
  }),

  created() {
    document.title = 'SIA - Salas'
    //Pegando todos salas
    this.getAxiosArraySalas()
    //Pegando todos tipos
    this.setArrayTipos()
    //Mudando o locale do Vuetify
    this.changeLocale()
  },

  //methods
  methods: {
    getAxiosArraySalas() {
      http_api({
        method: 'get',
        url: '/sala'
      })
        .then(response => {
          //console.log("response . data  salas")
          this.salas = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    setArrayTipos() {
      this.tipos.push({ id: 0, tipo: 'Oral' }, { id: 1, tipo: 'Painel' })
    },
    //Custom filter da datatable
    customFilter(items, search, filter, headers) {
      //Normalizando a search
      if (search.trim() === '') return items
      search = helpers.normaliza(search).trim()

      return items.filter(item => {
        if (helpers.normaliza(item.nome).includes(search)) return item
        if (helpers.normaliza(item.descricao).includes(search)) return item
        if (helpers.normaliza(item.capacidade).includes(search)) return item
        if (search.includes('oral') && item.tipo === 0) return item
        if (search.includes('painel') && item.tipo === 1) return item
      })
    },

    changeLocale() {
      this.$vuetify.lang.current = 'pt'
    }
  }
}
</script>
