import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
// const DefaultContainerAdmin = () => import('@/containers/DefaultContainerAdmin')
// const DefaultContainerNotLogged = () => import('@/containers/DefaultContainerNotLogged')

// SIA
const Home = () => import('@/views/Home')

//admin
const AdminAnos = () => import('@/views/admin/Anos')
const AdminInstitutos = () => import('@/views/admin/Institutos')
const AdminAvaliadores = () => import('@/views/admin/Avaliadores')
const AdminTrabalhos = () => import('@/views/admin/Trabalhos')
const AdminSalas = () => import('@/views/admin/Salas')
const AdminOrais = () => import('@/views/admin/Orais')
const AdminPaineis = () => import('@/views/admin/Paineis')
const AdminUsuarios = () => import('@/views/admin/Usuarios')

//Users
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

//Fichas
const FichasOrais = () => import('@/views/fichas/FichasOrais')
const FichasPaineis = () => import('@/views/fichas/FichasPaineis')

//Auth
const Login = () => import('@/views/auth/Login')
const Page404 = () => import('@/views/Page404')
const Register = () => import('@/views/auth/Register')
const MeusDados = () => import('@/views/auth/MeusDados')


Vue.use(Router)

//export default new Router({
const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '*',
      redirect: '/Page404'
    },
    {
      path: '/',
      redirect: '/login',
      component: DefaultContainer,
      children: [
        {
          path: 'register',
          // name: 'Register',
          component: Register
        },
        {
          path: 'login',
          // name: 'Login',
          component: Login,
        },
        {
          path: 'page404',
          // name: 'Page404',
          component: Page404,
        },
      ]
    },

    //Paginas comuns a USER E ADMIN
    {
      path: '/',
      redirect: '/home',
      component: DefaultContainer,
      children: [
        {
          path: 'home',
          // name: 'Home',
          component: Home,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false }
        },
        {
          path: 'meusdados',
          component: MeusDados,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        }, 
      ]
    },

    //Admin permission
    {
      path: '/',
      redirect: '/home',
      component: DefaultContainer,
      children: [
        {
          path: '/admin/institutos',
          component: AdminInstitutos,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },          
        }, 
        {
          path: '/admin/anos',
          component: AdminAnos,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/avaliadores',
          component: AdminAvaliadores,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/orais',
          component: AdminOrais,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/paineis',
          component: AdminPaineis,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },                    
        {
          path: '/admin/trabalhos',
          component: AdminTrabalhos,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/salas',
          component: AdminSalas,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
        {
          path: '/admin/usuarios',
          component: AdminUsuarios,
          meta: { requiresAuth: true, adminAuth: true, userAuth: false },
        },
      ]
    },

    //User permission
    {
      path: '/',
      redirect: '/home',
      component: DefaultContainer,
      children: [
        {
          path: 'institutos',
          component: Institutos,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        }, 
        {
          path: 'anos',
          component: Anos,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'avaliadores',
          component: Avaliadores,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'orais',
          component: Orais,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'paineis',
          component: Paineis,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },                    
        {
          path: 'trabalhos',
          component: Trabalhos,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
        {
          path: 'salas',
          component: Salas,
          meta: { requiresAuth: true, adminAuth: false, userAuth: true },
        },
      ]
    },

    //Relatórios comuns a ADMIN e USER
    {
      path: '/',
      redirect: '/relatorios_orais',
      // name: 'Relatorios',
      component: DefaultContainer,
      children: [
        {
          path: '/relatorios_orais',
          component: Oraisreport,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        },
        {
          path: '/relatorios_paineis',
          component: Paineisreport,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        },
        {
          path: '/avaliadoresporinstituto',
          component: AvaliadoresPorInstituto,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        },
        {
          path: '/trabalhosporinstituto',
          component: TrabalhosPorInstituto,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        },
        {
          path: '/sessoesporsala',
          component: SessoesPorSala,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        },                        
        //Fichas
        {
          path: '/fichas_orais',
          component: FichasOrais,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        },
        {
          path: '/fichas_paineis',
          component: FichasPaineis,
          meta: { requiresAuth: true, adminAuth: false, userAuth: false },
        },                              
      ]
    },
  ]
})

// Middleware de autenticação para as rotas
router.beforeEach((to, from, next) => {
  // Next é para onde está indo e from é de onde veio
  // Se precisar de autenticacao e nao tiver sessao ja manda logo pra pagina de login
  console.log(to)
  console.log(from)
  console.log('LOGADO: ', store.getters['auth/logado'])

  if((to.path == '/login' || to.path == '/register') && store.getters['auth/logado'] == true){
    // if(store.getters['auth/permission']== 'admin')
    //   next({ path: '/admin' })
    // else
      next({ path: '/home' })
  }

  if(to.meta.requiresAuth ){
    //const authUser = JSON.parse(localStorage.getItem('user'))

    if(store.getters['auth/logado'] == false /*|| Vue.prototype.$store.loggedIn === false*/){
      next({ path: '/login' })
    }
    
    else if (to.meta.adminAuth) {
      //const authUser = JSON.parse(localStorage.getItem('user'))
      if(store.getters['auth/permission']== 'admin' /*&& Vue.prototype.$store.permission === 'admin'*/){
        next()
      }  
      else{
        next({ path: '/home' })
      } 
    }
    else if (to.meta.userAuth) {
      //const authUser = JSON.parse(localStorage.getItem('user'))
      if(store.getters['auth/permission'] == 'user' /*&& Vue.prototype.$store.permission === 'user'*/){
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

