module.exports = {
  theme: './theme',
  title: 'UPIL',
  description: 'User Page Interaction Language',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/appsocially/upil-site' },
    ],
    sidebar: [
      '/',
      '/language/'
    ]
  },
  markdown: {
    lineNumbers: true
  },
  dest: 'dist'
}