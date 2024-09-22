import * as type from './interface/rider.interface';
import RiderRepository from './repository/rider.repository';
import { TripInterface } from '../trip/interface/trip.interface';

const RiderService = {
  async updateWithQuery(
    data: type.FindUserInterface,
    params: type.UpdateUserInterface,
  ) {
    return RiderRepository.updateWithQuery(data, params);
  },
  async updateAndPush(
    data: type.FindUserInterface,
    params: type.UpdateUserInterface,
  ) {
    return RiderRepository.updateAndPush(data, params);
  },

  async findOne(data: type.FindUserInterface, lean?: boolean) {
    return RiderRepository.findOne(data, lean);
  },
  async update(
    user: type.RiderInterface['_id'],
    body: type.UpdateUserInterface,
  ) {
    return RiderRepository.update(user, body);
  },
  async updateToPull(
    user: type.RiderInterface['_id'],
    body: { trips: TripInterface['_id'] },
  ) {
    return RiderRepository.updateToPull(user, body);
  },
};
export default RiderService;
