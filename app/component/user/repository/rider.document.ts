import { Document, Types } from 'mongoose';
import { WalletInterface } from '../../wallet/interface/wallet.interface';

export interface RiderDocument extends Document {
  _id: Types.ObjectId;
  address: string;
  city: string;
  country: string;
  email: string;
  password: string;
  name: string;
  status: string;
  otp: string;
  wallet: WalletInterface['_id'];
}
