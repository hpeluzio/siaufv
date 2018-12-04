export default {
  items: [
    {
      title: true,
      name: 'Menu',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
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
  ]
}
