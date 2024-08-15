import Notilify from '../../libraries/api/email/notilify/notilify';

const OtpService = {
  async generateOtpDetail() {
    const result = await Notilify.generateOtp();
    return result.data;
  },
};
export default OtpService;
