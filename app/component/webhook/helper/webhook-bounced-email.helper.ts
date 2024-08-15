import { EmailLogInterface } from '../../../lib/email/interface/email.interface';
import {
  EMAIL_LOG_STATUS_ENUM,
  EMAIL_SUBJECT,
} from '../../../lib/email/email-log.constant';
import EmailLogService from '../../../lib/email/email-log.service';
import Notification from '../../../lib/notification';

const WebhookBouncedEmailHelper = {
  async handleBouncedEvent(data: {
    emailId: EmailLogInterface['_id'];
    email: string;
    messageId: string;
    subject: string;
    source: EmailLogInterface['source'];
  }) {
    const { emailId, email, messageId, subject, source } = data;
    const trimmedSubject = subject.trim();

    if (trimmedSubject === EMAIL_SUBJECT.NEW_APPLICATION_TO_ADMIN) {
      return EmailLogService.update(emailId, {
        status: EMAIL_LOG_STATUS_ENUM.BOUNCED,
        source,
        logId: messageId,
      });
    }

    await EmailLogService.update(emailId, {
      status: EMAIL_LOG_STATUS_ENUM.BOUNCED,
      source,
      logId: messageId,
    });
    return Notification.notifyMe(
      `${messageId}, ${subject}, ${email}`,
      `${subject} || unable to handle this blocked email in helper`,
    );
  },
};
export default WebhookBouncedEmailHelper;
