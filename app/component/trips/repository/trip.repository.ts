import TripModel from './trip.model';
import * as type from '../interface/trip.interface';
import { FindTripInterface } from '../interface/trip.interface';
import { EmployeeInterface } from '../../employee/interface/employee.interface';

class TripRepository {
  public static async getCheckOutCount(
    employeeIds: EmployeeInterface['_id'][],
  ) {
    try {
      return TripModel.countDocuments({
        employee: { $in: employeeIds },
        checkOutTime: { $ne: null },
      });
    } catch (e) {
      return e;
    }
  }

  public static async countDocuments(query: FindTripInterface = {}) {
    try {
      return TripModel.countDocuments(query);
    } catch (e) {
      return e;
    }
  }

  public static async getCheckInCount(employeeIds: EmployeeInterface['_id'][]) {
    try {
      return TripModel.countDocuments({
        employee: { $in: employeeIds },
        checkInTime: { $ne: null },
      });
    } catch (e) {
      return e;
    }
  }

  public static async findAll(
    query: type.FindTripInterface,
    skip: number,
    limit: number,
  ) {
    try {
      return TripModel.find(query).skip(skip).limit(limit).populate('employee');
      // .populate('vehicle')
    } catch (e) {
      return e;
    }
  }

  public static async findOne(query: type.FindTripInterface) {
    try {
      return TripModel.findOne(query).populate('employee').populate('vehicle');
    } catch (e) {
      return e;
    }
  }
}
export default TripRepository;
