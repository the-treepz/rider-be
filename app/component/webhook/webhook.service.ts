import WebhookRepository from './repository/webhook.repository';
import { CreateWebhookInterface } from './interface/webhook.interface';

const WebhookService = {
  async create(data: CreateWebhookInterface) {
    return WebhookRepository.create(data);
  },
};
export default WebhookService;
