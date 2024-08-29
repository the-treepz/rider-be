import NotilifyService from './notilify.service';
import NotilifyResponse from './notilify.response';

const Notilify = {
  async generateOtp() {
    return NotilifyService.generateOtp({
      channel: 'email',
      expiryTime: '40',
      length: '6', // Default Value is 6
      type: 'alphanumeric', // Values are alphanumeric,Letter or Number
    })
      .then(async (response) => {
        return NotilifyResponse.checkResponse(response, 'generate otp');
      })
      .catch((err) => {
        return NotilifyResponse.checkErrorResponse(err, 'generate otp');
      });
  },
  async checkOtp(otp: string) {
    return NotilifyService.checkOtp(otp)
      .then(async (response) => {
        return NotilifyResponse.checkResponse(response, 'check otp');
      })
      .catch((err) => {
        return NotilifyResponse.checkErrorResponse(err, 'check otp');
      });
  },
};
export default Notilify;
