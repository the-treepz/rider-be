import { model, Schema } from 'mongoose';
import { EmailLogDocument } from './email-log.document';
import { EmailLogModelInterface } from '../interface/email-log-model.interface';
import {
  EMAIL_LOG_SOURCE_ENUM,
  EMAIL_LOG_STATUS_ENUM,
} from '../email-log.constant';

const EmailLogSchema = new Schema(
  {
    logId: { type: String, default: '' },
    retryHandled: { type: Boolean, default: false },
    from: String,
    html: String,
    status: {
      type: String,
      enum: EMAIL_LOG_STATUS_ENUM,
      default: EMAIL_LOG_STATUS_ENUM.PENDING,
    },
    events: {
      type: [String], // Array of strings
      default: [], // Optional: Default value if none provided
    },
    source: {
      type: String,
      enum: [EMAIL_LOG_SOURCE_ENUM.BREVO],
      default: EMAIL_LOG_SOURCE_ENUM.BREVO,
    },
    subject: String,
    to: Array,
    linksClicked: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const EmailLogModel = model<EmailLogDocument, EmailLogModelInterface>(
  'EmailLog',
  EmailLogSchema,
);

export default EmailLogModel;
