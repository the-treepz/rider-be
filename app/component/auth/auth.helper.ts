import { UserInterface } from '../rider/interface/user.interface';
import Jwt from '../../lib/jwt';
import * as secret from '../../config/secrets';
import SharedHelper from '../../lib/shared.helper';
import Hashing from '../../libraries/package/hashing';
import { ServerError } from '../../exception/server.error';
import { UnAuthorizedError } from '../../exception/un-authorized.error';
import RiderService from '../rider/rider.service';
import AuthEmail from './auth.email';
import OtpService from '../otp/otp.service';

const AuthHelper = {
  async handleCompletePasswordReset(
    user: UserInterface['_id'],
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
    email: UserInterface['email'],
    firstName: UserInterface['firstName'],
  ) {
    const result = await OtpService.generateOtpDetail();
    await AuthEmail.sendForgotPasswordOtp({
      email,
      otp: result.otp,
      firstName,
    });
    return RiderService.updateWithQuery({ email }, { otpId: result.otpId });
  },
  async createToken(business: UserInterface) {
    const token = Jwt.createToken(
      { email: business.email, id: business._id },
      secret.TREEPZ_JWT_SECRET,
      secret.TREEPZ_JWT_EXPIRY,
    );
    return { token };
  },

  async handleLogin(user: UserInterface, passwordProvided: string) {
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
