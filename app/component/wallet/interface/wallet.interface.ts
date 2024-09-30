import { Types } from 'mongoose';
import { RiderInterface } from '../../user/interface/rider.interface';

export interface WalletInterface {
  _id: Types.ObjectId;
  user: RiderInterface['_id'];
}
export interface FundWllatInterface {
  amount: number;
  rider: RiderInterface['_id'];
  reference: string;
  email: RiderInterface['email'];
}
