import TripEmailHelper, {
  TripBookedInterfaceAdminEmailInterface,
  TripCanceledInterfacAdminEmailInterface,
  TripCanceledInterfacUserEmailInterface,
} from './helper/trip-email.helper';
import Email from '../../lib/email/email';

const TripeEmail = {
  async sendTripBookedEmail(data: TripBookedInterfaceAdminEmailInterface) {
    return Email.sendEmail(TripEmailHelper.createTripBooledEmail(data));
  },
  async sendTripCanceled(data: TripCanceledInterfacUserEmailInterface) {
    return Email.sendEmail(TripEmailHelper.createTripCancelledEmail(data));
  },
  async sendTripCanceledTOadmin(data: TripCanceledInterfacAdminEmailInterface) {
    return Email.sendEmail(TripEmailHelper.createTripCancelledEmail(data));
  },
};
export default TripeEmail;
