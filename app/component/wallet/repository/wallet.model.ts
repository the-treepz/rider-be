import { model, Schema } from 'mongoose';
import { WalletDocument } from './wallet.document';
import { WalletModelInterface } from '../interface/wallet-model.interface';
import { ENVIRONMENT } from '../../../config/secrets';

const WaletSchema = new Schema(
  {
    amount: { type: Number, default: ENVIRONMENT === 'staging' ? 300000 : 0 },
    rider: { type: Schema.Types.ObjectId, ref: 'Rider' },
  },
  { timestamps: true },
);

const WalletModel = model<WalletDocument, WalletModelInterface>(
  'Wallet',
  WaletSchema,
);

export default WalletModel;
