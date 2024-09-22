import * as type from '../interface/driver.interface';
import DriverModel from './driver.model';
import { UpdatDriverInterface } from '../interface/driver.interface';

class DriverRepository {
  public static async create(data: type.CreateBusinessInterface) {
    try {
      return DriverModel.create(data);
    } catch (e) {
      return e;
    }
  }
  public static async findOne(data: type.FindDriverInterface) {
    try {
      return DriverModel.find(data);
    } catch (e) {
      return e;
    }
  }

  public static async update(
    driver: type.DriverInterface['_id'],
    query: type.UpdatDriverInterface,
  ) {
    try {
      return DriverModel.findByIdAndUpdate(driver, query, { new: true });
    } catch (e) {
      return e;
    }
  }
}
export default DriverRepository;
