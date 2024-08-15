import { StatusCodes } from 'http-status-codes';
import { NotilifyResponseInterface } from './notilify.interface';
import CustomError from '../../../../exception/custom.error';

const NotilifyResponse = {
  checkResponse(result: NotilifyResponseInterface, errorMessage: string) {
    if (result && result.data) return result.data;
    return this.checkErrorResponse(result, errorMessage);
  },
  checkErrorResponse(
    errorResponse: NotilifyResponseInterface,
    defaultMessage: string,
  ) {
    const status =
      errorResponse &&
      errorResponse.response &&
      errorResponse.response.data &&
      errorResponse.response.data.statusCode
        ? errorResponse.response.data.statusCode
        : StatusCodes.BAD_REQUEST;
    const message =
      errorResponse &&
      errorResponse.response &&
      errorResponse.response.data &&
      errorResponse.response.data.message
        ? errorResponse.response.data.message
        : `unable to ${defaultMessage}`;
    throw new CustomError(status, message);
  },
};
export default NotilifyResponse;
