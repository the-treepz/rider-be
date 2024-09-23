import { Types } from 'mongoose';
import { TripInterface } from '../../trip/interface/trip.interface';
import { WalletInterface } from '../../wallet/interface/wallet.interface';

export interface RiderInterface {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  status: string;
  alternativeEmail: string;
  defaultPassword: string;
  wallet: WalletInterface['_id'];
}
export interface FindUserInterface {
  email?: string;
  phoneNumber?: string;
  _id?: RiderInterface['_id'];
  otp?: string;
}
export interface CreateRiderInterface {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateUserInterface {
  firstName?: string;
  lastName?: string;
  status?: string;
  otp?: string;
  password?: string;
  trips?: TripInterface['_id'] | Types.ObjectId[]; // Update to an array of ObjectId
  wallet?: WalletInterface['_id'];
}
