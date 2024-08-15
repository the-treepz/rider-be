import { NotilifyGenerateOtpInterface } from './notilify.interface';
import NotilifyHttp from './notilify.http';

const NotilifyService = {
  async generateOtp(data: NotilifyGenerateOtpInterface) {
    return NotilifyHttp.postWithAuthorization(
      data,
      'https://api.notilify.com/v1/otp',
    );
  },
};
export default NotilifyService;
