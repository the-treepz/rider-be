import { TREEPZ_NOTILIFY_API_KEY } from '../../../../config/secrets';
import { NotilifyPostRequestInterface } from './notilify.interface';
import HttpHelper from '../../../../lib/helper/http-helper';

const headers = {
  Authorization: `Bearer ${TREEPZ_NOTILIFY_API_KEY}`,
};
const NotilifyHttp = {
  async postWithAuthorization(data: NotilifyPostRequestInterface, url: string) {
    return HttpHelper.postWithAuthorization(url, data, headers);
  },
};
export default NotilifyHttp;
