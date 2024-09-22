import { model, Schema } from 'mongoose';
import { TripDocument } from './trip.document';
import { TripModelInterface } from '../interface/trip-model.interface';
export const driver_STATUS_ENUM = {
  CONFIRMED: 'Confirmed',
};
const TripSchema = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    rider: { type: Schema.Types.ObjectId, ref: 'Rider' },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
    checkInTime: Date,
    checkOutTime: { type: Date, default: null },
    dropOffLocation: { latitude: Number, longitude: Number },
    pickUpLocation: { latitude: Number, longitude: Number },
    checkInType: { type: String, enum: ['Daily', 'Weekly'] },
    checkInDates: [{ type: Date }],
  },
  { timestamps: true },
);

const TripModel = model<TripDocument, TripModelInterface>('Trip', TripSchema);

export default TripModel;
