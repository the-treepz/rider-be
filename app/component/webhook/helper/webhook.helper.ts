import { StatusCodes } from 'http-status-codes';
import { EMAIL_LOG_STATUS_ENUM } from '../../../lib/email/email-log.constant';
import { EmailLogInterface } from '../../../lib/email/interface/email.interface';
import EmailLogService from '../../../lib/email/email-log.service';
import WebhookDeliveredEmailHelper from './webhook-delivered-email.helper';

const WebhookHelper = {
  getEmailStatusFromWebhook(status: string) {
    if (status === 'blocked') {
      return EMAIL_LOG_STATUS_ENUM.BLOCKED;
    }
    if (status === 'email.delivered') {
      return EMAIL_LOG_STATUS_ENUM.DELIVERED;
    }
    if (status === 'email.bounced') {
      return EMAIL_LOG_STATUS_ENUM.BOUNCED;
    }
    if (status === 'deferred') {
      return EMAIL_LOG_STATUS_ENUM.DEFERRED;
    }
    if (status === 'error') {
      return EMAIL_LOG_STATUS_ENUM.ERROR;
    }
    if (status === 'hard_bounce') {
      return EMAIL_LOG_STATUS_ENUM.HARD_BOUNCE;
    }
    if (status === 'invalid_email') {
      return EMAIL_LOG_STATUS_ENUM.INVALID_EMAIL;
    }
    if (status === 'blocked') {
      return EMAIL_LOG_STATUS_ENUM.PENDING;
    }
    if (status === 'blocked') {
      return EMAIL_LOG_STATUS_ENUM.BLOCKED;
    }
    if (status === 'blocked') {
      return EMAIL_LOG_STATUS_ENUM.SOFT_BOUNCE;
    }
    if (status === 'spam') {
      return EMAIL_LOG_STATUS_ENUM.SPAM;
    }
    if (status === 'delivered') {
      return EMAIL_LOG_STATUS_ENUM.DELIVERED;
    }
    if (status === 'email.clicked') {
      return EMAIL_LOG_STATUS_ENUM.CLICKED;
    }
    if (status === 'email.bounced') {
      return EMAIL_LOG_STATUS_ENUM.BOUNCED;
    }
    if (status === 'unique_opened') {
      return EMAIL_LOG_STATUS_ENUM.UNIQUE_OPENED;
    }
    return EMAIL_LOG_STATUS_ENUM.BLOCKED;
  },
  /**
   * @param data
   */
  async handleClickedEvent(data: {
    emailId: EmailLogInterface['_id'];
    email: string;
    subject: string;
    type: string;
    link: string;
  }) {
    const { emailId, type, link } = data;
    await EmailLogService.update(emailId, {
      status: this.getEmailStatusFromWebhook(type),
    });
    await EmailLogService.addEvents(emailId, EMAIL_LOG_STATUS_ENUM.CLICKED);
    return EmailLogService.linksClicked(emailId, link);
  },

  async initiateHandleClickedEmail(data: {
    type: string;
    subject: string;
    logId: string;
    email: string;
    source: string;
    link: string;
  }) {
    const { logId, email, subject, type, link } = data;
    const findEmail = await EmailLogService.findEmail({
      logId,
    });
    await this.handleClickedEvent({
      emailId: findEmail._id,
      email,
      subject,
      type,
      link,
    });
    return { message: 'email clicked', code: StatusCodes.OK };
  },
  async initiateHandleDeliveredEmail(data: {
    type: string;
    subject: string;
    logId: string;
    email: string;
    source: string;
  }) {
    const { logId, email, subject, type } = data;
    const findEmail = await EmailLogService.findEmail({
      logId,
    });
    await WebhookDeliveredEmailHelper.handleDeliveredEvent({
      emailId: findEmail._id,
      email,
      subject,
      type,
    });
    return { message: 'email delivered/unique opened', code: StatusCodes.OK };
  },
};
export default WebhookHelper;
