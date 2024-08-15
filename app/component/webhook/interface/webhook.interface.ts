import { Types } from 'mongoose';
import { UnknownInterface } from '../../../lib/unknown.interface';

export interface WebhookInterface {
  _id: Types.ObjectId;
  payload: UnknownInterface;
  source: string;
}

export interface CreateWebhookInterface {
  payload: UnknownInterface;
  source: string;
}
