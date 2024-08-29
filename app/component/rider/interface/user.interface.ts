import { Types } from 'mongoose';

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
}
