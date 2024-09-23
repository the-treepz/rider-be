import { model, Schema } from 'mongoose';
import { RiderDocument } from './rider.document';
import { RiderModelInterface } from '../interface/rider-model.interface';
export const USER_STATUS_ENUM = {
  ACTIVE: 'Active',
  INVITED: 'Invited',
  PENDING: 'Pending',
  SUSPENDED: 'Suspended',
  UNVERIFIED: 'Unverified',
};

const RiderSchema = new Schema(
  {
      otp: String,
    email: String,
    firstName: String,
    lastName: String,
    alternativeEmail: String,
    status: {
      type: String,
      enum: [
        USER_STATUS_ENUM.ACTIVE,
        USER_STATUS_ENUM.INVITED,
        USER_STATUS_ENUM.PENDING,
        USER_STATUS_ENUM.SUSPENDED,
        USER_STATUS_ENUM.UNVERIFIED,
      ],
      default: USER_STATUS_ENUM.UNVERIFIED,
    },
    phoneNumber: String,
    business: { type: Schema.Types.ObjectId, ref: 'Business' },
    password: String,
    defaultPassword: String,
    trips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }],
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
  },
  { timestamps: true },
);

const RiderModel = model<RiderDocument, RiderModelInterface>(
  'Rider',
  RiderSchema,
);

export default RiderModel;
