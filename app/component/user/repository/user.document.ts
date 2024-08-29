import { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  address: string;
  city: string;
  country: string;
  email: string;
  employees: Types.ObjectId[]; // Define the type for the employees field
  password: string;
  name: string;
  status: string;
  otp: string;
}
