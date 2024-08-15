import { Types } from 'mongoose';

export interface OtpInterface {
  _id: Types.ObjectId;
  otpExpires: Date;
  otp: string;
  status: string;
}
