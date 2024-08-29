import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from './user.service';
import ResponseHandler from '../../lib/response-handler';

class UserController {
  public edit = async (request: Request, response: Response) => {
    await UserService.update(request.user.id, request.body);
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'profile edited',
    );
  };
  public get = async (request: Request, response: Response) => {
    const user = await UserService.findOne({ _id: request.user.id });
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'fetched user',
      {
        user: {
          status: user.status,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
        },
      },
    );
  };
}

export default UserController;
