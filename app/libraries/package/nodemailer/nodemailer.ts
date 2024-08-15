import { MailInterface } from '../../../lib/email/interface/email.interface';
import { transporter } from './nodemailer.config';

const Nodemailer = {
  sendMail(options: MailInterface) {
    return transporter.sendMail(options);
  },
};
export default Nodemailer;
