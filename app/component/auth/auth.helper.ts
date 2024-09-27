import { RiderInterface } from '../user/interface/rider.interface';
import Jwt from '../../lib/jwt';
import * as secret from '../../config/secrets';
import SharedHelper from '../../lib/shared.helper';
import Hashing from '../../libraries/package/hashing';
import { ServerError } from '../../exception/server.error';
import { UnAuthorizedError } from '../../exception/un-authorized.error';
import RiderService from '../user/rider.service';
import AuthEmail from './auth.email';
import OtpService from '../otp/otp.service';

const AuthHelper = {
  async handleCompletePasswordReset(
    user: RiderInterface['_id'],
    password: string,
  ) {
    const findUser = await RiderService.findOne({ _id: user });
    const hashedPassword = await Hashing.hashValue(
      SharedHelper.trimString(password),
    );
    await RiderService.update(findUser._id, {
      password: hashedPassword,
    });
    return AuthEmail.sendPasswordResetted(findUser.email, findUser.firstName);
  },
  async handleForgotPassword(
    email: RiderInterface['email'],
    firstName: RiderInterface['firstName'],
  ) {
    const result = await OtpService.generateOtpDetail();
    await AuthEmail.sendForgotPasswordOtp({
      email,
      otp: result.otp,
      firstName,
    });
    return RiderService.updateWithQuery({ email }, { otp: result.otp });
  },
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
    // Check if the user has a set password
    if (!user.password) {
      // If no password is set, allow login with the default password only
      const isDefaultPassword = await Hashing.compareHashedValue(
        trimmedProvidedPassword,
        user.defaultPassword,
      );
      if (isDefaultPassword) {
        const { token } = await this.createToken(user);
        if (!token) throw new ServerError('Unable to create token');
        return { token };
      }
      throw new UnAuthorizedError('Incorrect Credentials');
    }
    // If a password is set, check against both the default password and the actual password
    if (user.defaultPassword) {
      const isDefaultPassword = await Hashing.compareHashedValue(
        trimmedProvidedPassword,
        user.defaultPassword,
      );
      if (isDefaultPassword) {
        // Optionally, you could prompt the user to change their password if they use the default
        const { token } = await this.createToken(user);
        if (!token) throw new ServerError('Unable to create token');
        return { token };
      }
    }
    // Check the hashed password if it exists
    const isCorrectPassword = await Hashing.compareHashedValue(
      trimmedProvidedPassword,
      user.password,
    );
    if (isCorrectPassword) {
      const { token } = await this.createToken(user);
      if (!token) throw new ServerError('Unable to create token');
      return { token };
    }
    throw new UnAuthorizedError('Incorrect Credentials');
  },
};
export default AuthHelper;
