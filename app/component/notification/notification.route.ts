import NotificationController from './notification.controller';
import { Application } from 'express';
import * as url from './trip.url';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';

class NotificationRoute {
  public notificationController: NotificationController =
    new NotificationController();
  public routes = (app: Application): void => {
    app
      .route(`${url.NOTIFICATIO}`)
      .put(
        asyncHandler(requireAuthorization),
        asyncHandler(this.notificationController.notificatio),
      );
    app
      .route(`${url.NOTIFICATIO}`)
      .get(
        asyncHandler(requireAuthorization),
        asyncHandler(this.notificationController.getNotifications),
      );
  };
}

export default NotificationRoute;
