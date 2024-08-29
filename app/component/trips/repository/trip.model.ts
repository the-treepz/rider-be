import { model, Schema } from 'mongoose';
import { TripDocument } from './trip.document';
import { TripModelInterface } from '../interface/trip-model.interface';

const TripSchema = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    rider: { type: Schema.Types.ObjectId, ref: 'Rider' },
    checkInTime: Date,
    checkOutTime: { type: Date, default: null },
    dropOffLocation: String,
    checkInType: { type: String, enum: ['Daily', 'Weekly'], required: true }, // New field
  },
  { timestamps: true },
);

const TripModel = model<TripDocument, TripModelInterface>('Trip', TripSchema);

export default TripModel;
