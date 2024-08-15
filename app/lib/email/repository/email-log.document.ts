import { Types } from 'mongoose';

export interface EmailLogDocument extends Document {
  _id: Types.ObjectId;
  logId: string;
  from: string;
  html: string;
  source: string;
  subject: string;
  to: Array<string>;
  retryHandled: boolean;
  events: string[];
  linksClicked: string[];
}
