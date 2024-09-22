import { model, Schema } from 'mongoose';
import { DriverDocument } from './driver.document';
import { DriverModelInterface } from '../interface/driver-model.interface';

export const DRIVER_STATUS_ENUM = {
  AVALIABLE: 'Available',
  BUSY: 'Busy',
  OFFLINE: 'Offline',
};

const DriverSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    trips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }],
    password: String,
    status: {
      type: String,
      enum: [
        DRIVER_STATUS_ENUM.AVALIABLE,
        DRIVER_STATUS_ENUM.BUSY,
        DRIVER_STATUS_ENUM.OFFLINE,
      ],
      default: DRIVER_STATUS_ENUM.OFFLINE,
    },
    location: {
      type: {
        type: String, // This will be "Point"
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    rating: { type: Number, default: 0 }, // Average rating
    vehicle: {
      make: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: Number, required: true },
      licensePlate: { type: String, required: true, unique: true },
    },
  },
  { timestamps: true },
);
// Create a geospatial index on location for efficient querying
DriverSchema.index({ location: '2dsphere' });
const DriverModel = model<DriverDocument, DriverModelInterface>(
  'Driver',
  DriverSchema,
);

export default DriverModel;
