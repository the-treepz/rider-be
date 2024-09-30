import { Model } from 'mongoose';
import { WalletInterface } from './wallet.interface';
import { WalletDocument } from '../repository/wallet.document';

export interface WalletModelInterface extends Model<WalletDocument> {
  build(attr: WalletInterface): WalletDocument;
}
