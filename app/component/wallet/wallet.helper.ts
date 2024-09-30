import Paystack from '../../libraries/package/paystack/paystack';
import { FundWllatInterface } from './interface/wallet.interface';
import OtpService from '../otp/otp.service';
import TransactionModel from '../transaction/repository/transaction.model';

const WalletHelper = {
  async getReference() {
    const { otpId: reference } = await OtpService.generateOtpDetail();
    const find = await TransactionModel.find({ reference: `TRP-${reference}` });
    if (find) {
      const { otpId: referenceY } = await OtpService.generateOtpDetail();
      return `TRP-${referenceY}`;
    }
    return `TRP-${reference}`;
  },
  async makePayment(params: FundWllatInterface) {
    const { data } = await Paystack.makePayment(params);
    return data;
  },
};
export default WalletHelper;
