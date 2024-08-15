import axios from 'axios';
import { BrevoSendEmailInterface } from '../../libraries/api/email/brevo/brevo.interface';
import { UnknownInterface } from '../unknown.interface';
import { NotilifyPostRequestInterface } from '../../libraries/api/email/notilify/notilify.interface';

type PostRequestInterface =
  | BrevoSendEmailInterface
  | NotilifyPostRequestInterface;
const HttpHelper = {
  async get(url: string) {
    try {
      return axios.get(url);
    } catch (error) {
      return error;
    }
  },
  async post(url: string, body: UnknownInterface) {
    try {
      return axios.post(url, body);
    } catch (error) {
      return error;
    }
  },

  async postWithAuthorization(
    url: string,
    body: PostRequestInterface,
    headers: { Authorization: string } | UnknownInterface,
  ) {
    try {
      return axios.post(url, body, { headers });
    } catch (error) {
      return error;
    }
  },
};
export default HttpHelper;
