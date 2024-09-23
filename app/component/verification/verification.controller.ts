import { Request, Response } from 'express';
import RiderService from '../user/rider.service';
import { ClientError } from '../../exception/client.error';
import ResponseHandler from '../../lib/response-handler';
import { StatusCodes } from 'http-status-codes';
import OtpService from '../otp/otp.service';
import VerificationEmail from './verification.email';
import { USER_STATUS_ENUM } from '../user/repository/rider.model';
import AuthHelper from '../auth/auth.helper';
import { ServerError } from '../../exception/server.error';
import SharedHelper from "../../lib/shared.helper";

class VerificationController {
  public requestToVerifyEmail = async (
    request: Request,
    response: Response,
  ) => {
    const user = await RiderService.findOne(
      { email: SharedHelper.lowerCase(request.body.email )},
      true,
    );
    console.log(user, 'useruser');
    if (user.status === USER_STATUS_ENUM.ACTIVE)
      throw new ClientError('your account is already verified');
    ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'your otp has been sent to your email',
    );
    const result = await OtpService.generateOtpDetail();
    await VerificationEmail.userIsRequestingVerificationCodeEmail(
      user,
      result.otp,
    );
    return RiderService.update(user._id, {
      otp: result.otp,
    });
  };

  public verifyEmail = async (request: Request, response: Response) => {
    const findUser = await RiderService.findOne(
      { otp: request.body.otp },
      true,
    );
    if (findUser.status === USER_STATUS_ENUM.ACTIVE)
      throw new ClientError('user previouly verified');
    const { token } = await AuthHelper.createToken(findUser);
    if (!token) throw new ServerError('Unable to create token');
    ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'account verified successfully',
      { token },
    );
    return RiderService.update(findUser._id, {
      status: USER_STATUS_ENUM.ACTIVE,
    });
  };
}

export default VerificationController;
