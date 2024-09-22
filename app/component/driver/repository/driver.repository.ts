import DriverModel from './driver.model';
import * as type from '../interface/driver.interface';
import { DriverInterface } from '../interface/driver.interface';

class DriverRepository {
  public static async countDocument() {
    try {
      return DriverModel.countDocuments();
    } catch (e) {
      return e;
    }
  }

  public static async create(data: type.CreateBusinessInterface) {
    try {
      return DriverModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async findOne(
    data: type.FindBusinessInterface,
    lean?: boolean,
  ) {
    try {
      if (lean) return DriverModel.findOne(data);
      return DriverModel.findOne(data).populate('employees');
    } catch (e) {
      return e;
    }
  }
  public static async getAll(
    query: type.FindBusinessInterface,
    skip: number,
    limit: number,
  ) {
    try {
      return DriverModel.find(query).skip(skip).limit(limit);
    } catch (e) {
      return e;
    }
  }

  public static async update(
    business: type.DriverInterface['_id'],
    query: type.UpdateBusinessInterface,
  ) {
    try {
      return DriverModel.findByIdAndUpdate(business, query, { new: true });
    } catch (e) {
      return e;
    }
  }
}
export default DriverRepository;
