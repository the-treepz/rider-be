import Email from '../../lib/email/email';
import EnvHelper from '../../config/env.helper';
import AuthEmailHelper from './auth-email.helper';
import { RiderInterface } from '../user/interface/rider.interface';

const AuthEmail = {
  async sendWelcomeEmailToUser(
    email: RiderInterface['email'],
    firstName: string,
    otp: string,
  ) {
    return Email.sendEmail(
      AuthEmailHelper.createWelcomeEmial({
        email,
        firstName,
        otp,
      }),
    );
  },
  async sendPasswordResetted(
    email: RiderInterface['email'],
    firstName: string,
  ) {
    return Email.sendEmail(
      AuthEmailHelper.createPasswordResetSuccessful({
        email,
        firstName,
      }),
    );
  },

  async sendForgotPasswordOtp(data: {
    email: RiderInterface['email'];
    otp: string;
    firstName: RiderInterface['firstName'];
  }) {
    const { email, firstName, otp } = data;
    const forgotPasswordUrl = `${EnvHelper.getFrontEndUrl()}reset-password`;
    return Email.sendEmail(
      AuthEmailHelper.createForgotPasswordOtp({
        email,
        firstName,
        forgotPasswordUrl,
        otp,
      }),
    );
  },
};
export default AuthEmail;
