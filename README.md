<p align="center"><a href="https://www.sdhd.nl/link.php?id=29" alt="Secure & Reliable Hosting"><img src="https://www.sdhd.nl/assets/img/logo.png" width="245px;"></a></p>

[![NPM version][npm-image]][npm-url]

## Vue DNS record validation
This module is build to easily validate DNS records before sending them to your backend systems.

#### Supported record types
Checked = Implemented.<br>
Unchecked = To be implemented.

- [ ] A
- [ ] AAAA
- [ ] CNAME
- [ ] MX
- [ ] SRV
- [ ] TLSA
- [ ] TXT

## Documentation
Example:
```javascript
<script>
  import dnsValidate from 'vue-dns-record-validation';
  export default {
    ..
  },
  methods: {
    validateRecord() {
      return dnsValidate.record('www', 'A', '172.0.0.1')
    },
    validateHostname() {
      return dnsValidate.domainName('sdhd.nl')
    }
  }
</script>
```

## Security Vulnerabilities
If you discover a security vulnerability within vue-dns-record-validation, please send an e-mail to SDHD Hosts via [support@sdhd.nl](mailto:support@sdhd.nl). All security vulnerabilities will be promptly addressed.

## License
The vue-dns-record-validation is open-sourced module. But all rights remain reserved for SDHD Hosts.

[npm-image]: https://img.shields.io/npm/v/vue-dns-record-validation.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/vue-dns-record-validation
