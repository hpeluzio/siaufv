export default {
  items: [
    {
      title: true,
      name: 'Menu Principal',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },    
    {
      name: 'Home',
      url: '/home',
      icon: 'icon-home',
      //badge: {
      //  variant: 'primary',
      //  text: 'NEW'
      //}
    },
    // {
    //   title: true,
    //   name: 'Principal',
    //   class: '',
    //   wrapper: {
    //     element: '',
    //     attributes: {}
    //   }
    // },
    
    {
      title: true,
      name: 'Sistema',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Institutos',
      url: '/institutos',
      icon: 'cui-cog'
    },     
    {
      name: 'Anos',
      url: '/anos',
      icon: 'icon-calendar'
    },
    {
      name: 'Salas',
      url: '/salas',
      icon: 'cui-location-pin'
    },    
    {
      name: 'Avaliadores',
      url: '/avaliadores',
      icon: 'icon-people'
    },
    {
      name: 'Trabalhos',
      url: '/trabalhos',
      icon: 'icon-pencil'
    },
    {
      title: true,
      name: 'Lançamentos de Sessões',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    // {
    //   name: 'Avaliações',
    //   url: '/avaliacoes',
    //   icon: 'icon-bubbles'
    // },


    {
      name: 'Orais',
      url: '/orais',
      icon: 'cui-speech'
    },
    {
      name: 'Painéis',
      url: 'paineis',
      icon: 'cui-dashboard'
    },

    {
      title: true,
      name: 'Consultas',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    }, 
    {
      name: 'Relatórios',
      url: '/',
      icon: 'icon-note',
      children: [
        // {
        //   name: 'Relatórios Gerais',
        //   url: '/relatorios',
        // },
        {
          name: 'Orais',
          url: '/relatorios_orais',
        },              
        {
          name: 'Painéis',
          url: '/relatorios_paineis',
        },        
        // {
        //   name: 'Cards',
        //   url: '/base/cards',
        // },
        // {
        //   name: 'Carousels',
        //   url: '/base/carousels',
        // },
        // {
        //   name: 'Forms',
        //   url: '/base/forms',
        // },
      ]
    },
    // {
    //   name: 'Minicursos',
    //   url: '/6',
    //   icon: 'icon-star'
    // },
  ]
}
