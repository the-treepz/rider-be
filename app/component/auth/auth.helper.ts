import { RiderInterface } from '../rider/interface/rider.interface';
import Jwt from '../../lib/jwt';
import * as secret from '../../config/secrets';
import SharedHelper from '../../lib/shared.helper';
import Hashing from '../../libraries/package/hashing';
import { ServerError } from '../../exception/server.error';
import { UnAuthorizedError } from '../../exception/un-authorized.error';

const AuthHelper = {
  async createToken(business: RiderInterface) {
    const token = Jwt.createToken(
      { email: business.email, id: business._id },
      secret.TREEPZ_JWT_SECRET,
      secret.TREEPZ_JWT_EXPIRY,
    );
    return { token };
  },

  async handleLogin(user: RiderInterface, passwordProvided: string) {
    const trimmedProvidedPassword = SharedHelper.trimString(passwordProvided);
    const correctPassword = await Hashing.compareHashedValue(
      trimmedProvidedPassword,
      user.password,
    );
    if (correctPassword) {
      const { token } = await this.createToken(user);
      if (!token) throw new ServerError('Unable to create token');
      return {
        token,
      };
    }
    throw new UnAuthorizedError('Incorrect Credentials');
  },
};
export default AuthHelper;
