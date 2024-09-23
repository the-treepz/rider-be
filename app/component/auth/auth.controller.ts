import { Request, Response } from 'express';
import AuthService from './auth.service';
import ResponseHandler from '../../lib/response-handler';
import { StatusCodes } from 'http-status-codes';
import Hashing from '../../libraries/package/hashing';
import SharedHelper from '../../lib/shared.helper';
import RiderService from '../user/rider.service';
import WalletService from '../wallet/wallet.service';
import AuthHelper from './auth.helper';
import OtpService from '../otp/otp.service';
import { USER_STATUS_ENUM } from '../user/repository/rider.model';
import AuthEmail from './auth.email';

class AuthController {
  public login = async (request: Request, response: Response) => {
    const result = await AuthService.login({
      email: request.body.email,
      password: request.body.password,
    });
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'Log in successful',
      result,
    );
  };
  public register = async (request: Request, response: Response) => {
    const hashedPassword = await Hashing.hashValue(request.body.password);
    await AuthService.create({
      email: SharedHelper.lowerCase(request.body.email),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phoneNumber: request.body.phoneNumber,
      password: hashedPassword,
    });
    ResponseHandler.SuccessResponse(
      response,
      StatusCodes.CREATED,
      'user created',
    );
    const findUsr = await RiderService.findOne({
      email: SharedHelper.lowerCase(request.body.email),
    });
    const wallet = await WalletService.create(findUsr._id);
    await RiderService.update(findUsr._id, { wallet: wallet._id });
    const result = await OtpService.generateOtpDetail();
    await RiderService.update(findUsr._id, {
      otp: result.otp,
    });
    return AuthEmail.sendWelcomeEmailToUser(
      findUsr.email,
      findUsr.firstName,
      result.otp,
    );
  };
  public forgotPassword = async (request: Request, response: Response) => {
    const user = await RiderService.findOne({
      email: SharedHelper.lowerCase(request.body.email),
    });
    ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'Otp has been sent to your email',
    );
    return AuthHelper.handleForgotPassword(user.email, user.firstName);
  };
  public resetPassword = async (request: Request, response: Response) => {
    const result = await OtpService.checkOtp(request.body.otp);
    const findUser = await RiderService.findOne({ otp: result.otpId });
    const { token } = await AuthHelper.createToken(findUser);
    ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'password reset successfully',
      { token },
    );
    await AuthHelper.handleCompletePasswordReset(
      findUser._id,
      request.body.password,
    );
    return RiderService.update(findUser._id, {
      status: USER_STATUS_ENUM.ACTIVE,
    });
  };
}

export default AuthController;
