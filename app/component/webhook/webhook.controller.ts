import { Request, Response } from 'express';
import ResponseHandler from '../../lib/response-handler';
import WebhookHelper from './helper/webhook.helper';
import { EMAIL_LOG_SOURCE_ENUM } from '../../lib/email/email-log.constant';
import Notification from '../../lib/notification';

class WebhookController {
  public brevo = async (request: Request, response: Response) => {
    const { email, event, subject, link } = request.body;
    const messageId = request.body['message-id'];
    if (event === 'request')
      return ResponseHandler.OkResponse(response, 'all good, i guess');
    if (event === 'click') {
      const { code, message } = await WebhookHelper.initiateHandleClickedEmail({
        type: event,
        source: EMAIL_LOG_SOURCE_ENUM.BREVO,
        email,
        subject,
        logId: messageId,
        link,
      });
      return ResponseHandler.SuccessResponse(response, code, message);
    }
    if (event === 'delivered') {
      const { code, message } =
        await WebhookHelper.initiateHandleDeliveredEmail({
          type: event,
          source: EMAIL_LOG_SOURCE_ENUM.BREVO,
          email,
          subject,
          logId: messageId,
        });
      return ResponseHandler.SuccessResponse(response, code, message);
    }
    if (event === 'unique_opened') {
      const { code, message } =
        await WebhookHelper.initiateHandleDeliveredEmail({
          type: event,
          source: EMAIL_LOG_SOURCE_ENUM.BREVO,
          email,
          subject,
          logId: messageId,
        });
      return ResponseHandler.SuccessResponse(response, code, message);
    }
    await Notification.notifyMe(
      JSON.stringify(request.body),
      'brevo status not handled by eng',
    );
    return ResponseHandler.OkResponse(
      response,
      'brevo status not handled by eng',
    );
  };
}

export default WebhookController;
