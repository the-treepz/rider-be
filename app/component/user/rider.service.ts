import * as type from './interface/rider.interface';
import RiderRepository from './repository/rider.repository';
import { TripInterface } from '../trip/interface/trip.interface';
import { NotFoundError } from '../../exception/not-found.error';

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
  async handleFindOne(data: type.FindUserInterface, handle?: boolean) {
    const user = await RiderRepository.findOne(data);
    if (handle) {
      if (user) return user;
      throw new NotFoundError('this user does not exist');
    }
    return user;
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
