import { model, Schema } from 'mongoose';
import { BusinessDocument } from './business.document';
import { BusinessModelInterface } from '../interface/business-model.interface';

export const BUSINESS_STATUS_ENUM = {
  ACTIVE: 'Active',
  INVITED: 'Invited',
  PENDING: 'Pending',
  SUSPENDED: 'Suspended',
};

const BusinessSchema = new Schema(
  {
    address: String,
    city: String,
    country: String,
    email: String,
    employees: [{ type: Schema.Types.ObjectId, ref: 'Rider' }],
    name: String,
    password: String,
    status: {
      type: String,
      enum: [
        BUSINESS_STATUS_ENUM.ACTIVE,
        BUSINESS_STATUS_ENUM.INVITED,
        BUSINESS_STATUS_ENUM.PENDING,
        BUSINESS_STATUS_ENUM.SUSPENDED,
      ],
      default: BUSINESS_STATUS_ENUM.PENDING,
    },
  },
  { timestamps: true },
);

const BusinessModel = model<BusinessDocument, BusinessModelInterface>(
  'Business',
  BusinessSchema,
);

export default BusinessModel;
