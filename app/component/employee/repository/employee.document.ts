import { Document, Types } from 'mongoose';
import { RiderInterface } from '../../rider/interface/rider.interface';

export interface EmployeeDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  business: RiderInterface['_id'];
}
