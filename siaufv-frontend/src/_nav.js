export default {
  items: [
    // {
    //   name: 'Home',
    //   url: '/home',
    //   icon: 'icon-frame',
    //   //badge: {
    //   //  variant: 'primary',
    //   //  text: 'NEW'
    //   //}
    // },
    // {
    //   title: true,
    //   name: 'Principal',
    //   class: '',
    //   wrapper: {
    //     element: '',
    //     attributes: {}
    //   }
    // },
    ///
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
      name: 'Anos',
      url: '/anos',
      icon: 'icon-calendar'
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
      name: 'Salas',
      url: '/salas',
      icon: 'icon-star'
    },
    {
      title: true,
      name: 'Lançamentos',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Avaliações',
      url: '/avaliacoes',
      icon: 'icon-bubbles'
    },

    {
      name: 'Sessões de Avaliação',
      url: '/',
      icon: 'icon-note',
      children: [
        {
          name: 'Orais',
          url: '/orais',
          //icon: 'icon-bubbles'
        },
        {
          name: 'Paineis',
          url: 'paineis',
          //icon: 'icon-bubbles'
        }
      ]
    },  
    {
      name: 'Relatórios',
      url: '/',
      icon: 'icon-note',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
        },
        {
          name: 'Cards',
          url: '/base/cards',
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
        },
        {
          name: 'Forms',
          url: '/base/forms',
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
