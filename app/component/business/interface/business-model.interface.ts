import { Model } from 'mongoose';
import { BusinessDocument } from '../repository/business.document';
import { BusinessInterface } from './business.interface';

export interface BusinessModelInterface extends Model<BusinessDocument> {
  build(attr: BusinessInterface): BusinessDocument;
}
