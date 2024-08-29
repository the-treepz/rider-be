import Email from '../../lib/email/email';
import EnvHelper from '../../config/env.helper';
import AuthEmailHelper from './auth-email.helper';
import { UserInterface } from '../user/interface/user.interface';

const AuthEmail = {
  async sendPasswordResetted(email: UserInterface['email'], firstName: string) {
    return Email.sendEmail(
      AuthEmailHelper.createPasswordResetSuccessful({
        email,
        firstName,
      }),
    );
  },

  async sendForgotPasswordOtp(data: {
    email: UserInterface['email'];
    otp: string;
    firstName: UserInterface['firstName'];
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
