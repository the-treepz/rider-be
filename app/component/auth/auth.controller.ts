import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from './auth.service';
import ResponseHandler from '../../lib/response-handler';
import SharedHelper from '../../lib/shared.helper';
import Hashing from '../../libraries/package/hashing';

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
    const result = await AuthService.create({
      email: SharedHelper.lowerCase(request.body.email),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phoneNumber: request.body.phoneNumber,
      password: hashedPassword,
    });
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.CREATED,
      'user created',
    );
  };
}

export default AuthController;
