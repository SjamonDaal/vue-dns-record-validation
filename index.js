var record = require('./record');
var hostname = require('./hostname');

var dnsValidate = hostname;
dnsValidate.record = record;
dnsValidate.hostname = hostname;

module.exports = dnsValidate;
