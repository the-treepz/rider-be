import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RiderService from './rider.service';
import ResponseHandler from '../../lib/response-handler';

class RiderController {
  public edit = async (request: Request, response: Response) => {
    await RiderService.update(request.user.id, request.body);
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'profile edited',
    );
  };
  public get = async (request: Request, response: Response) => {
    const user = await RiderService.findOne({ _id: request.user.id });
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'fetched user',
      {
        user: user.business
          ? {
              status: user.status,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
              business: user.business || null,
            }
          : {
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

export default RiderController;
