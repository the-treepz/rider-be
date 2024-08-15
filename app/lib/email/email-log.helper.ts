import { EmailLogInterface } from './interface/email.interface';
import EmailLogService from './email-log.service';
import { EMAIL_LOG_STATUS_ENUM } from './email-log.constant';
import BrevoService from '../../libraries/api/email/brevo/brevo.service';
import BrevoResponse from '../../libraries/api/email/brevo/brevo.response';
import EmailHelper from './email-helper';

const EmailLogHelper = {
  async sendPendingOrFailedEmmails(data: EmailLogInterface) {
    if (data.to.length > 0) {
      if (data.to[0] === null) {
        return EmailLogService.update(data._id, {
          status: EMAIL_LOG_STATUS_ENUM.INVALID_EMAIL,
        });
      }
      return BrevoService.sendEmail({
        sender: {
          name: EmailHelper.getFromName(),
          email: EmailHelper.getFromEmail(),
        },
        htmlContent: data.html,
        subject: data.subject,
        to: [
          {
            email: data.to[0],
            // "name":"John Doe"
          },
        ],
      })
        .then(async (response) => {
          await EmailLogService.update(data._id, {
            logId: response.data.id,
            status: EMAIL_LOG_STATUS_ENUM.PENDING,
          });
          return BrevoResponse.checkResponse(response, 'send email');
        })
        .catch((err) => {
          return BrevoResponse.checkErrorResponse(err, 'send email');
        });
    }
    return EmailLogService.update(data._id, {
      status: EMAIL_LOG_STATUS_ENUM.INVALID_EMAIL,
    });
  },
};
export default EmailLogHelper;
