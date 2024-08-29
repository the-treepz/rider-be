import { Application } from 'express';
import UserController from './user.controller';
import { EDIT_USER, GET_USER } from './user.url';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';
import RiderValidation from './rider.validation';

class UserRoute {
  public userController: UserController = new UserController();

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

export default UserRoute;
