import { model, Schema } from 'mongoose';
import { RiderDocument } from './rider.document';
import { UserModelInterface } from '../interface/user-model.interface';

export const USER_STATUS_ENUM = {
  ACTIVE: 'Active',
  INVITED: 'Invited',
  PENDING: 'Pending',
  SUSPENDED: 'Suspended',
  UNVERIFIED: 'Unverified',
};

const RiderSchema = new Schema(
  {
    otpId: String,
    email: String,
    firstName: String,
    lastName: String,
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
  },
  { timestamps: true },
);

const RiderModel = model<RiderDocument, UserModelInterface>(
  'Rider',
  RiderSchema,
);

export default RiderModel;
