import { Types } from 'mongoose';
import { TripInterface } from '../../trip/interface/trip.interface';
import { WalletInterface } from '../../wallet/interface/wallet.interface';

export interface TransctionInterface {
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
  deviceToken: String;
  notificationPreferences: {
    promotions: {
      email: { type: Boolean };
      sms: { type: Boolean };
      push: { type: Boolean };
    };
    trips: {
      email: { type: Boolean };
      sms: { type: Boolean };
      push: { type: Boolean };
    };
    products: {
      email: { type: Boolean };
      sms: { type: Boolean };
      push: { type: Boolean };
    };
  };
}
export interface FindUserInterface {
  email?: string;
  phoneNumber?: string;
  _id?: TransctionInterface['_id'];
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
  notificationPreferences?: {
    promotions?: {
      email: { type?: boolean };
      sms: { type?: boolean };
      push: { type?: boolean };
    };
    trips?: {
      email: { type?: boolean };
      sms: { type?: boolean };
      push: { type?: boolean };
    };
    products?: {
      email: { type?: boolean };
      sms: { type?: boolean };
      push: { type?: boolean };
    };
  };
  defaultPassword?: null;
  firstName?: string;
  lastName?: string;
  status?: string;
  otp?: string;
  password?: string;
  trips?: TripInterface['_id'] | Types.ObjectId[]; // Update to an array of ObjectId
  wallet?: WalletInterface['_id'];
}
