import { model, Schema } from 'mongoose';
import { TripDocument } from './trip.document';
import { TripModelInterface } from '../interface/trip-model.interface';

const TripSchema = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
    checkInTime: Date,
    checkOutTime: { type: Date, default: null },
    dropOffLocation: String,
  },
  { timestamps: true },
);

const TripModel = model<TripDocument, TripModelInterface>('Trip', TripSchema);

export default TripModel;
