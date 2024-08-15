import { Document, Types } from 'mongoose';
import { UnknownInterface } from '../../../lib/unknown.interface';

export interface WebhookDocument extends Document {
  _id: Types.ObjectId;
  payload: UnknownInterface;
  source: string;
}
