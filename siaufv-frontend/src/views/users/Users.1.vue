<template>
  <b-row>
    <b-col cols="12" xl="6">
      <transition name="slide">
      <b-card :header="caption">
        <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
          <template slot="id" slot-scope="data">
            <strong>{{data.item.id}}</strong>
          </template>
          <template slot="name" slot-scope="data">
            <strong>{{data.item.username}}</strong>
          </template>

          <template slot="name" slot-scope="data">
            <strong>{{data.item.email}}</strong>
          </template>

        </b-table>
        <nav>
          <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
      </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
import usersData from './UsersData'
import axios_instance from '../../axios'

export default {
  name: 'Users',
  props: {
    caption: {
      type: String,
      default: 'Usuários'
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      items: usersData.filter((user) => { return user }),
      //items: [],
      fields: [
        {key: 'id'},
        {key: 'username'},
        {key: 'email'},
        {key: 'created_at'},
        {key: 'updated_at'},
        // {key: 'role'},
        // {key: 'status'}
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0
    }
  },
  created() {
   
    axios_instance({
      method: "get",
      url: "/usuario"
    })
      .then(response => {
        // Pegando os trabalhos e os autores desses usuarios
        this.items = response.data //.usuarios;
        console.log('this.items: ', this.items)
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    },
    userLink (id) {
      return `users/${id.toString()}`
    },
    rowClicked (item) {
      const userLink = this.userLink(item.id)
      this.$router.push({path: userLink})
    }
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
