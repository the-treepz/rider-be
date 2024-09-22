import { MailInterface } from './interface/email.interface';
import Nodemailer from '../../libraries/package/nodemailer/nodemailer';
import SharedHelper from '../shared.helper';
import Brevo from '../../libraries/api/email/brevo/brevo';
import { EMAIL_FROM } from './email-log.constant';
import Sendgrid from '../../libraries/package/sendgrid/sendgrid';

const Email = {
  sendNonProductionEmail(options: MailInterface) {
    return Nodemailer.sendMail(options)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  async sendEmail(options: MailInterface) {
    /**
     * todo
     */
    // if (SharedHelper.checkIfProductionOrStagingEnvironment()) {
    //   return Sendgrid.sendEmail(options);
    // }
    return this.sendNonProductionEmail(options);
  },
  async sendMeEmail(message: string, subject: string) {
    return this.sendEmail({
      subject: `Dev Notification: ${subject}`,
      from: EMAIL_FROM.BREVO_EMAIL_FROM,
      to: ['tina@treepz.com'],
      html: message,
    });
  },
};
export default Email;
