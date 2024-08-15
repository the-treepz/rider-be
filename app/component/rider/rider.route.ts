import { Application } from 'express';
import RiderController from './rider.controller';
import { EDIT_USER } from './user.url';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';
import RiderValidation from './rider.validation';

class RiderRoute {
  public businessController: RiderController = new RiderController();

  public routes = (app: Application): void => {
    app
      .route(`${EDIT_USER}`)
      .put(
        asyncHandler(requireAuthorization),
        asyncHandler(RiderValidation.update),
        asyncHandler(this.businessController.edit),
      );
  };
}

export default RiderRoute;
