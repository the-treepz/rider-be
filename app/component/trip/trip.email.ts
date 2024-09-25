import TripEmailHelper, {
  TripBookedInterfaceAdminEmailInterface,
} from './helper/trip-email.helper';
import Email from '../../lib/email/email';

const TripeEmail = {
  async sendTripBookedEmail(data: TripBookedInterfaceAdminEmailInterface) {
    return Email.sendEmail(TripEmailHelper.createTripBooledEmail(data));
  },
};
export default TripeEmail;
