const m = require('mithril')
const transformString = require('./transform-string')

module.exports = () => {
  let text = ''
  let ttype = 'en2fa'

  function layoutToString() {
    if (ttype === 'en2fa') {
      return 'En > Fa'
    } else if (ttype === 'fa2en') {
      return 'En < Fa'
    } else {
      return '?'
    }
  }

  function toggleLayout () {
    ttype = ttype === 'en2fa' ? 'fa2en' : 'en2fa'
  }

  function insertText(str, sel1, sel2) {
    const len = str.length
    if ((sel1 == len && sel2 == len) || sel1 == null || sel2 == null) {
      return text += str
    }
    text = text.substr(0, sel1) + str + text.substr(sel2)
  }

  function getKeyCode(e) {
    return window.event ? e.keyCode : e.which
  }

  function onKeyPress (e) {
    const keyCode = getKeyCode(e)
    const transformed = transformString(ttype, keyCode, {
      shift: e.shiftKey,
      capslock: e.getModifierState("CapsLock"),
    })

    if (transformed != null) {
      insertText(
        transformed,
        e.target.selectionStart,
        e.target.selectionEnd
      )
      return false;
    }
    text = e.target.value
  }

  function view () {
    return m('form', {
      action: '',
    }, [

      m('div', { class: 'header' }, [
        m('input', {
          type: 'radio',
          checked: ttype === 'en2fa',
          onchange: e => ttype = 'en2fa'
        }),
        m('span', layoutToString()),
        m('input', {
          type: 'radio',
          checked: ttype === 'fa2en',
          onchange: e => ttype = 'fa2en'
        }),
      ]),

      m('textarea', {
        class: ttype === 'en2fa' ? 'fullwidth rtl' : 'fullwidth ltr',
        rows: 10,
        value: text,
        onkeypress: onKeyPress,
        onchange: e => text = e.target.value,
        onkeyup: e => {
          e.key === ' ' && (e.ctrlKey || e.metaKey) && toggleLayout()
          text = e.target.value
        },
      }),

      m('pre', 'Alt/Meta + Space: Toggle Layout'),
      m('a', {href: '#!/about'}, 'About'),
    ])
  }

  return { view }
}
