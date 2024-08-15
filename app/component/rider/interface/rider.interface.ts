import { Types } from 'mongoose';

export interface RiderInterface {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  status: string;
}
export interface FindRiderInterface {
  email?: string;
  phoneNumber?: string;
  _id?: RiderInterface['_id'];
}
export interface CreateRiderInterface {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateBusinessInterface {
  firstName?: string;
  lastName?: string;
  status?: string;
}
