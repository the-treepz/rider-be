import { MailInterface } from '../../../../lib/email/interface/email.interface';
import EmailLogService from '../../../../lib/email/email-log.service';
import {
  EMAIL_FROM,
  EMAIL_LOG_STATUS_ENUM,
} from '../../../../lib/email/email-log.constant';
import PlunkService from './plunk.service';
import { UnknownInterface } from '../../../../lib/unknown.interface';
import PlunkResponse from './plunk.response';

const Plunk = {
  async sendEmail(data: MailInterface) {
    const email = await EmailLogService.logEmail({
      from: EMAIL_FROM.PLUNK_EMAIL_FROM,
      html: data.html,
      source: 'Plunk',
      subject: data.subject,
      to: data.to,
    });
    return PlunkService.sendEmail({
      to: data.to,
      subject: data.subject,
      body: data.html,
    })
      .then(async (response) => {
        const result: UnknownInterface = PlunkResponse.checkResponse(
          response,
          'send email',
        );
        return EmailLogService.update(email._id, {
          logId: result.emails[0].email,
          status: EMAIL_LOG_STATUS_ENUM.PENDING,
        });
      })
      .catch((err) => {
        return PlunkResponse.checkErrorResponse(err, 'send email');
      });
  },
};
export default Plunk;
