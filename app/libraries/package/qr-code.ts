import QRCode from 'qrcode';

const QrCode = {
  async generateQRCode(url: string) {
    return QRCode.toDataURL(url);
  },
};
export default QrCode;
