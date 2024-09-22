import { Document, Types } from 'mongoose';

export interface DriverDocument extends Document {
  _id: Types.ObjectId;
  address: string;
  firstName: string;
  location: any;
  vehicle: any;
  city: string;
  country: string;
  email: string;
  employees: Types.ObjectId[]; // Define the type for the employees field
  password: string;
  name: string;
  status: string;
}
