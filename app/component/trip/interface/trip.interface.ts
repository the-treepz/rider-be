import { Types } from 'mongoose';
import { RiderInterface } from '../../user/interface/rider.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';

export interface TripInterface {
  _id: Types.ObjectId;
  checkInType: string;
  dropOffLocation: string;
  checkOutTime: Date;
  checkInTime: Date;
  rider: RiderInterface['_id'];
  checkInDates: Array<Date>;
}
export interface FindTripInterface {
  _id?: TripInterface['_id'] | string;
  business?: RiderInterface['_id'] | UnknownInterface;
  rider?: { $in: Array<RiderInterface['_id']> };
  from?: string;
  to?: string;
  checkInType?: string;
  checkOutTime?: Date | UnknownInterface;
  checkInTime?: UnknownInterface;
}
export interface CreateTripInerfacee {
  rider: RiderInterface['_id'];
  checkInTime: Date;
  checkInType: string;
}

export interface WeeklyChecInInterface {
  rider: RiderInterface['_id'];
  checkInTime: Date; // The time the weekly check-in is created
  checkInType: string;
  checkInDates: any;
}

export interface WeekdlyCheckoutInterface {
  rider: RiderInterface['_id'];
  checkOutTime: null | UnknownInterface; // Only find trips that have not been checked out
  checkInType: 'Weekly'; //
}
