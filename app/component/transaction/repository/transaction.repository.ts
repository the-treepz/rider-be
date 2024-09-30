import TransactionModel from './transaction.model';
import * as type from '../interface/transction.interface';
import {
  TransctionInterface,
  UpdateUserInterface,
} from '../interface/transction.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';
import { TripInterface } from '../../trip/interface/trip.interface';

class TransactionRepository {
  public static async updateToPull(
    rider: TransctionInterface['_id'],
    params: { trips: TripInterface['_id'] },
  ) {
    try {
      // 4. Remove the trip from the rider's trips array
      return TransactionModel.findByIdAndUpdate(
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
      return TransactionModel.findOneAndUpdate(data, params, { new: true });
    } catch (e) {
      return e;
    }
  }
  public static async countDocument() {
    try {
      return TransactionModel.countDocuments();
    } catch (e) {
      return e;
    }
  }

  public static async create(data: type.CreateRiderInterface) {
    try {
      return TransactionModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async findOne(data: type.FindUserInterface, lean?: boolean) {
    try {
      return TransactionModel.findOne(data).populate(['business', 'wallet']);
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
      return TransactionModel.find(query).skip(skip).limit(limit);
    } catch (e) {
      return e;
    }
  }

  public static async update(
    user: type.TransctionInterface['_id'],
    query: type.UpdateUserInterface,
  ) {
    try {
      return TransactionModel.findByIdAndUpdate(user, query, { new: true });
    } catch (e) {
      return e;
    }
  }

  public static updateAndPush = async (
    query: type.FindUserInterface,
    params: type.UpdateUserInterface | UnknownInterface,
  ) => {
    try {
      return TransactionModel.findOneAndUpdate(
        query,
        { $push: params },
        { new: true },
      );
    } catch (e) {
      return e;
    }
  };
}
export default TransactionRepository;
