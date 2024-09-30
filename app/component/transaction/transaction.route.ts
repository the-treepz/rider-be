import TransactionController from './transaction.controller';
import { Application } from 'express';
import { GET_TRANSACTION } from './transaction.url';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';

class TransactionRoute {
  public transactionController: TransactionController =
    new TransactionController();

  public routes = (app: Application): void => {
    app
      .route(`${GET_TRANSACTION}`)
      .get(
        asyncHandler(requireAuthorization),
        asyncHandler(this.transactionController.get),
      );
  };
}

export default TransactionRoute;
