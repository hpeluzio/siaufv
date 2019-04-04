<template>
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8" >
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Meus Dados</h1>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <!-- name -->
                  <b-form-input type="text" 
                          v-model="name" v-validate=" 'required' " 
                          name="name" class="form-control" 
                          :class="{ 'is-invalid': submitted && errors.has('name') }" 
                          placeholder="name"
                  />
                  <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</div>
                   <!-- name -->
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
                    <div v-if="submitted && errors.has('confirm_password')" class="invalid-feedback">{{ errors.first('confirm_password') }}</div> 
                    <!-- CONFIRM PASSWORD-->   
                </b-input-group>
      
                <div style="color: red" v-if="submitted && errors.has('defaulterror')" ><strong>{{ errors.first('defaulterror') }}</strong></div> 
                
                <b-button variant="success" @click="handleSubmit" block>Atualizar Dados</b-button>
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

export default {
  name: 'Update',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      submitted: false
    }
  },
  created() {
    document.title = "SIA - atualizar";
    //Setando dados do usuario
    this.setDados()

  },  
  methods: {

    setDados() {
      const authUser = JSON.parse(localStorage.getItem('user'))
      this.name = authUser.user.name
      this.email = authUser.user.email
    },

    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
          if (valid) {
              this.atualizar()
              //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
          }
      });
    },

    atualizar() {
      const authUser = JSON.parse(localStorage.getItem('user'))

      this.$axios({
        method: 'put',
        url: '/usuario/' + authUser.user.id + '',
        data: {
          id: authUser.user.id,
          name: this.name,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        }
      })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))
        this.$store.loggedIn = true
        this.$store.permission = response.data.user.permission
        alert('Dados editados.'); 
      })
      .catch((error) => {
        this.errors.clear() 
      })
    }
  }
}
</script>
