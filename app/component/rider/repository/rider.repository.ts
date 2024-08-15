import RiderModel from './rider.model';
import * as type from '../interface/rider.interface';

class RiderRepository {
  public static async countDocument() {
    try {
      return RiderModel.countDocuments();
    } catch (e) {
      return e;
    }
  }

  public static async create(data: type.CreateRiderInterface) {
    try {
      return RiderModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async findOne(data: type.FindRiderInterface, lean?: boolean) {
    try {
      if (lean) return RiderModel.findOne(data);
      return RiderModel.findOne(data).populate('employees');
    } catch (e) {
      return e;
    }
  }

  public static async getAll(
    query: type.FindRiderInterface,
    skip: number,
    limit: number,
  ) {
    try {
      return RiderModel.find(query).skip(skip).limit(limit);
    } catch (e) {
      return e;
    }
  }

  public static async update(
    business: type.RiderInterface['_id'],
    query: type.UpdateBusinessInterface,
  ) {
    try {
      return RiderModel.findByIdAndUpdate(business, query, { new: true });
    } catch (e) {
      return e;
    }
  }
}
export default RiderRepository;
