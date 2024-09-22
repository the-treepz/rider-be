import { Types } from 'mongoose';
import { TripInterface } from '../../trip/interface/trip.interface';
import { RiderInterface } from '../../user/interface/rider.interface';

export interface WalletInterface {
  _id: Types.ObjectId;
  user: RiderInterface['_id'];
}
export interface FindUserInterface {
  email?: string;
  phoneNumber?: string;
  _id?: WalletInterface['_id'];
  otpId?: string;
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
  otpId?: string;
  password?: string;
  trips?: TripInterface['_id'] | Types.ObjectId[]; // Update to an array of ObjectId
}
