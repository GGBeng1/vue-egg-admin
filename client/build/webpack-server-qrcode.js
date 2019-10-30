const qrcode = require('qrcode-terminal')
const os = require('os')
const chalk = require('chalk')

module.exports = class serverQRcode {
  constructor(options) {
    this.options = options
    this.qrcode = qrcode
  }

  getIp() {
    const ifaces = os.networkInterfaces()
    let ips = []
    for (const key in ifaces) {
      if (ifaces.hasOwnProperty(key)) {
        const nets = ifaces[key]
        nets.forEach(net => {
          if (net.family === 'IPv4') {
            const address = net.address
            ips.push(address)
          }
        })
      }
    }
    return ips
  }
  printQRcode(url) {
    this.qrcode.generate(url, { small: true }, qrcode => {
      console.log(qrcode)
      console.log(chalk.cyan('二维码地址:' + url))
    })
  }
  apply(compiler) {
    const port = compiler.options.devServer.port
    const ips = this.getIp()
    const url = `http://${ips[0]}:${port}`
    compiler.plugin('done', () => {
      setTimeout(() => {
        this.printQRcode(url)
      }, 1500)
    })
  }
}
