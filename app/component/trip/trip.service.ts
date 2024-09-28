import { RiderInterface } from '../user/interface/rider.interface';
import TripRepository from './repository/trip.repository';
import { UnknownInterface } from '../../lib/unknown.interface';
import { TripInterface } from './interface/trip.interface';
import * as type from './interface/trip.interface';
import { NotFoundError } from '../../exception/not-found.error';

const TripService = {
  async getTrips(user: RiderInterface['_id']) {
    const trips = await TripRepository.findAll(user, 0, 0);
    const re = trips.map((trip: UnknownInterface) => {
      if (trip.checkInType === 'Daily') {
        const { checkInDates, ...tripWithoutCheckInDates } = trip.toObject();
        return tripWithoutCheckInDates;
      }
      return trip;
    });
    return re.map((one: TripInterface) => {
      return {
        checkoutType: one.checkoutType === 'Self' ? 'Manual' : 'Automatic',
        status: one.status,
        checkOutTime: one.checkOutTime,
        id: one._id,
        checkInTime: one.checkInTime,
        checkInType: one.checkInType,
        createdAt: one.createdAt,
      };
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
