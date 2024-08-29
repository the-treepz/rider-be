import { UserInterface } from '../user/interface/user.interface';
import EmailTemplatesHelper from '../../html/helper/email-template.helper';
import EmailHelper from '../../lib/email/email-helper';
import { EMAIL_SUBJECT } from '../../lib/email/email-log.constant';
import { OtpInterface } from '../otp/interface/otp.interface';

const AuthEmailHelper = {
  createPasswordResetSuccessful(data: {
    email: UserInterface['email'];
    firstName: UserInterface['firstName'];
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
    email: UserInterface['email'];
    firstName: UserInterface['firstName'];
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
    email: UserInterface['email'];
    firstName: UserInterface['firstName'];
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
