import { Model } from 'mongoose';
import { RiderDocument } from '../repository/rider.document';
import { UserInterface } from './user.interface';

export interface UserModelInterface extends Model<RiderDocument> {
  build(attr: UserInterface): RiderDocument;
}
