import UserModel from './user.model';
import * as type from '../interface/user.interface';
import { UpdateUserInterface } from '../interface/user.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';

class UserRepository {
  public static async updateWithQuery(
    data: type.FindUserInterface,
    params: type.UpdateUserInterface,
  ) {
    try {
      return UserModel.findOneAndUpdate(data, params, { new: true });
    } catch (e) {
      return e;
    }
  }
  public static async countDocument() {
    try {
      return UserModel.countDocuments();
    } catch (e) {
      return e;
    }
  }

  public static async create(data: type.CreateRiderInterface) {
    try {
      return UserModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async findOne(data: type.FindUserInterface, lean?: boolean) {
    try {
      return UserModel.findOne(data);
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
      return UserModel.find(query).skip(skip).limit(limit);
    } catch (e) {
      return e;
    }
  }

  public static async update(
    user: type.UserInterface['_id'],
    query: type.UpdateUserInterface,
  ) {
    try {
      return UserModel.findByIdAndUpdate(user, query, { new: true });
    } catch (e) {
      return e;
    }
  }

  public static updateAndPush = async (
    query: type.FindUserInterface,
    params: type.UpdateUserInterface | UnknownInterface,
  ) => {
    try {
      return UserModel.findOneAndUpdate(
        query,
        { $push: params },
        { new: true },
      );
    } catch (e) {
      return e;
    }
  };
}
export default UserRepository;
