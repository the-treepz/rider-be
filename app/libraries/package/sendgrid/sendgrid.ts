import { SendgridSendEmailInterface } from './sendgrid.interface';
import SendgridService from './sendgrid.service';
import SendgridResponse from './sendgrid.response';

const Sendgrid = {
  async sendEmail(data: SendgridSendEmailInterface) {
    const { to, subject, html } = data;
    return SendgridService.sendEmail({
      html,
      from: 'tina@treepz.com',
      subject,
      to,
    })
      .then(async (response) => {
        return SendgridResponse.checkResponse(response, 'send email');
      })
      .catch((err) => {
        return SendgridResponse.checkErrorResponse(err, 'send email');
      });
  },
};
export default Sendgrid;
