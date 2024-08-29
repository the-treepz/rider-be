import * as type from './interface/user.interface';
import UserRepository from './repository/user.repository';

const UserService = {
  async updateWithQuery(
    data: type.FindUserInterface,
    params: type.UpdateUserInterface,
  ) {
    return UserRepository.updateWithQuery(data, params);
  },
  async updateAndPush(
    data: type.FindUserInterface,
    params: type.UpdateUserInterface,
  ) {
    return UserRepository.updateAndPush(data, params);
  },

  async findOne(data: type.FindUserInterface, lean?: boolean) {
    return UserRepository.findOne(data, lean);
  },
  async update(
    user: type.UserInterface['_id'],
    body: type.UpdateUserInterface,
  ) {
    return UserRepository.update(user, body);
  },
};
export default UserService;
