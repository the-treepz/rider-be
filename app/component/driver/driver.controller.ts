import { Request, Response } from 'express';
import { ClientError } from '../../exception/client.error';
import DriverModel, { DRIVER_STATUS_ENUM } from './repository/driver.model';
import ResponseHandler from '../../lib/response-handler';

class DriverController {
  public getDrivers = async (request: Request, response: Response) => {
    const { lat, lng } = request.body;
    if (!lat && !lng)
      throw new ClientError('user latitude and logitude is required');
    const availableDrivers = await DriverModel.find({
      status: DRIVER_STATUS_ENUM.AVALIABLE,
      location: {
        $geoWithin: {
          //distance in km is 5
          $centerSphere: [[lng, lat], 5 / 6378.1], // Distance in radians (Earth's radius in km)
        },
      },
    });
    return ResponseHandler.OkResponse(response, 'fetched drivers', {
      availableDrivers,
    });
  };
}

export default DriverController;
