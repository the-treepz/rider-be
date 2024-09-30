import { model, Schema } from 'mongoose';
import { TransactionDocument } from './transaction.document';
import { TransactionModelInterface } from '../interface/transaction-model.interface';
const TRANSACTION_TYPE_ENUM = {
  DEBIT: 'Debit',
  CREDIT: 'Credit',
};
const TransactionSchema = new Schema(
  {
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
    type: {
      type: String,
      enum: [TRANSACTION_TYPE_ENUM.DEBIT, TRANSACTION_TYPE_ENUM.CREDIT],
      required: true,
    },
    amount: { type: Number, required: true },
    description: String,
    trip: { type: Schema.Types.ObjectId, ref: 'Trip' },
    reference: String,
  },
  { timestamps: true },
);

const TransactionModel = model<TransactionDocument, TransactionModelInterface>(
  'Transaction',
  TransactionSchema,
);

export default TransactionModel;
