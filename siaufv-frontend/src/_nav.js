export default {
  items: [
    {
      name: 'Home',
      url: '/home',
      icon: 'icon-frame',
      //badge: {
      //  variant: 'primary',
      //  text: 'NEW'
      //}
    },
    {
      title: true,
      name: 'Principal',
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
      name: 'Relatórios',
      url: '/relatorios',
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
      name: 'Orais',
      url: '/4',
      icon: 'icon-bubbles'
    },
    {
      name: 'Painéis',
      url: '/5',
      icon: 'icon-grid'
    },
    {
      name: 'Minicursos',
      url: '/6',
      icon: 'icon-star'
    },
  ]
}
