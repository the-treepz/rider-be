import AuthController from './auth.controller';
import { Application } from 'express';
import * as url from './auth.url';
import { asyncHandler } from '../../middleware/async-handler';
import AuthValidation from './auth.validation';
import RideMiddleware from '../rider/ride.middleware';
class AuthRoute {
  public authController: AuthController = new AuthController();

  public routes = (app: Application): void => {
    app
      .route(`${url.FORGOT_PASSWORD}`)
      .post(
        asyncHandler(AuthValidation.validateForgotPassword),
        asyncHandler(this.authController.forgotPassword),
      );
    app
      .route(`${url.LOGIN_USER_URL}`)
      .post(
        asyncHandler(AuthValidation.validateLogin),
        asyncHandler(this.authController.login),
      );
    app
      .route(`${url.SIGN_UP}`)
      .post(
        asyncHandler(AuthValidation.validateSignUp),
        asyncHandler(RideMiddleware.checkIfRiderAlreadyExits),
        asyncHandler(this.authController.register),
      );

    app
      .route(`${url.RESET_PASSWORD}`)
      .post(
        asyncHandler(AuthValidation.validateResetPassword),
        asyncHandler(this.authController.resetPassword),
      );
  };
}

export default AuthRoute;
