import { Model } from 'mongoose';
import { DriverDocument } from '../repository/driver.document';
import { DriverInterface } from './driver.interface';

export interface DriverModelInterface extends Model<DriverDocument> {
  build(attr: DriverInterface): DriverDocument;
}
