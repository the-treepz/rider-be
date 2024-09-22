import { SendgridSendEmailInterface } from './sendgrid.interface';
import { TREEPZ_SENDGRID_API_KEY } from '../../../config/secrets';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(TREEPZ_SENDGRID_API_KEY);
const SendgridService = {
  async sendEmail(data: SendgridSendEmailInterface) {
    return sgMail.send(data);
  },
};
export default SendgridService;
