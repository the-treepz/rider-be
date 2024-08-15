import HttpHelper from '../../../../lib/helper/http-helper';
import { BrevoSendEmailInterface } from './brevo.interface';
import { TREEPZ_BREVO_API_KEY } from '../../../../config/secrets';

const headers = {
  'api-key': TREEPZ_BREVO_API_KEY,
};
const BrevoHttp = {
  async postWithAuthorization(data: BrevoSendEmailInterface, url: string) {
    return HttpHelper.postWithAuthorization(url, data, headers);
  },
};
export default BrevoHttp;
