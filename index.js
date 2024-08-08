'use strict'

const debug = require('debug')('vue-dns-record-validation')

module.exports = {
  record,
  domainName
}

function record(record, type, value) {
  if (!record || !type || !value) {
    return false;
  }

  switch (type) {
    case 'A':
      return checkA(value);
    case 'AAAA':
      return checkAAAA(value);
    case 'CNAME':
      return checkCNAME(value);
    case 'MX':
      return checkMX(value);
    case 'SRV':
      return checkSRV(value);
    case 'TLSA':
      return checkTLSA(value);
    case 'TXT':
      return checkTXT(value);
    default:
      return false;
  }
}

function domainName(domainName, option = {}) {
  debug('domainName: ', domainName, option);

  if (!domainName) {
    return false;
  }

  const len = domainName.length;
  if (len > 255) {
    return false;
  }

  if (option.allowTrailingDot && domainName[len - 1] === '.') {
    domainName = domainName.substring(0, len - 1);
  }

  const labels = domainName.split('.');
  debug('labels: ', labels);
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    if (label.length === 0 || label.length > 63) {
      return false;
    }
    if (label[0] === '-' || label[label.length - 1] === '-') {
      return false;
    }
    if (!/^[a-zA-Z0-9-]+$/.test(label)) {
      return false;
    }
  }

  return true;
}

// Record Validations
function checkA(value) {
  const ip4Regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  return ip4Regex.test(value);
}

function checkAAAA(value) {
  const ipv6Regex = /^([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:)$/i;
  return ipv6Regex.test(value);
}

function checkCNAME(value) {
  // CNAME must be a valid domain name
  return domainName(value);
}

function checkMX(value) {
  // MX records contain a priority and a domain name (e.g., "10 mail.example.com.")
  const mxRegex = /^(\d+)\s+(.+)$/;
  const match = value.match(mxRegex);
  return match && domainName(match[2]);
}

function checkSRV(value) {
  // SRV records have a priority, weight, port, and target (e.g., "10 60 5060 sip.example.com.")
  const srvRegex = /^(\d+)\s+(\d+)\s+(\d+)\s+(.+)$/;
  const match = value.match(srvRegex);
  return match && domainName(match[4]);
}

function checkTLSA(value) {
  // TLSA records contain certificate usage, selector, matching type, and certificate association data
  const tlsaRegex = /^[0-3]\s[0-1]\s[0-2]\s([0-9a-fA-F]{2})+$/;
  return tlsaRegex.test(value);
}

function checkTXT(value) {
  // TXT records are often enclosed in double quotes and can contain multiple strings
  return /^[\s\S]{1,255}$/.test(value);
}
