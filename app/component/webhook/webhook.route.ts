import { Application } from 'express';
import WebhookController from './webhook.controller';
import * as url from './webhook.url';
import { asyncHandler } from '../../middleware/async-handler';

class WebhookRoute {
  public webhookController: WebhookController = new WebhookController();

  public routes = (app: Application): void => {
    app.route(`${url.BREVO}`).post(asyncHandler(this.webhookController.brevo));
  };
}

export default WebhookRoute;
