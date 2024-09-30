import { Request, Response } from 'express';
import RiderService from '../user/rider.service';
import { NotFoundError } from '../../exception/not-found.error';
import TransactionModel from './repository/transaction.model';
import ResponseHandler from '../../lib/response-handler';

class TransactionController {
  public get = async (request: Request, response: Response) => {
    const user = await RiderService.findOne({ _id: request.user.id });
    if (!user) throw new NotFoundError('user does not exist');
    const transactions = await TransactionModel.find({
      wallet: user.wallet._id,
    }).select('-wallet');
    return ResponseHandler.OkResponse(
      response,
      'User transactions fetched successfully.',
      {
        transactions,
      },
    );
  };
}

export default TransactionController;
