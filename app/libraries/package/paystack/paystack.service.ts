import { FundWllatInterface } from '../../../component/wallet/interface/wallet.interface';
import EnvHelper from '../../../config/env.helper';

const { Paystack } = require('paystack-pay');

// Initialize Paystack with your secret key
const paystack = new Paystack(EnvHelper.getPaystackSecretKey());
const PaystackService = {
  async makePayment(data: FundWllatInterface) {
    const { amount, rider, reference, email } = data;
    return paystack.transaction.initialize({
      channels: ['card', 'bank'], // Optional - specify payment channels
      amount: amount * 100, // Required - the amount in kobo (e.g., 5000 kobo is 50 Naira)
      email, // Required - customer's email address
      callback_url: EnvHelper.getAppUrl(), // Required - callback URL for after payment
      metadata: { rider }, // Optional - additional information
      reference: reference, // Required - unique transaction reference
    });
  },
};
export default PaystackService;
