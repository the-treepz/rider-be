import BrevoHttp from './brevo.http';
import { BrevoSendEmailInterface } from './brevo.interface';

const BrevoService = {
  async sendEmail(data: BrevoSendEmailInterface) {
    return BrevoHttp.postWithAuthorization(
      data,
      'https://api.brevo.com/v3/smtp/email',
    );
  },
};
export default BrevoService;
