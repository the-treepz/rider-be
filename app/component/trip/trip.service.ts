import {UserInterface} from "../user/interface/user.interface";
import * as type from "./interface/trip.interface";
import TripRepository from "./repository/trip.repository";

const TripService = {
  async getTotalCheckInsOrCheckOuts(
      business: UserInterface['_id'],
      checkType: string,
  ) {
    // const findBuisness = await RiderService.findOne({ _id: business }, false);
    // const employeeIds = findBuisness.employees.map(
    //     (employee: RiderInterface['_id']) => employee._id,
    // );
    // if (checkType === 'in') {
    //   return TripRepository.getCheckInCount(employeeIds);
    // }
    // return TripRepository.getCheckOutCount(employeeIds);
  },
  async findOne(body: type.FindTripInterface) {
    return TripRepository.findOne(body);
  },
  async find(body: type.FindTripInterface) {
    return TripRepository.find(body);
  },
  async create(body: type.CreateTripInerfacee) {
    return TripRepository.create(body);
  },
  async dailyCheckOut(user: UserInterface['_id']) {
    return TripRepository.dailyCheckOut({
      rider: user,
      checkOutTime: null,
      checkInType: 'Daily',
    });
  },
  async weeklyCheckOut(user: UserInterface['_id']) {
    return TripRepository.weeklyCheckOut({
      rider: user,
      checkOutTime: null,
      checkInType: 'Weekly',
    });
  },
  async findweeklyCheckn(user: UserInterface['_id']) {
    return TripRepository.findweeklyCheckn({
      rider: user,
      checkOutTime: null,
      checkInType: 'Weekly',
    });
  },
};
export default TripService;
