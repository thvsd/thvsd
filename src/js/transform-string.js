const layout = require('./layout')

const {faMap, enMap} = (function () {
  const keys = Object.keys(layout)
  const faMap = new Map()
  const enMap = new Map()

  for (let i = 0, chEn, chFa, len = keys.length; i < len; i++) {
    chEn = keys[i]
    chFa = layout[chEn]
    faMap.set(chEn.charCodeAt(0), chFa)
    enMap.set(chFa.charCodeAt(0), chEn)
  }

  return { faMap, enMap }
})()

function fa2en (codeFa, { capslock = false, shift = false }) {
  let chEn = enMap.get(codeFa)
  if (chEn == null) {
    return null
  }
  return capslock !== shift
    ? chEn.toUpperCase()
    : chEn
}

function en2fa (codeEn) {
  return faMap.get(codeEn)
}

module.exports = function (action, kcode, options = {}) {
  return action === 'en2fa' ? en2fa(kcode, options) :
    action === 'fa2en' ? fa2en(kcode, options) :
    null
}
