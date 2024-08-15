import { EMAIL_FROM } from './email-log.constant';

const EmailHelper = {
  getFromEmail() {
    return EMAIL_FROM.BREVO_EMAIL_FROM;
  },
  getFromName() {
    return EMAIL_FROM.BREVO_EMAIL_FROM;
  },
  getApplicationEmail() {
    return ['tina@treepz.com'];
  },
  getInquiryEmail() {
    return ['tina@treepz.com'];
  },
};
export default EmailHelper;
