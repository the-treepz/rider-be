import { Request, Response } from 'express';
import { ClientError } from '../../exception/client.error';
import RiderService from '../user/rider.service';
import { NotFoundError } from '../../exception/not-found.error';
import WalletHelper from './wallet.helper';
import ResponseHandler from '../../lib/response-handler';
import { StatusCodes } from 'http-status-codes';
import WalletModel from './repository/wallet.model';

class WalletController {
  public fund = async (request: Request, response: Response) => {
    if (!request.body.amount)
      throw new ClientError('the amount to fund wallet is required');
    const user = await RiderService.findOne({ _id: request.user.id });
    if (!user) throw new NotFoundError('user does not exist');
    const reference = await WalletHelper.getReference();
    const result = await WalletHelper.makePayment({
      amount: Number(request.body.amount),
      email: user.email,
      rider: user._id,
      reference,
    });
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'payment url generated',
      { paymentUrl: result.authorization_url },
    );
  };
  public get = async (request: Request, response: Response) => {
    const user = await RiderService.findOne({ _id: request.user.id });
    if (!user) throw new NotFoundError('user does not exist');
    const wallet = await WalletModel.findOne({ _id: user.wallet._id });
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'fetched wallet',
      { wallet },
    );
  };
}

export default WalletController;
