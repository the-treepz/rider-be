import { EmailLogInterface } from '../../../lib/email/interface/email.interface';
import EmailLogService from '../../../lib/email/email-log.service';
import WebhookHelper from './webhook.helper';

const WebhookDeliveredEmailHelper = {
  async handleDeliveredEvent(data: {
    emailId: EmailLogInterface['_id'];
    email: string;
    subject: string;
    type: string;
  }) {
    const { emailId, type } = data;
    await EmailLogService.update(emailId, {
      status: WebhookHelper.getEmailStatusFromWebhook(type),
    });
    await EmailLogService.addEvents(
      emailId,
      WebhookHelper.getEmailStatusFromWebhook(type),
    );
    return EmailLogService.update(emailId, {
      status: WebhookHelper.getEmailStatusFromWebhook(type),
    });
  },
};
export default WebhookDeliveredEmailHelper;
