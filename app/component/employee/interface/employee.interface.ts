import { Types } from 'mongoose';
import { RiderInterface } from '../../rider/interface/rider.interface';

export interface EmployeeInterface {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}
export interface FindEmployeeInterface {
  _id?: EmployeeInterface['_id'] | string;
  business?: RiderInterface['_id'];
  email?: string;
}
export interface UpdateEmployeeInterface {
  firstName?: string;
  lastName?: string;
  status?: string;
}
export interface CreateEmployeeInterface {
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  business: RiderInterface['_id'];
}

export interface InviteEmployeeInterface {
  businessName: RiderInterface['name'];
  email: EmployeeInterface['email'];
  firstName: EmployeeInterface['firstName'];
}
