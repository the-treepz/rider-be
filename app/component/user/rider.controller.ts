import { Request, Response } from 'express';
import { ClientError } from '../../exception/client.error';
import ResponseHandler from '../../lib/response-handler';
import RiderModel from './repository/rider.model';
import RiderService from './rider.service';
import { StatusCodes } from 'http-status-codes';

class RiderController {
  public deviceToken = async (request: Request, response: Response) => {
    const { deviceToken } = request.body;
    if (!deviceToken) throw new ClientError('Device token is required');
    ResponseHandler.OkResponse(response, 'Device token updated successfully');
    return RiderModel.findByIdAndUpdate(
      request.user.id,
      { deviceToken },
      { new: true },
    );
  };
  public edit = async (request: Request, response: Response) => {
    await RiderService.update(request.user.id, request.body);
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'profile edited',
    );
  };
  public get = async (request: Request, response: Response) => {
    const user = await RiderService.handleFindOne(
      { _id: request.user.id },
      true,
    );
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'fetched user',
      {
        user: user.business
          ? {
              id: `TRP-${user._id}`,
              status: user.status,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
              business: { name: user.business.name },
            }
          : {
              id: `TRP-${user._id}`,
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
