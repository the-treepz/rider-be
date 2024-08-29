import { Document, Types } from 'mongoose';
import { EmployeeInterface } from '../../employee/interface/employee.interface';

export interface TripDocument extends Document {
  _id: Types.ObjectId;
  checkInType: string;
  dropOffLocation: string;
  checkOutTime: Date;
  checkInTime: Date;
  employee: EmployeeInterface['_id'];
}
