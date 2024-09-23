import Email from '../../lib/email/email';
import VerificationEmailHelper from './verification-email.helper';
import { RiderInterface } from '../user/interface/rider.interface';

const VerificationEmail = {
  async userIsRequestingVerificationCodeEmail(
    user: RiderInterface,
    otp: string,
  ) {
    return Email.sendEmail(
      VerificationEmailHelper.sendUserRequestingToVerifyEmail(
        user.email,
        user.firstName,
        otp,
      ),
    );
  },
};
export default VerificationEmail;
