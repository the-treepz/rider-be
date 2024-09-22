import DriverController from './driver.controller';
import { Application } from 'express';
import { GET_DRIVERS } from './driver.url';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';
import * as url from './driver.url';

class DriverRoute {
  public driverController: DriverController = new DriverController();

  public routes = (app: Application): void => {
    app
      .route(`${GET_DRIVERS}`)
      .get(
        asyncHandler(requireAuthorization),
        asyncHandler(this.driverController.getDrivers),
      );
  };
}

export default DriverRoute;
