/* eslint-disable camelcase */
import { Types } from 'mongoose';
import { UnknownInterface } from '../../unknown.interface';

export interface MailAttachmentInterface {
  filename: string;
  type: string;
  content: string;
  content_id: string;
  disposition: string;
}

export interface MailInterface {
  attachments?: MailAttachmentInterface | UnknownInterface;
  from: { email: string; name?: string } | UnknownInterface;
  subject: string;
  to: string | Array<string> | UnknownInterface;
  html: string;
  text?: string;
}

export interface FindEmailInterface {
  logId?: string;
  _id?: EmailLogInterface['_id'];
}

export interface CreateEmailInterface {
  from: MailInterface['from'];
  html: string;
  subject: string;
  to: MailInterface['to'];
  source?: string;
}

export interface EmailLogInterface {
  _id: Types.ObjectId;
  logId: string;
  from: string;
  html: string;
  source: string;
  subject: string;
  to: Array<string>;
  retryHandled: boolean;
  status: string;
  events: string[];
  linksClicked: string[];
}

export interface UpdateEmailLogInterface {
  logId?: string;
  status?: string;
  source?: string;
  retryHandled?: boolean;
}
