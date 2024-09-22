import RiderModel from './rider.model';
import * as type from '../interface/rider.interface';
import {
  RiderInterface,
  UpdateUserInterface,
} from '../interface/rider.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';
import { TripInterface } from '../../trip/interface/trip.interface';

class RiderRepository {
  public static async updateToPull(
    rider: RiderInterface['_id'],
    params: { trips: TripInterface['_id'] },
  ) {
    try {
      // 4. Remove the trip from the rider's trips array
      return RiderModel.findByIdAndUpdate(
        rider,
        { $pull: params },
        { new: true }, // Option to return the updated document
      );
    } catch (e) {
      return e;
    }
  }
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
      return RiderModel.findOne(data).populate(['business', 'wallet']);
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
    user: type.RiderInterface['_id'],
    query: type.UpdateUserInterface,
  ) {
    try {
      return RiderModel.findByIdAndUpdate(user, query, { new: true });
    } catch (e) {
      return e;
    }
  }

  public static updateAndPush = async (
    query: type.FindUserInterface,
    params: type.UpdateUserInterface | UnknownInterface,
  ) => {
    try {
      return RiderModel.findOneAndUpdate(
        query,
        { $push: params },
        { new: true },
      );
    } catch (e) {
      return e;
    }
  };
}
export default RiderRepository;
