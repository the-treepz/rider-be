import { Model } from 'mongoose';
import { RiderDocument } from '../repository/rider.document';
import { RiderInterface } from './rider.interface';

export interface RiderModelInterface extends Model<RiderDocument> {
  build(attr: RiderInterface): RiderDocument;
}
