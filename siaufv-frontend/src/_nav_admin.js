export default {
  items: [
    // {
    //   title: true,
    //   name: 'Menu Admin',
    //   class: '',
    //   wrapper: {
    //     element: '',
    //     attributes: {}
    //   }
    // },    
    {
      name: 'Home',
      url: '/admin',
      icon: 'icon-home',
    },
    
    {
      title: true,
      name: 'Lançamentos do Sistema',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Sistema',
      url: '/',
      icon: 'cui-cog',
      children: [    
    {
      name: 'Institutos',
      url: '/admin/institutos',
      icon: 'cui-graph'
    },     
    {
      name: 'Anos',
      url: '/admin/anos',
      icon: 'icon-calendar'
    },
    {
      name: 'Salas',
      url: '/admin/salas',
      icon: 'cui-location-pin'
    },    
    {
      name: 'Avaliadores',
      url: '/admin/avaliadores',
      icon: 'icon-people'
    },
    {
      name: 'Trabalhos',
      url: '/admin/trabalhos',
      icon: 'icon-pencil'
    },
  ]
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
    {
      name: 'Orais',
      url: '/admin/orais',
      icon: 'cui-speech'
    },
    {
      name: 'Paineis',
      url: '/admin/paineis',
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
        {
          name: 'Sessões Orais',
          url: '/admin/relatorios_orais',
        },              
        {
          name: 'Sessões Paineis',
          url: '/admin/relatorios_paineis',
        },
        {
          name: 'Avaliadores por Instituto',
          url: '/admin/avaliadoresporinstituto',
        },
        {
          name: 'Trabalhos por Instituto',
          url: '/admin/trabalhosporinstituto',
        },
        {
          name: 'Salas e suas Sessões',
          url: '/admin/sessoesporsala',
        },                  
      ]
    },
    {
      name: 'Fichas',
      url: '/',
      icon: 'icon-notebook',
      children: [
        {
          name: '> Trabalhos Orais',
          url: '/admin/fichas_orais',
        },              
        {
          name: '> Paineis',
          url: '/admin/fichas_paineis',
        },
                
      ]
    },    
    // {
    //   name: 'Minicursos',
    //   url: '/6',
    //   icon: 'icon-star'
    // },
  ]
}
