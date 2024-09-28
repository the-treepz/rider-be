import { Types } from 'mongoose';
import { RiderInterface } from '../../user/interface/rider.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';
import { DriverInterface } from '../../driver/interface/driver.interface';

export interface TripInterface {
  _id: Types.ObjectId;
  createdAt: Date;
  checkInType: string;
  status: string;
  checkoutType: string;
  dropOffLocation: { latitude: number; longitude: number };
  pickUpLocation: { latitude: number; longitude: number };
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
export interface CreateTripInterface {
  rider: RiderInterface['_id'];
  pickUpLocation?: {
    latitude: number;
    longitude: number;
  };
  dropOffLocation?: {
    latitude: number;
    longitude: number;
  };
  driver?: DriverInterface['_id'];
  estimatedPickUpTime?: Date | UnknownInterface; // Consider using Date for actual time
  estimatedDropOffTime?: Date | UnknownInterface; // Optional for one-way trips
  tripType?: string; // 'round' | 'one-way';
  bookingFor?: string; // 'self' | 'others';
  details?: {
    name: string; // Required if booking for others
    phoneNumber: string; // Required if booking for others
  };
  checkInTime?: Date | UnknownInterface;
  checkInType?: string;
  fare?: number;
  status?: string;
}

export interface WeekdlyCheckoutInterface {
  rider: RiderInterface['_id'];
  checkOutTime: null | UnknownInterface; // Only find trips that have not been checked out
  checkInType: 'Weekly'; //
}
