import { NextFunction, Request, Response } from 'express';
import UserService from './user.service';
import SharedHelper from '../../lib/shared.helper';
import { ClientError } from '../../exception/client.error';

const RideMiddleware = {
  async checkIfRiderAlreadyExits(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const rider = await UserService.findOne({
      email: SharedHelper.lowerCase(request.body.email),
    });
    if (rider) throw new ClientError('email already exists');
    const find = await UserService.findOne({
      phoneNumber: request.body.phoneNumber,
    });
    if (find) throw new ClientError('phone number already exists');
    return next();
  },
};
export default RideMiddleware;
