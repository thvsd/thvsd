const m = require('mithril')

module.exports = () => {

  function view () {
    return [
      m('span', 'Blah Blah Blah... :)'),
      m('br'),
      m('a', { href: '#!/' }, 'Back')
    ]
  }

  return { view }
}
