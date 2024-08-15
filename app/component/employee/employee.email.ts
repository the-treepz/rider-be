import { InviteEmployeeInterface } from './interface/employee.interface';
import Email from '../../lib/email/email';
import EmployeeEmailHelper from './employee-email.helper';

const EmployeeEmail = {
  async sendInvite(data: InviteEmployeeInterface) {
    return Email.sendEmail(EmployeeEmailHelper.createBuisnessInviteEmail(data));
  },
};
export default EmployeeEmail;
