'use strict'

const debug = require('debug')('vue-dns-record-validation')

module.exports = {
  record,
  domainName
}

function record(record, type, value) {
  if (!domainName || !type || !value) {
    return false
  }

  if (type == 'A') {
    return checkA();
  } else if (type == 'AAAA') {
    return checkAAAA();
  } else if (type == 'CNAME') {
    return checkCNAME();
  } else if (type == 'MX') {
    return checkMX();
  } else if (type == 'SRV') {
    return checkSRV();
  } else if (type == 'TLSA') {
    return checkTLSA();
  } else if (type == 'TXT') {
    return checkTXT();
  }

  return false
}

function domainName(domainName, option) {
  option = option || {}
  debug('domainName: ', domainName, option)

  if (!domainName) {
    return false
  }

  const len = domainName.length
  if (len > 255) {
    return false
  }

  if (option.allowTrailingDot && domainName[len - 1] === '.') {
    domainName = domainName.substring(0, len - 1)
  }

  const labels = domainName.split('.')
  debug('labels: ', labels)
  for (let i = 0, len = labels.length; i < len; i++) {
    const label = labels[i]
    if (label[0] === '-' || label[label.length - 1] === '-') {
      return false
    }

    if (!/^[a-zA-Z0-9-]{0,63}$/.test(label)) {
      return false
    }
  }

  return true
}

// Record Validations
function checkA(value) {
  const ip4Regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
  return ip4Regex.test(value)
}

function checkAAAA(value) {
  const ipv6Regex = /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i
  return ipv6Regex.test(value)
}

function checkCNAME(value) {
  return false
}

function checkMX(value) {
  return false
}

function checkSRV(value) {
  return false
}

function checkTLSA(value) {
  return false
}

function checkTXT(value) {
  return false
}
