<template>
    <div class="container">

    <v-dialog v-model="dialog" persistent max-width="65%">
        <template v-slot:activator="{ on }">
          <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
        </template>
        <v-card>
          <v-card-title class="headline"></v-card-title>
          <v-card-text>
            
            
                <h1><center>POLÍTICAS E TERMOS DE USO</center><strong></strong></h1> 


                <h5>Descrição</h5>
                <p>O sistema do SIA de Rio Paranaíba foi criado para facilitar e viabilizar a
                gestão e alocação das salas do campus nas datas do eventos para trabalhos orais, 
                paineis e minicursos.
                 </p>

                <br>
                <h5>O que faremos com as informações</h5>
                <p>Quando você realiza algum acesso ou modificação no sistema coletamos as informações 
                  para alocarmos e gerirmos da melhor forma os trabalhos e minicursos.
                </p>

                <br>
                <h5>Divulgação</h5>
                <p>Podemos divulgar suas informações pessoais 
                  caso sejamos obrigados pela lei para fazê-lo 
                  ou se você violar nossos Termos de Serviço.</p>

                <br>
                <h5>Segurança</h5>
                <p>Para proteger suas informações pessoais, tomamos precauções razoáveis e 
                  seguimos as melhores práticas para nos certificar que elas não 
                  serão perdidas inadequadamente, usurpadas, acessadas, divulgadas, alteradas ou destruídas.

                  Toda informação pessoal é 
                  criptografada usando tecnologia "secure socket layer" (SSL) e armazenada com uma 
                  criptografia AES-256. Embora nenhum método de transmissão pela Internet ou armazenamento 
                  eletrônico é 100% seguro, nós seguimos todos os requisitos da PCI-DSS e implementamos padrões 
                  adicionais geralmente aceitos pela indústria.
                </p>

                <br>
                <h5>Conta de Acesso</h5>
                <p>A conta é o meio de acesso aos recursos disponibilizados pelos administradores do sistema.
                  Ao criar uma conta, o então usuário declara admitir incondicionalmente a política
                  estabelecida neste documento, bem como conhecer e entender como operar o sistema.
                </p>
       
          
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" color="red" text @click="recusar()">Recusar</v-btn>
            <v-btn class="primary" color="blue" text @click="dialog = false">Aceitar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
import { mapActions } from 'vuex';

export default {
  name: 'Register',

  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      submitted: false,
      dialog: true,
    }
  },

  created() {
    document.title = "SIA - Registrar";
  },  

  methods: {
    ... mapActions('auth', ['SET_LOGAR_ACT', 'SET_REGISTER_ACT']),

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
      //Action retornando uma promise... Resolve isso aqui priimeiro, depois vai para then
      this.SET_REGISTER_ACT({
          name: this.name,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
      })        
      .then( response_resolve => {
        // console.log('response_resolve', response_resolve)
        if(response_resolve){
          this.$router.push('/home')
        } 
      }).catch( error => {
        console.log('Error: ', error)
      });
    },

    recusar() {
      this.$router.push('/login')
    },        

  }
}
</script>
