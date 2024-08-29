import * as type from './interface/user.interface';
import RiderRepository from './repository/rider.repository';

const UserService = {
  async updateWithQuery(
    data: type.FindUserInterface,
    params: type.UpdateUserInterface,
  ) {
    return RiderRepository.updateWithQuery(data, params);
  },

  async findOne(data: type.FindUserInterface, lean?: boolean) {
    return RiderRepository.findOne(data, lean);
  },
  async update(
    user: type.UserInterface['_id'],
    body: type.UpdateUserInterface,
  ) {
    return RiderRepository.update(user, body);
  },
};
export default UserService;
