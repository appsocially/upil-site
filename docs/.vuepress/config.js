module.exports = {
  title: 'UPIL',
  description: 'User Page Interaction Language',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css' }]
  ],
  themeConfig: {
    smoothScroll: true,
    repo: 'appsocially/upil-site',
    docsDir: 'docs',
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      '/',
      '/language/',
      '/development/'
    ],
    sidebarDepth: 2
  },
  markdown: {
    lineNumbers: true
  },
  dest: 'dist'
}