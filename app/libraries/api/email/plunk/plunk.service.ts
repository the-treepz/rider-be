import { PlunkSendEmailInterface } from './plunk.interface';
import PlunkHttp from './plunk.http';

const PlunkService = {
  async sendEmail(data: PlunkSendEmailInterface) {
    return PlunkHttp.postWithAuthorization(
      data,
      'https://api.useplunk.com/v1/send',
    );
  },
};
export default PlunkService;
