import WalletController from './wallet.controller';
import { Application } from 'express';
import { GET_WALLET } from './wallet.url';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';

class WalletRoute {
  public walletController: WalletController = new WalletController();

  public routes = (app: Application): void => {
    app
      .route(`${GET_WALLET}`)
      .get(
        asyncHandler(requireAuthorization),
        asyncHandler(this.walletController.get),
      );
  };
}

export default WalletRoute;
