import {Request, Response} from "express";
import RiderService from "../user/rider.service";
import {NotFoundError} from "../../exception/not-found.error";
import WalletModel from "./repository/wallet.model";
import ResponseHandler from "../../lib/response-handler";
import {StatusCodes} from "http-status-codes";

class WalletController {
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
