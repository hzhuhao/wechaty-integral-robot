
const Qrterminal = require("qrcode-terminal")

module.exports = function onScan(qrcode, status) {
  console.log('网址',qrcode)
  Qrterminal.generate(qrcode, { small: true })
}
