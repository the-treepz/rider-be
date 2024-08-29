import { PlunkResponseInterface } from './plunk.interface';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../../../../exception/custom.error';

const PlunkResponse = {
  checkResponse(result: PlunkResponseInterface, errorMessage: string) {
    if (result && result.status === StatusCodes.OK && result.data)
      return result.data;
    return this.checkErrorResponse(result, errorMessage);
  },
  checkErrorResponse(
    errorResponse: PlunkResponseInterface,
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
export default PlunkResponse;
