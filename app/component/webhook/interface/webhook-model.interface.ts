import { Model } from 'mongoose';
import { WebhookDocument } from '../repository/webhook.document';
import { WebhookInterface } from './webhook.interface';

export interface WebhookModelInterface extends Model<WebhookDocument> {
  build(attr: WebhookInterface): WebhookDocument;
}
