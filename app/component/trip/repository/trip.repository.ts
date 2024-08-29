import * as type from "../interface/trip.interface";
import TripModel from "./trip.model";
import {CreateTripInerfacee} from "../interface/trip.interface";
import {UnknownInterface} from "../../../lib/unknown.interface";

class TripRepository {
  // public static async getCheckOutCount(
  //   employeeIds: RiderInterface['_id'][],
  // ) {
  //   try {
  //     return TripModel.countDocuments({
  //       employee: { $in: employeeIds },
  //       checkOutTime: { $ne: null },
  //     });
  //   } catch (e) {
  //     return e;
  //   }
  // }

  // public static async countDocuments(query: FindTripInterface = {}) {
  //   try {
  //     return TripModel.countDocuments(query);
  //   } catch (e) {
  //     return e;
  //   }
  // }

  // public static async getCheckInCount(employeeIds: EmployeeInterface['_id'][]) {
  //   try {
  //     return TripModel.countDocuments({
  //       employee: { $in: employeeIds },
  //       checkInTime: { $ne: null },
  //     });
  //   } catch (e) {
  //     return e;
  //   }
  // }

  // public static async findAll(
  //   query: type.FindTripInterface,
  //   skip: number,
  //   limit: number,
  // ) {
  //   try {
  //     return TripModel.find(query).skip(skip).limit(limit).populate('employee');
  //     // .populate('vehicle')
  //   } catch (e) {
  //     return e;
  //   }
  // }

  public static async findOne(query: type.FindTripInterface) {
    try {
      return TripModel.findOne(query);
    } catch (e) {
      return e;
    }
  }
  public static async find(query: type.FindTripInterface) {
    try {
      return TripModel.find(query);
    } catch (e) {
      return e;
    }
  }
  public static async create(query: type.CreateTripInerfacee) {
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
          { checkOutTime: new Date() },
          { new: true },
      );
    } catch (e) {
      return e;
    }
  }
  public static async weeklyCheckIn(data: CreateTripInerfacee) {
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
          { checkOutTime: new Date() },
          { new: true },
      );
    } catch (e) {
      return e;
    }
  }
}
export default TripRepository;
