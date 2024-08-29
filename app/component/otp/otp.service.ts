import Notilify from '../../libraries/api/email/notilify/notilify';

const OtpService = {
  async generateOtpDetail() {
    const { data } = await Notilify.generateOtp();
    return data;
  },
  async checkOtp(otp: string) {
    const { data } = await Notilify.checkOtp(otp);
    return data;
  },
};
export default OtpService;
