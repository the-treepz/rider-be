import { Types } from 'mongoose';
import { TripInterface } from '../../trip/interface/trip.interface';

export interface UserInterface {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  status: string;
  alternativeEmail: string;
}
export interface FindUserInterface {
  email?: string;
  phoneNumber?: string;
  _id?: UserInterface['_id'];
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
