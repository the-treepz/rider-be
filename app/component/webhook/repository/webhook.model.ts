import { model, Schema } from 'mongoose';
import { WebhookDocument } from './webhook.document';
import { WebhookModelInterface } from '../interface/webhook-model.interface';

const WebhookSchema = new Schema(
  {
    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },
    source: String,
  },
  { timestamps: true },
);

const WebhookModel = model<WebhookDocument, WebhookModelInterface>(
  'Webhook',
  WebhookSchema,
);

export default WebhookModel;
