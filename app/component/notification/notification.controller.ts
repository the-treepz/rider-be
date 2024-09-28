import { Request, Response } from 'express';
import RiderService from '../user/rider.service';
import ResponseHandler from '../../lib/response-handler';

class NotificationController {
  public notificatio = async (request: Request, response: Response) => {
    await RiderService.update(request.user.id, {
      notificationPreferences: request.body.notificationPreferences,
    });
    return ResponseHandler.OkResponse(response, 'notification saved');
  };

  public getNotifications = async (request: Request, response: Response) => {
    const findUser = await RiderService.findOne({ _id: request.user.id });
    return ResponseHandler.OkResponse(
      response,
      'fetched notification preference',
      { notificationPreferences: findUser.notificationPreferences },
    );
  };
}

export default NotificationController;
