import { Document, Types } from 'mongoose';
import { RiderInterface } from '../../user/interface/rider.interface';

export interface TripDocument extends Document {
  _id: Types.ObjectId;
  checkInType: string;
  checkOutTime: Date;
  checkInTime: Date;
  rider: RiderInterface['_id'];
  pickUpLocation: { latitude: number; longitude: number };
  dropOffLocation: { latitude: number; longitude: number };
}
