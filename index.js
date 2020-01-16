'use strict'

const debug = require('debug')('vue-dns-record-validation')

module.exports = {
  record,
  hostname
}

function record(record, type, value) {
  return false
}

function hostname(hostname) {
  return true
}
