import { Model } from 'mongoose';
import { TransactionDocument } from '../repository/transaction.document';
import { TransctionInterface } from './transction.interface';

export interface TransactionModelInterface extends Model<TransactionDocument> {
  build(attr: TransctionInterface): TransactionDocument;
}
