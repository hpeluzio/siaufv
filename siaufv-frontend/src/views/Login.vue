<template>
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>SIA<strong>UFV</strong></h1> 
                  <p class="text-muted">Entre com sua conta</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <!-- E-MAIL -->
                    <b-form-input type="email" 
                        v-model="email" v-validate="'required|email'" 
                        name="email" class="form-control" 
                        :class="{ 'is-invalid': submitted && errors.has('email') }" 
                        placeholder="E-mail"
                    /> 
                    <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                    <!-- E-MAIL -->
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <!-- PASSWORD-->
                    <b-form-input type="password" 
                          v-model="password" v-validate="{ required: true, min: 6 }" 
                          name="password" class="form-control" 
                          :class="{ 'is-invalid': submitted && errors.has('password') }" 
                          placeholder="Senha"
                    /> 
                    <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                    <!-- PASSWORD-->
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" @click="handleSubmit" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Perdeu a senha?</b-button>
                    </b-col>
                  
                  </b-row>
                </b-form>
              </b-card-body>
              <div v-if="submitted && errors.has('auth')" style="color: red" class="container">{{ errors.first('auth') }}</div>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Registre-se</h2>
                  <p>Sistema gerencial do Simpósio de Integração Acadêmica da Universidade Federal de Viçosa</p>
                  <router-link to="/register"><b-button variant="primary" class="active mt-3">Registre-se</b-button></router-link>
                </div>
              </b-card-body>
              
            </b-card>
            
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      submitted: false
    }
  },
  created() {
    document.title = "SIA - Login"
  },
  methods: {
    //Checar o formulário em busca de erros
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
          if (valid) {
              this.login()
              //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
          }
      });
    },
    //Função de login para retornar o token
    login() {

      this.$axios({
        method: 'post',
        url: '/login',
        data: {
          email: this.email,
          password: this.password
        }
      })

      .then(response => {
        // console.log("response.data.user: " )
        // console.log(response.data.user.isAdmin)
        // console.log("response.data.token: ")
        // console.log(response.data.token.token)
        if(response.data.token){
          // Se entrar aqui autenticou com sucesso
          localStorage.setItem('user', JSON.stringify(response.data))
          this.$store.loggedIn = true
          this.$store.permission = response.data.user.permission

          if(this.$store.permission === 'admin'){
            this.axiosInstance()
            this.$router.push('/admin')
          }  
          else {
            this.axiosInstance()
            this.$router.push('/home')
          }
        } 
      })
      .catch((error) => {
        this.errors.add({ field: 'auth', msg: 'E-mail ou senha inválidos' })
      });
    },

    axiosInstance() {


      //Setar a URL e PORTA
      var URL = process.env.VUE_APP_API_URL
      var PORT = process.env.VUE_APP_API_PORT

      let axios_instance

      if(localStorage.getItem('user')){

        var userSession = JSON.parse(localStorage.getItem('user')) 

        axios_instance = axios.create({
          baseURL: URL + ':' + PORT,
          headers: {
            'Authorization': 'Bearer ' + userSession.token.token
          }
        })
      }
      else {

        var userSession = JSON.parse(localStorage.getItem('user')) 

        axios_instance = axios.create({
          baseURL: URL + ':' + PORT
        })
      }



      this.$axiosMutation(axios_instance)
    }
  }
}
</script>
