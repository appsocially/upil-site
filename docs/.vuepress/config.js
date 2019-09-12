module.exports = {
  theme: './theme',
  title: 'UPIL',
  description: 'User Page Interaction Language',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css' }]
  ],
  themeConfig: {
    sidebar: [
      '/',
      '/language/'
    ]
  },
  markdown: {
    lineNumbers: true
  },
  dest: 'dist',
  extendMarkdown: md => {
    // use more markdown-it plugins!
    md.core.ruler.push('upil', state => {
      state.tokens.filter(t => t.type === 'fence' && t.info === 'upil').forEach(t => console.log(t))
    })
  }
}