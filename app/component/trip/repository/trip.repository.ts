import * as type from '../interface/trip.interface';
import TripModel, { TRIP_STATUS_ENUM } from './trip.model';
import { CreateTripInterface } from '../interface/trip.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';
import { RiderInterface } from '../../user/interface/rider.interface';

class TripRepository {
  public static async countDocuments(query: type.FindTripInterface = {}) {
    try {
      return TripModel.countDocuments(query);
    } catch (e) {
      return e;
    }
  }

  public static async findAll(
    rider: RiderInterface['_id'],
    skip: number,
    limit: number,
  ) {
    try {
      return TripModel.find({ rider })
        .skip(skip)
        .limit(limit)
        .populate('rider', 'firstName lastName');
    } catch (e) {
      return e;
    }
  }

  public static async findOne(query: type.FindTripInterface) {
    try {
      return TripModel.findOne(query)
        .populate([
          {
            path: 'driver',
            select:
              'firstName lastName vehicle.licensePlate vehicle.make vehicle.model', // Specify fields to return
          },
          { path: 'rider', select: 'firstName lastName' },
        ])
        .select('pickUpLocation dropOffLocation fare status'); // Specify trip fields to return
    } catch (e) {
      return e;
    }
  }
  public static async find(query: type.FindTripInterface) {
    try {
      return TripModel.find(query).populate('rider');
    } catch (e) {
      return e;
    }
  }
  public static async create(query: type.CreateTripInterface) {
    try {
      return TripModel.create(query);
    } catch (e) {
      return e;
    }
  }
  public static async dailyCheckOut(data: any) {
    try {
      return TripModel.findOneAndUpdate(
        data,
        {
          checkOutTime: new Date(),
          checkOutType: 'Self',
          status: TRIP_STATUS_ENUM.COMPLETED,
        },
        { new: true },
      );
    } catch (e) {
      return e;
    }
  }
  public static async weeklyCheckIn(data: CreateTripInterface) {
    try {
      return TripModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async findweeklyCheckn(data: UnknownInterface) {
    try {
      return TripModel.find(data);
    } catch (e) {
      return e;
    }
  }
  public static async weeklyCheckOut(data: type.WeekdlyCheckoutInterface) {
    try {
      return TripModel.findOneAndUpdate(
        data,
        {
          checkOutTime: new Date(),
          checkOutType: 'Self',
          status: TRIP_STATUS_ENUM.COMPLETED,
        },
        { new: true },
      );
    } catch (e) {
      return e;
    }
  }
}
export default TripRepository;
