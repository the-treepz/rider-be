import { Application } from 'express';
import VerificationController from './verification.controller';
import { REQUEST_TO_VERIFY_URL, VERIFY_URL } from './verification.url';
import { asyncHandler } from '../../middleware/async-handler';
import VerificationValidation from './verification.validation';

class VerificationRoute {
  public verificationController: VerificationController =
    new VerificationController();

  public routes = (app: Application): void => {
    app
      .route(`${VERIFY_URL}`)
      .post(
        asyncHandler(VerificationValidation.validateVerifyEmail),
        asyncHandler(this.verificationController.verifyEmail),
      );
    app
      .route(`${REQUEST_TO_VERIFY_URL}`)
      .post(
        asyncHandler(VerificationValidation.validateToRequestToVerifyEmail),
        asyncHandler(this.verificationController.requestToVerifyEmail),
      );
  };
}

export default VerificationRoute;
