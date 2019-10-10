<template>
  <div class="animated fadeIn">
    <!-- Data Table -->
    <div data-app="true">
      <v-toolbar flat color="white">
        <i class="icon-calendar"></i>
        <strong>Anos</strong>
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
        :items="anos"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        :search="search"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">
            <b>
              <h3>{{ props.item.ano }}</h3>
            </b>
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
import http_api from '@/http/api'

export default {
  data: () => ({
    search: '',
    headers: [{ text: 'Ano', value: 'ano' }],
    anos: [],
    rowsPerPageItems: [10, 20, 50, 100],
    pagination: {
      rowsPerPage: 10
    }
  }),

  created() {
    document.title = 'SIA - Anos'
    //Pegando todos anos
    this.getAxiosArrayAnos()
    //Mudando o locale do Vuetify
    this.changeLocale()
  },

  //methods
  methods: {
    getAxiosArrayAnos() {
      http_api({
        method: 'get',
        url: '/ano'
      })
        .then(response => {
          //console.log("response . data  anos")
          this.anos = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    changeLocale() {
      this.$vuetify.lang.current = 'pt'
    }
  }
}
</script>
