import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
const DefaultContainerNotLogged = () => import('@/containers/DefaultContainerNotLogged')


// SIA
const Home = () => import('@/views/pages/Home')
const Anos = () => import('@/views/pages/Anos')
const Institutos = () => import('@/views/pages/Institutos')
const Avaliadores = () => import('@/views/pages/Avaliadores')
const Avaliacoes = () => import('@/views/pages/Avaliacoes')
const Trabalhos = () => import('@/views/pages/Trabalhos')
const Salas = () => import('@/views/pages/Salas')
const Orais = () => import('@/views/pages/Orais')
const Paineis = () => import('@/views/pages/Paineis')
const Relatorios = () => import('@/views/reports/Relatorios')
const Oraisreport = () => import('@/views/reports/Oraisreport')
const Paineisreport = () => import('@/views/reports/Paineisreport')
// SIA


// Views
const Painel = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

//export default new Router({
const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Home',
      component: DefaultContainer,
      meta: {
        requiresAuth: true,
        adminAuth: true
      },
      children: [
        {
          path: 'home',
          //name: 'Home',
          component: Home,
        },
        {
          path: 'institutos',
          name: 'Institutos',
          component: Institutos,
        }, 
        {
          path: 'anos',
          name: 'Anos',
          component: Anos,
        },
        {
          path: 'avaliadores',
          name: 'Avaliadores',
          component: Avaliadores,
        },
        {
          path: 'avaliacoes',
          name: 'Avaliações',
          component: Avaliacoes,
        },
        {
          path: 'orais',
          name: 'Orais',
          component: Orais,
        },
        {
          path: 'paineis',
          name: 'Painéis',
          component: Paineis,
        },                    
        {
          path: 'trabalhos',
          name: 'Trabalhos',
          component: Trabalhos,
        },
        {
          path: 'salas',
          name: 'Salas',
          component: Salas,
        },        
        {
          path: 'users',
          meta: { 
            label: 'Users',
          },
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: ':id',
              meta: { label: 'User Details'},
              name: 'User',
              component: User,
            },
          ]
        },
      ]
    },
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
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      // meta: {
      //   requiresAuth: true,
      // },      
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        // {
        //   path: 'login',
        //   name: 'Login',
        //   component: Login
        // },
        // {
        //   path: 'register',
        //   name: 'Register',
        //   component: Register
        // }
      ]
    },
    {
      path: '/',
      redirect: '/relatorios_orais',
      name: 'Relatorios',
      component: DefaultContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        // {
        //   path: 'relatorios',
        //   name: 'Relatorios gerais',
        //   component: Relatorios
        // },
        {
          path: 'relatorios_orais',
          name: 'Relatórios Orais',
          component: Oraisreport
        },
        {
          path: 'relatorios_paineis',
          name: 'Relatórios Painéis',
          component: Paineisreport
        },                   
      ]
    },    
  ]
})

// Middleware de autenticação para as rotas
router.beforeEach((to, from, next) => {
  //Next é para onde está indo e from é de onde veio
  //console.log("beforeEach")
  // //Se precisar de autenticacao e nao tiver sessao ja manda logo pra pagina de login
  if(to.matched.some(record => record.meta.requiresAuth) && sessionStorage.getItem('user') == null) {
    //console.log("to.matched.some")
    next({ name: 'Login' })
  } 

//   // //Setando a sessao na variavel user
//   // let user = JSON.parse(sessionStorage.getItem('user'))
//   // console.log("user");
//   // // if(user)
//   // // if(!user.userData.isAdmin != null)
//   // //   console.log(user.userData.isAdmin);
//   // //Se precisar de de autenticacao e admin ai continua
//   // if(to.matched.some(record => record.meta.isAdmin) && user.userData.isAdmin == 1) {
//   //   console.log("COM permissao isAdmin")
//   //   next()
//   // } else if (to.matched.some(record => record.meta.isAdmin) && (user.userData.isAdmin == 0 || user.userData.isAdmin == null)){ //Se precisa de autenticacao e nao eh admin entao manda pra tela do 
//   //   console.log("Sem permissao NAO isAdmin")
//   //   next({  path: 'users' }) 
//   // }

next()


})

export default router

