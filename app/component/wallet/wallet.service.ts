import { RiderInterface } from '../user/interface/rider.interface';
import WalletModel from './repository/wallet.model';

const WalletService = {
  async create(user: RiderInterface['_id']) {
    return WalletModel.create({ user });
  },
  async get(user: RiderInterface['_id']) {
    return WalletModel.create({ user });
  },
};
export default WalletService;
