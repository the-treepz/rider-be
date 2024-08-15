import { Types } from 'mongoose';
import { RiderInterface } from '../../rider/interface/rider.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';
import { EmployeeInterface } from '../../employee/interface/employee.interface';

export interface TripInterface {
  _id: Types.ObjectId;
  batteryCapacity: string;
  logo: string;
  model: string;
  fuel: string;
  size: string;
  transmission: string;
  year: string;
  status: string;
  images: Array<string>;
}
export interface CreateCarInterface {
  batteryCapacity: string;
  size: string;
  logo: string;
  model: string;
  fuel: string;
  transmission: string;
  year: string;
  images: Array<string>;
}
export interface FindTripInterface {
  _id?: TripInterface['_id'] | string;
  business?: RiderInterface['_id'] | UnknownInterface;
  employee?: { $in: Array<EmployeeInterface['_id']> };
  from?: string;
  to?: string;
}
