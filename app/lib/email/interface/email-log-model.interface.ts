import { Model } from 'mongoose';
import { EmailLogInterface } from './email.interface';
import { EmailLogDocument } from '../repository/email-log.document';

export interface EmailLogModelInterface extends Model<EmailLogDocument> {
  build(attr: EmailLogInterface): EmailLogDocument;
}
