import { NotFoundError } from '../../exception/not-found.error';
import DriverRepository from './repository/driver.repository';
import * as type from './interface/driver.interface';
import {
  DriverInterface,
  UpdatDriverInterface,
} from './interface/driver.interface';

const DriverService = {
  async findOne(body: type.FindDriverInterface, handle?: boolean) {
    const driver = await DriverRepository.findOne(body);

    if (handle) {
      if (driver) return driver;
      throw new NotFoundError('driver does not exist');
    }
    return DriverRepository.findOne(body);
  },
  async update(
    driver: DriverInterface['_id'],
    body: type.UpdatDriverInterface,
  ) {
    return DriverRepository.update(driver, body);
  },
};
export default DriverService;
