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
      name: 'Relatórios',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },

    {
      name: '> Avaliadores por Instituto',
      url: '/admin/avaliadoresporinstituto',
    },
    {
      name: '> Trabalhos por Instituto',
      url: '/admin/trabalhosporinstituto',
    },
    {
      name: '> Salas e suas Sessões',
      url: '/admin/sessoesporsala',
    },
    {
      name: 'Sessões Orais',
      url: '/admin/relatorios_orais',
    },
    {
      name: 'Sessões Paineis',
      url: '/admin/relatorios_paineis',
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
      url: '/admin/fichas_orais',
    },
    {
      name: 'Fichas trabalhos Paineis',
      url: '/admin/fichas_paineis',
    },


    // {
    //   name: 'Minicursos',
    //   url: '/6',
    //   icon: 'icon-star'
    // },
  ]
}
