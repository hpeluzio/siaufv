<template>
  <div class="animated fadeIn">
    <b-card header-tag="header">
      <div slot="header">
        <i class="icon-calendar"></i> Anos
      </div>
      <b-card-body>
        <b-row>
            {{ anos }}
        </b-row>
      </b-card-body>
    </b-card>
   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ano',
  data() {
      return{
          anos: [],
          user: ''
      }
  },
  created() {

    if(sessionStorage.getItem('user')){ 
      this.user = JSON.parse(sessionStorage.getItem('user')) 
    }

    axios({
        method:'get',
        url:'http://127.0.0.1:3333/ano',
        headers: {
          'Authorization': 'Bearer ' + this.user.tokenData.token
        }
    })
    .then(response => {
      console.log("response . data  ano")
        
        
        let x = response.data[0]
        console.log(x)
        console.log(typeof x)

        this.anos = response.data
    })
    .catch((error) => {
        console.log(error);
    });
  }
}
</script>
