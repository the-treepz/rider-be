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
}

export default RiderController;
