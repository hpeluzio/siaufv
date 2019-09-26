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
      url: '/admin',
      icon: 'icon-home',
    },

    {
      title: true,
      name: 'Consultas do Sistema',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },

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

    {
      title: true,
      name: 'Consulta de Sessões',
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
      name: 'Relatórios',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },

    {
      name: '> Avaliadores por Instituto',
      url: '/avaliadoresporinstituto',
    },
    {
      name: '> Trabalhos por Instituto',
      url: '/trabalhosporinstituto',
    },
    {
      name: '> Salas e suas Sessões',
      url: '/sessoesporsala',
    },
    {
      name: 'Sessões Orais',
      url: '/relatorios_orais',
    },
    {
      name: 'Sessões Paineis',
      url: '/relatorios_paineis',
    },

    {
      title: true,
      name: 'Fichas',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },

    {
      name: 'Fichas trabalhos Orais',
      url: '/fichas_orais',
    },
    {
      name: 'Fichas trabalhos Paineis',
      url: '/fichas_paineis',
    },


    // {
    //   name: 'Minicursos',
    //   url: '/6',
    //   icon: 'icon-star'
    // },
  ]
}
