import QrCode from 'qrcode-reader'
const qrcode = new QrCode()
qrcode.callback = (result) => postMessage(result) // eslint-disable-line no-undef
onmessage = ({data}) => qrcode.decode(data) // eslint-disable-line no-undef
