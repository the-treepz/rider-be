import { RiderInterface } from '../../user/interface/rider.interface';
import { EMAIL_SUBJECT } from '../../../lib/email/email-log.constant';
import EmailTemplatesHelper from '../../../html/helper/email-template.helper';
import EmailHelper from '../../../lib/email/email-helper';
export interface TripBookedInterfaceAdminEmailInterface {
  firstName: RiderInterface['firstName'];
  dropOffLocation: string;
  pickUpLocation: string;
  vehicle: string;
}

const TripEmailHelper = {
  createTripBooledEmail(data: TripBookedInterfaceAdminEmailInterface) {
    const { firstName, dropOffLocation, pickUpLocation, vehicle } = data;
    return {
      to: EmailHelper.gettripBookenEmail(),
      subject: EMAIL_SUBJECT.NEW_TRIP_BOOKED,
      html: EmailTemplatesHelper.generateTemplate(
        {
          firstName,
          dropOffLocation,
          pickUpLocation,
          vehicle,
        },
        'trip-booked.html',
      ),
      from: EmailHelper.getFromEmail(),
    };
  },
};
export default TripEmailHelper;
