import { RiderInterface } from '../user/interface/rider.interface';
import * as type from './interface/trip.interface';
import TripRepository from './repository/trip.repository';
import { UnknownInterface } from '../../lib/unknown.interface';
import { NotFoundError } from '../../exception/not-found.error';

const TripService = {
  async getTrips(user: RiderInterface['_id']) {
    const trips = await TripRepository.findAll(user, 0, 0);
    return trips.map((trip: UnknownInterface) => {
      if (trip.checkInType === 'Daily') {
        const { checkInDates, ...tripWithoutCheckInDates } = trip.toObject();
        return tripWithoutCheckInDates;
      }
      return trip;
    });
  },
  async findOne(body: type.FindTripInterface) {
    return TripRepository.findOne(body);
  },
  async find(body: type.FindTripInterface, handle?: boolean) {
    const trip = await TripRepository.findOne(body);

    if (handle) {
      if (trip) return trip;
      throw new NotFoundError('trip does not exist');
    }
    return TripRepository.findOne(body);
  },
  async create(body: type.CreateTripInterface) {
    return TripRepository.create(body);
  },
  async dailyCheckOut(user: RiderInterface['_id']) {
    return TripRepository.dailyCheckOut({
      rider: user,
      checkOutTime: null,
      checkInType: 'Daily',
    });
  },
  async weeklyCheckOut(user: RiderInterface['_id']) {
    return TripRepository.weeklyCheckOut({
      rider: user,
      checkOutTime: null,
      checkInType: 'Weekly',
    });
  },
  async findWeeklyCheckn(user: RiderInterface['_id']) {
    return TripRepository.findweeklyCheckn({
      rider: user,
      checkOutTime: null,
      checkInType: 'Weekly',
    });
  },
};
export default TripService;
