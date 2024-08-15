import { InviteEmployeeInterface } from './interface/employee.interface';
import { EMAIL_SUBJECT } from '../../lib/email/email-log.constant';
import EmailTemplatesHelper from '../../html/helper/email-template.helper';
import EmailHelper from '../../lib/email/email-helper';

const EmployeeEmailHelper = {
  createBuisnessInviteEmail(body: InviteEmployeeInterface) {
    const { businessName, email, firstName } = body;
    return {
      to: email,
      subject: EMAIL_SUBJECT.EMPLOYEE_INVITE,
      html: EmailTemplatesHelper.generateTemplate(
        {
          businessName,
          firstName,
        },
        'invite-employee.html',
      ),
      from: EmailHelper.getFromEmail(),
    };
  },
};
export default EmployeeEmailHelper;
