import { CreateWebhookInterface } from '../interface/webhook.interface';
import WebhookModel from './webhook.model';

class WebhookRepository {
  public static async create(data: CreateWebhookInterface) {
    try {
      return WebhookModel.create(data);
    } catch (e) {
      return e;
    }
  }
}
export default WebhookRepository;
