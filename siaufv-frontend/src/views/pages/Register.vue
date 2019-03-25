<template>
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Registrar</h1>
                <p class="text-muted">Crie sua conta</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <!-- USERNAME -->
                  <b-form-input type="text" 
                          v-model="username" v-validate=" 'required' " 
                          name="username" class="form-control" 
                          :class="{ 'is-invalid': submitted && errors.has('username') }" 
                          placeholder="Username"
                  />
                  <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div>
                   <!-- USERNAME -->
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
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

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                    <!-- PASSWORD-->
                    <b-form-input type="password" 
                          v-model="password" v-validate="'required|min:6'" 
                          name="password" class="form-control" 
                          :class="{ 'is-invalid': submitted && errors.has('password') }" 
                          placeholder="Senha" ref="password"
                    />
                    <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div> 
                    <!-- PASSWORD-->  
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <!-- CONFIRM PASSWORD-->
                  <b-form-input type="password" 
                          v-model="confirm_password" v-validate="'required|min:6|confirmed:password'" 
                          name="confirm_password" class="form-control"
                          :class="{ 'is-invalid': submitted && errors.has('confirm_password') }" 
                          placeholder="Confirme sua senha" data-vv-as="password"
                    />
                    

                    <!-- CONFIRM PASSWORD-->   
                </b-input-group>
      
                <div style="color: red" v-if="submitted && errors.has('defaulterror')" ><strong>{{ errors.first('defaulterror') }}</strong></div> 
                
                <b-button variant="success" @click="handleSubmit" block>Criar Conta</b-button>
              </b-form>
            </b-card-body>
            <!--<b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                  <b-button block class="btn btn-facebook"><span>facebook</span></b-button>
                </b-col>
                <b-col cols="6">
                  <b-button block class="btn btn-twitter" type="button"><span>twitter</span></b-button>
                </b-col>
              </b-row>
            </b-card-footer>-->
          </b-card>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      submitted: false
    }
  },
  created() {
    document.title = "SIA - Register";
  },  
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
          if (valid) {
              this.register()
              //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
          }
      });
    },
    register() {
      axios.post('http://127.0.0.1:3333/register', {
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password
      })
      .then(response => {
        if(response.data.tokenData){
          console.log("Register Response")
          // Se entrar aqui autenticou com sucesso
          sessionStorage.setItem('user', JSON.stringify(response.data))

          this.$router.push('/home')
        }
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
            this.errors.clear()
            if(error.response.data.error[0].message)
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error[0].message })
            else
              this.errors.add({ field: 'defaulterror', msg: error.response.data.error.message })
      });
    }
  }
}
</script>
