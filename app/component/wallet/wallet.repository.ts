import WalletModel from './wallet.model';

class WalletRepository {
  public static async updateWithQuery(data: any, params: any) {
    try {
      return WalletModel.findOneAndUpdate(data, params, { new: true });
    } catch (e) {
      return e;
    }
  }

  public static async create(data: any) {
    try {
      return WalletModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async findOne(data: any) {
    try {
      return WalletModel.findOne(data);
    } catch (e) {
      return e;
    }
  }

  public static async update(user: any, query: any) {
    try {
      return WalletModel.findByIdAndUpdate(user, query, { new: true });
    } catch (e) {
      return e;
    }
  }
}
export default WalletRepository;
