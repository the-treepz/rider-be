import { FundWllatInterface } from '../../../component/wallet/interface/wallet.interface';
import PaystackService from './paystack.service';
import PaystackResponse from './paystack.response';

const Paystack = {
  async makePayment(data: FundWllatInterface) {
    return PaystackService.makePayment(data)
      .then(async (response) => {
        return PaystackResponse.checkResponse(response, 'send email');
      })
      .catch((err) => {
        return PaystackResponse.checkErrorResponse(err, 'send email');
      });
  },
};
export default Paystack;
