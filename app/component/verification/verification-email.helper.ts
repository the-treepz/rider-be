import {RiderInterface} from "../user/interface/rider.interface";
import EmailTemplatesHelper from "../../html/helper/email-template.helper";
import EmailHelper from "../../lib/email/email-helper";

const VerificationEmailHelper = {
    sendUserRequestingToVerifyEmail(
        email: RiderInterface['email'],
        firstName: RiderInterface['firstName'],
        otp: any,
    ) {
        return {
            to: [email],
            subject: 'NEW OTP CODE REQUEST',
            html: EmailTemplatesHelper.generateTemplate(
                {
                    email,
                    firstName,
                    otp,
                },
                'user-requesting-another-verification-code.html',
            ),
            from: EmailHelper.getFromEmail(),
        };
    },
};
export default VerificationEmailHelper;
