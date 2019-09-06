import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
const DefaultContainerAdmin = () => import('@/containers/DefaultContainerAdmin')
const DefaultContainerNotLogged = () => import('@/containers/DefaultContainerNotLogged')

// SIA
//admin
const Admin = () => import('@/views/admin/Home')
const AdminAnos = () => import('@/views/admin/Anos')
const AdminInstitutos = () => import('@/views/admin/Institutos')
const AdminAvaliadores = () => import('@/views/admin/Avaliadores')
const AdminTrabalhos = () => import('@/views/admin/Trabalhos')
const AdminSalas = () => import('@/views/admin/Salas')
const AdminOrais = () => import('@/views/admin/Orais')
const AdminPaineis = () => import('@/views/admin/Paineis')
const AdminUsuarios = () => import('@/views/admin/Usuarios')

//Users
const Home = () => import('@/views/user/Home')
const Anos = () => import('@/views/user/Anos')
const Institutos = () => import('@/views/user/Institutos')
const Avaliadores = () => import('@/views/user/Avaliadores')
const Trabalhos = () => import('@/views/user/Trabalhos')
const Salas = () => import('@/views/user/Salas')
const Orais = () => import('@/views/user/Orais')
const Paineis = () => import('@/views/user/Paineis')

//Reports (Comum a admin e users)
const Oraisreport = () => import('@/views/reports/Oraisreport')
const Paineisreport = () => import('@/views/reports/Paineisreport')
const AvaliadoresPorInstituto = () => import('@/views/reports/AvaliadoresPorInstituto')
const TrabalhosPorInstituto = () => import('@/views/reports/TrabalhosPorInstituto')
const SessoesPorSala = () => import('@/views/reports/SessoesPorSala')

//Auth
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const MeusDados = () => import('@/views/MeusDados')


Vue.use(Router)

//export default new Router({
const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'Autenticação',
      component: DefaultContainerNotLogged,
      children: [
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
        },
      ]
    },

    //Admin permission
    {
      path: '/',
      redirect: '/admin',
      name: '',
      component: DefaultContainerAdmin,
      meta: { requiresAuth: true, adminAuth: true, userAuth: false },
      children: [
        {
          path: 'admin',
          name: 'Admin / Home',
          component: Admin,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/institutos',
          name: 'Admin / Institutos',
          component: AdminInstitutos,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },          
        }, 
        {
          path: '/admin/anos',
          name: 'Admin / Anos',
          component: AdminAnos,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/avaliadores',
          name: 'Admin / Avaliadores',
          component: AdminAvaliadores,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/orais',
          name: 'Admin / Orais',
          component: AdminOrais,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/paineis',
          name: 'Admin / Painéis',
          component: AdminPaineis,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },                    
        {
          path: '/admin/trabalhos',
          name: 'Admin / Trabalhos',
          component: AdminTrabalhos,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/salas',
          name: 'Admin / Salas',
          component: AdminSalas,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/usuarios',
          name: 'Admin / Usuários',
          component: AdminUsuarios,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
      ]
    },
    {
      path: '/admin',
      redirect: '/admin',
      name: 'admin',
      component: DefaultContainerAdmin,
      meta: { requiresAuth: true, adminAuth: true, userAuth: false },
      children: [
        {
          path: '/admin/relatorios_orais',
          name: 'Administrador / Relatórios Orais',
          component: Oraisreport,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/relatorios_paineis',
          name: 'Administrador / Relatórios Painéis',
          component: Paineisreport,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/avaliadoresporinstituto',
          name: 'Administrador / Avaliadores por Instituto',
          component: AvaliadoresPorInstituto,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/trabalhosporinstituto',
          name: 'Administrador / Trabalhos por Instituto',
          component: TrabalhosPorInstituto,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },                
        {
          path: '/admin/sessoesporsala',
          name: 'Administrador / Sessões por Sala',
          component: SessoesPorSala,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        }, 
        {
          path: '/meusdados',
          name: 'Administrador / Meus Dados',
          component: MeusDados,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        },                            
      ]
    },

    //User permission
    {
      path: '/',
      redirect: '/home',
      name: 'Home',
      component: DefaultContainer,
      meta: { requiresAuth: true, adminAuth: false, userAuth: true },
      children: [
        {
          path: 'home',
          //name: 'Home',
          component: Home,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'institutos',
          name: 'Institutos',
          component: Institutos,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        }, 
        {
          path: 'anos',
          name: 'Anos',
          component: Anos,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'avaliadores',
          name: 'Avaliadores',
          component: Avaliadores,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'orais',
          name: 'Orais',
          component: Orais,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'paineis',
          name: 'Painéis',
          component: Paineis,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },                    
        {
          path: 'trabalhos',
          name: 'Trabalhos',
          component: Trabalhos,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'salas',
          name: 'Salas',
          component: Salas,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
      ]
    },

    {
      path: '/',
      redirect: '/relatorios_orais',
      name: 'Relatorios',
      component: DefaultContainer,
      meta: { requiresAuth: true, adminAuth: false, userAuth: true },
      children: [
        {
          path: 'relatorios_orais',
          name: 'Relatórios Orais',
          component: Oraisreport,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'relatorios_paineis',
          name: 'Relatórios Painéis',
          component: Paineisreport,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'avaliadoresporinstituto',
          name: 'Avaliadores por Instituto',
          component: AvaliadoresPorInstituto,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'trabalhosporinstituto',
          name: 'Trabalhos por Instituto',
          component: TrabalhosPorInstituto,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'sessoesporsala',
          name: 'Sessões por Sala',
          component: SessoesPorSala,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },                        
        {
          path: 'meusdados',
          name: 'Meus Dados',
          component: MeusDados,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        },                              
      ]
    },
  ]
})

// Middleware de autenticação para as rotas
router.beforeEach((to, from, next) => {
  //Next é para onde está indo e from é de onde veio
  // //Se precisar de autenticacao e nao tiver sessao ja manda logo pra pagina de login

  if(to.meta.requiresAuth ){
    const authUser = JSON.parse(localStorage.getItem('user'))

    if(!authUser /*|| Vue.prototype.$store.loggedIn === false*/){
      next({ path: '/login' })
    }
    
    else if (to.meta.adminAuth) {
      const authUser = JSON.parse(localStorage.getItem('user'))
      if(authUser.user.permission === 'admin' /*&& Vue.prototype.$store.permission === 'admin'*/){
        next()
      }  
      else{
        next({ path: '/home' })
      } 
    }
    else if (to.meta.userAuth) {
      const authUser = JSON.parse(localStorage.getItem('user'))
      if(authUser.user.permission === 'user' /*&& Vue.prototype.$store.permission === 'user'*/){
        next()
      } else {
        next({ path: '/login' })
      }        
    }
    else 
     next()
  } 
  else
    next()

  //Antigo
  // if(to.matched.some(record => record.meta.requiresAuth) && sessionStorage.getItem('user') == null) {
  //   //console.log("to.matched.some")
  //   next({ name: 'Login' })
  // }
})

export default router

