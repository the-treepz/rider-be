import { Application } from 'express';
import RiderController from './rider.controller';
import { EDIT_USER, GET_USER } from './ridr.url';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';
import RiderValidation from './rider.validation';

class RiderRoute {
  public userController: RiderController = new RiderController();

  public routes = (app: Application): void => {
    app
      .route(`${EDIT_USER}`)
      .put(
        asyncHandler(requireAuthorization),
        asyncHandler(RiderValidation.update),
        asyncHandler(this.userController.edit),
      );
    app
      .route(`${GET_USER}`)
      .get(
        asyncHandler(requireAuthorization),
        asyncHandler(this.userController.get),
      );
  };
}

export default RiderRoute;
