import { NextFunction } from 'express';
import { UserInterface } from '../user/interface/user.interface';
import UserRepository from '../user/repository/user.repository';
import SharedHelper from '../../lib/shared.helper';
import { USER_STATUS_ENUM } from '../user/repository/user.model';
import { ClientError } from '../../exception/client.error';
import { NotFoundError } from '../../exception/not-found.error';

const AuthMiddlewareService = {
  async getVerifiedUniversity(
    next: NextFunction,
    email: UserInterface['email'],
  ) {
    const user = await UserRepository.findOne(
      {
        email: SharedHelper.lowerCase(email),
      },
      true,
    );
    if (!user) throw new NotFoundError('user does not exist');
    if (user.status === USER_STATUS_ENUM.ACTIVE) return next();
    throw new ClientError('user is yet to be active');
  },
};
export default AuthMiddlewareService;
