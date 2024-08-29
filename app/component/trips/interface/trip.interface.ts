import { Types } from 'mongoose';
import { UserInterface } from '../../rider/interface/user.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';

export interface TripInterface {
  _id: Types.ObjectId;
  checkInType: string;
  dropOffLocation: string;
  checkOutTime: Date;
  checkInTime: Date;
  rider: UserInterface['_id'];
}
export interface FindTripInterface {
  _id?: TripInterface['_id'] | string;
  business?: UserInterface['_id'] | UnknownInterface;
  rider?: { $in: Array<UserInterface['_id']> };
  from?: string;
  to?: string;
  checkInType?: string;
  checkOutTime?: Date | null;
}
export interface CreateTripInerfacee {
  rider: UserInterface['_id'];
  checkInTime: Date;
  checkInType: string;
}
