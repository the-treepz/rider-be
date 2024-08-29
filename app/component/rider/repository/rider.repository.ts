import RiderModel from './rider.model';
import * as type from '../interface/user.interface';

class RiderRepository {
  public static async updateWithQuery(
    data: type.FindUserInterface,
    params: type.UpdateUserInterface,
  ) {
    try {
      return RiderModel.findOneAndUpdate(data, params, { new: true });
    } catch (e) {
      return e;
    }
  }
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

  public static async findOne(data: type.FindUserInterface, lean?: boolean) {
    try {
      return RiderModel.findOne(data);
    } catch (e) {
      return e;
    }
  }

  public static async getAll(
    query: type.FindUserInterface,
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
    user: type.UserInterface['_id'],
    query: type.UpdateUserInterface,
  ) {
    try {
      return RiderModel.findByIdAndUpdate(user, query, { new: true });
    } catch (e) {
      return e;
    }
  }
}
export default RiderRepository;
