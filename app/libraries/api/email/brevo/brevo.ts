import { MailInterface } from '../../../../lib/email/interface/email.interface';
import EmailLogService from '../../../../lib/email/email-log.service';
import BrevoService from './brevo.service';
import { UnknownInterface } from '../../../../lib/unknown.interface';
import BrevoResponse from './brevo.response';
import {
  EMAIL_FROM,
  EMAIL_LOG_STATUS_ENUM,
} from '../../../../lib/email/email-log.constant';

const Brevo = {
  async sendEmail(data: MailInterface) {
    const from = {
      name: EMAIL_FROM.BREVO_EMAIL_FROM,
      email: EMAIL_FROM.BREVO_EMAIL_FROM,
    };
    const email = await EmailLogService.logEmail({
      from: EMAIL_FROM.BREVO_EMAIL_FROM,
      html: data.html,
      source: 'Brevo',
      subject: data.subject,
      to: data.to,
    });
    return BrevoService.sendEmail({
      htmlContent: data.html,
      sender: from,
      subject: data.subject,
      to: [
        {
          email: data.to[0],
          // "name":"John Doe"
        },
      ],
    })
      .then(async (response) => {
        const result: UnknownInterface = BrevoResponse.checkResponse(
          response,
          'send email',
        );
        return EmailLogService.update(email._id, {
          logId: result.messageId,
          status: EMAIL_LOG_STATUS_ENUM.PENDING,
        });
      })
      .catch((err) => {
        return BrevoResponse.checkErrorResponse(err, 'send email');
      });
  },
};
export default Brevo;
