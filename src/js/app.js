const m = require('mithril')

const root = document.body

m.route(root, '/', {
  '/': require('./type-area'),
  '/about': require('./about'),
})
