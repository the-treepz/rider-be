import { RiderInterface } from '../user/interface/rider.interface';
import WalletModel from './wallet.model';

const WalletService = {
  async create(user: RiderInterface['_id']) {
    return WalletModel.create({ user });
  },
};
export default WalletService;
