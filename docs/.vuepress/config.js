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
  plugins: [
    [
      'vuepress-plugin-medium-zoom',
      {
        selector: '.page img',
        delay: 1000,
        options: {
          margin: 24,
          background: '#FFFFFF',
          scrollOffset: 0,
        },
      },
    ],
  ],
  dest: 'dist'
}