import { TREEPZ_PLUNK_API_KEY } from '../../../../config/secrets';
import { PlunkSendEmailInterface } from './plunk.interface';
import HttpHelper from '../../../../lib/helper/http-helper';

const headers = {
  Authorization: `Bearer ${TREEPZ_PLUNK_API_KEY}`,
};
const PlunkHttp = {
  async postWithAuthorization(data: PlunkSendEmailInterface, url: string) {
    return HttpHelper.postWithAuthorization(url, data, headers);
  },
};
export default PlunkHttp;
