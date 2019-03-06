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
      url: '/',
      icon: 'icon-note',
      children: [
        {
          name: 'Relatório testes',
          url: '/relatorios',
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
  ]
}
