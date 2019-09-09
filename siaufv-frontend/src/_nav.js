export default {
  items: [
    // {
    //   title: true,
    //   name: 'Menu',
    //   class: '',
    //   wrapper: {
    //     element: '',
    //     attributes: {}
    //   }
    // },    
    {
      name: 'Home',
      url: '',
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
      url: '/institutos',
      icon: 'cui-graph'
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
      url: '/orais',
      icon: 'cui-speech'
    },
    {
      name: 'Paineis',
      url: '/paineis',
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
          url: '/relatorios_orais',
        },              
        {
          name: 'Sessões Paineis',
          url: '/relatorios_paineis',
        },
        {
          name: 'Avaliadores por Instituto',
          url: '/avaliadoresporinstituto',
        },
        {
          name: 'Trabalhos por Instituto',
          url: '/trabalhosporinstituto',
        },
        {
          name: 'Salas e suas Sessões',
          url: '/sessoesporsala',
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
          url: '/fichas_orais',
        },              
        {
          name: '> Paineis',
          url: '/fichas_paineis',
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
