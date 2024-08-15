import Email from './email/email';

const Notification = {
  notifyMe(message: string, subject: string) {
    return this.sendMeEmail(message, subject);
  },
  sendMeEmail(message: string, subject: string) {
    return Email.sendMeEmail(message, subject);
  },
};
export default Notification;
