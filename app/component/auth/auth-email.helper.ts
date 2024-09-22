import { RiderInterface } from '../user/interface/rider.interface';
import EmailTemplatesHelper from '../../html/helper/email-template.helper';
import EmailHelper from '../../lib/email/email-helper';
import { EMAIL_SUBJECT } from '../../lib/email/email-log.constant';
import { OtpInterface } from '../otp/interface/otp.interface';

const AuthEmailHelper = {
  createPasswordResetSuccessful(data: {
    email: RiderInterface['email'];
    firstName: RiderInterface['firstName'];
  }) {
    const { email, firstName } = data;
    return {
      to: [email],
      subject: 'Treepz -  Your Password Has Been Successfully Reset',
      html: EmailTemplatesHelper.generateTemplate(
        {
          email,
          firstName,
        },
        'password-reset.html',
      ),
      from: EmailHelper.getFromEmail(),
    };
  },
  createForgotPasswordOtp(data: {
    email: RiderInterface['email'];
    firstName: RiderInterface['firstName'];
    forgotPasswordUrl: string;
    otp: OtpInterface['otp'];
  }) {
    const { email, firstName, forgotPasswordUrl, otp } = data;
    return {
      to: [email],
      subject: 'Treepz - Password Reset Assistance',
      html: EmailTemplatesHelper.generateTemplate(
        {
          firstName,
          forgotPasswordUrl,
          otp,
        },
        'forgot-password.html',
      ),
      from: EmailHelper.getFromEmail(),
    };
  },
  sendVerificationEmailToUser(data: {
    email: RiderInterface['email'];
    firstName: RiderInterface['firstName'];
    otp: OtpInterface['otp'];
  }) {
    const { email, firstName, otp } = data;
    return {
      to: [email],
      subject: EMAIL_SUBJECT.WELCOME_TO_TREEPZ_CONFIRM_EMAIL,
      html: EmailTemplatesHelper.generateTemplate(
        {
          email,
          firstName,
          otp,
        },
        'user-verification-on-sign-up.html',
      ),
      from: EmailHelper.getFromEmail(),
    };
  },
};
export default AuthEmailHelper;
