<template>
  <div class="animated fadeIn">
    <b-card header-tag="header">
      <div slot="header">
        <i class="icon-people"></i> Avaliadores
      </div>
      <b-card-body>
        <b-row>
            {{ avaliadores }}
        </b-row>
      </b-card-body>
    </b-card>
   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Avaliador',
  data() {
      return{
          avaliadores: []
      }
  },
  created() {
    axios({
        method:'get',
        url:'http://127.0.0.1:3333/avaliador'
    })
    .then(response => {
      console.log("response . data  avaliadores")
         
        let x = response.data[0]
        console.log(x)
        console.log(typeof x)

        this.avaliadores = response.data
    })
    .catch((error) => {
        console.log(error);
    });
  }
}
</script>
