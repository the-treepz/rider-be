import { StatusCodes } from 'http-status-codes';
import CustomError from '../../../../exception/custom.error';
import { BrevoResponseInterface } from './brevo.interface';

const BrevoResponse = {
  checkResponse(result: BrevoResponseInterface, errorMessage: string) {
    if (result && result.status === StatusCodes.CREATED && result.data)
      return result.data;
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
export default BrevoResponse;
