import { Model } from 'mongoose';
import { TripDocument } from '../repository/trip.document';
import { TripInterface } from './trip.interface';

export interface TripModelInterface extends Model<TripDocument> {
  build(attr: TripInterface): TripDocument;
}
