import { Types } from 'mongoose';
import { UserInterface } from '../../user/interface/user.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';

export interface TripInterface {
  _id: Types.ObjectId;
  checkInType: string;
  dropOffLocation: string;
  checkOutTime: Date;
  checkInTime: Date;
  rider: UserInterface['_id'];
  checkInDates: Array<Date>;
}
export interface FindTripInterface {
  _id?: TripInterface['_id'] | string;
  business?: UserInterface['_id'] | UnknownInterface;
  rider?: { $in: Array<UserInterface['_id']> };
  from?: string;
  to?: string;
  checkInType?: string;
  checkOutTime?: Date | UnknownInterface;
  checkInTime?: UnknownInterface;
}
export interface CreateTripInerfacee {
  rider: UserInterface['_id'];
  checkInTime: Date;
  checkInType: string;
}

export interface WeeklyChecInInterface {
  rider: UserInterface['_id'];
  checkInTime: Date; // The time the weekly check-in is created
  checkInType: string;
  checkInDates: any;
}

export interface WeekdlyCheckoutInterface {
  rider: UserInterface['_id'];
  checkOutTime: null | UnknownInterface; // Only find trips that have not been checked out
  checkInType: 'Weekly'; //
}
