import { NotilifyGenerateOtpInterface } from './notilify.interface';
import NotilifyHttp from './notilify.http';

const NotilifyService = {
  async checkOtp(otp: string) {
    return NotilifyHttp.postWithAuthorization(
      { otp },
      'https://api.notilify.com/v1/otp/verify',
    );
  },
  async generateOtp(data: NotilifyGenerateOtpInterface) {
    return NotilifyHttp.postWithAuthorization(
      data,
      'https://api.notilify.com/v1/otp',
    );
  },
};
export default NotilifyService;
