import * as type from '../user/interface/user.interface';
import UserRepository from '../user/repository/user.repository';
import UserService from '../user/user.service';
import AuthHelper from './auth.helper';
import { NotFoundError } from '../../exception/not-found.error';
import { USER_STATUS_ENUM } from '../user/repository/user.model';
import { ClientError } from '../../exception/client.error';

const AuthService = {
  async create(data: type.CreateRiderInterface) {
    return UserRepository.create(data);
  },
  async login(data: { email: string; password: string }) {
    const { email, password } = data;
    const user = await UserService.findOne({ email }, true);
    if (user.status !== USER_STATUS_ENUM.ACTIVE)
      throw new ClientError('user account not activated');
    if (user) return AuthHelper.handleLogin(user, password);
    throw new NotFoundError('USER does not exist');
  },
};
export default AuthService;
