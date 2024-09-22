import { Types } from 'mongoose';

export interface BusinessInterface {
  _id: Types.ObjectId;
  city: string;
  country: string;
  email: string;
  employees: Types.ObjectId[]; // Define the type for the employees field
  password: string;
  name: string;
  status: string;
}
export interface FindBusinessInterface {
  email?: string;
  _id?: BusinessInterface['_id'];
}
export interface CreateBusinessInterface {
  email: string;
  name: string;
  password: string;
}

export interface UpdateBusinessInterface {
  firstName?: string;
  lastName?: string;
  status?: string;
}
