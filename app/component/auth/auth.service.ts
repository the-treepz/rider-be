import * as type from '../rider/interface/rider.interface';
import RiderRepository from '../rider/repository/rider.repository';
import RiderService from '../rider/rider.service';
import AuthHelper from './auth.helper';
import { NotFoundError } from '../../exception/not-found.error';
import { USER_STATUS_ENUM } from '../rider/repository/rider.model';
import { ClientError } from '../../exception/client.error';

const AuthService = {
  async create(data: type.CreateRiderInterface) {
    return RiderRepository.create(data);
  },
  async login(data: { email: string; password: string }) {
    const { email, password } = data;
    const user = await RiderService.findOne({ email }, true);
    if (user.status !== USER_STATUS_ENUM.ACTIVE)
      throw new ClientError('user account not activated');
    if (user) return AuthHelper.handleLogin(user, password);
    throw new NotFoundError('USER does not exist');
  },
};
export default AuthService;
