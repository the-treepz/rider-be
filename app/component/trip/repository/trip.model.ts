import { model, Schema } from 'mongoose';
import { TripDocument } from './trip.document';
import { TripModelInterface } from '../interface/trip-model.interface';
import { USER_STATUS_ENUM } from '../../user/repository/rider.model';
export const TRIP_STATUS_ENUM = {
  CONFIRMED: 'Confirmed',
  CANCELED: 'Canceled',
  PENDING: 'Pending',
  SCHEDULED: 'Scheduled',
};
const TripSchema = new Schema(
  {
    fare: Number,
    status: {
      type: String,
      enum: [
          TRIP_STATUS_ENUM.CONFIRMED,
          TRIP_STATUS_ENUM.PENDING,
        TRIP_STATUS_ENUM.CANCELED,
        TRIP_STATUS_ENUM.SCHEDULED,
      ],
      default: TRIP_STATUS_ENUM.PENDING,
    },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    rider: { type: Schema.Types.ObjectId, ref: 'Rider' },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
    checkInTime: Date,
    checkOutTime: { type: Date, default: null },
    dropOffLocation: { latitude: Number, longitude: Number },
    pickUpLocation: { latitude: Number, longitude: Number },
    checkInType: { type: String, enum: ['Daily', 'Weekly'] },
    tripType: String,
    checkInDates: [{ type: Date }],
    bookingFor: String,
    details: { name: String, phoneNumber: String },
  },
  { timestamps: true },
);

const TripModel = model<TripDocument, TripModelInterface>('Trip', TripSchema);

export default TripModel;
