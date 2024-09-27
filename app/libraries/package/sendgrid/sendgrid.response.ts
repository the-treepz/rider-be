import { BrevoResponseInterface } from './sendgrid.interface';
import { StatusCodes } from 'http-status-codes';
import { UnknownInterface } from '../../../lib/unknown.interface';
import CustomError from '../../../exception/custom.error';

const SendgridResponse = {
  checkResponse(result: UnknownInterface, errorMessage: string) {
    if (result && result[0].statusCode === 202) return result;
    return this.checkErrorResponse(result, errorMessage);
  },
  checkErrorResponse(
    errorResponse: BrevoResponseInterface,
    defaultMessage: string,
  ) {
    const status =
      errorResponse &&
      errorResponse.response &&
      errorResponse.response.data &&
      errorResponse.response.data.statusCode
        ? errorResponse.response.data.statusCode
        : StatusCodes.BAD_REQUEST;
    const errorMessage =
      errorResponse?.response?.body?.errors?.[0]?.message ||
      `unable to ${defaultMessage}`;
    throw new CustomError(status, errorMessage);
  },
};
export default SendgridResponse;
