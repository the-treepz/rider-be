import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UnknownInterface } from '../lib/unknown.interface';
import SharedHelper from '../lib/shared.helper';
import logger from '../lib/logger';
import Email from '../lib/email/email';
import CustomError from '../exception/custom.error';
import ResponseHandler from '../lib/response-handler';

function logError(
  request: Request,
  body: UnknownInterface,
  message: string,
  status: number,
) {
  if (SharedHelper.checkIfEnvironmentIsProductionOrStaging()) {
    logger.error(
      `BODY- ${body}, STATUS - ${status}, MESSAGE - ${message}, URL - ${request.originalUrl}, METHOD - ${request.method}, IP - ${request.ip}`,
    );
  }
}

function sendEmail(body: string, message: string, url: string) {
  return Email.sendMeEmail(
    `URL- ${url} || Body - ${body} || Message - ${message}`,
    message,
  );
}

function errorMiddleware(
  error: CustomError | UnknownInterface,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const url = request.originalUrl;
  const status = error.status || 500;
  const hasErrorMessage = error && error.message;
  const message = hasErrorMessage
    ? hasErrorMessage.toString()
    : 'Something went wrong';
  const err = error.error || null;
  const body = `${JSON.stringify(request.body)}`;
  logError(request, body, message, status);
  if (status === StatusCodes.BAD_REQUEST) {
    ResponseHandler.BadRequestResponse(response, message, err);
    return sendEmail(body, message, url);
  }
  if (status === 420) {
    response.status(420).json({
      message: SharedHelper.titleCase(message),
      status: false,
    });
    return sendEmail(body, message, url);
  }
  if (status === 422) {
    response.status(422).json({
      message: SharedHelper.titleCase(message),
      status: false,
    });
    return sendEmail(body, message, url);
  }
  if (status === 429) {
    response.status(429).json({
      message: SharedHelper.titleCase(message),
      status: false,
    });
    return sendEmail(body, message, url);
  }
  if (status === StatusCodes.FORBIDDEN) {
    ResponseHandler.ForbiddenRequestResponse(response, message, err);
    return sendEmail(body, message, url);
  }
  if (status === StatusCodes.NOT_FOUND) {
    ResponseHandler.NotFoundResponse(response, message);
    return sendEmail(body, message, url);
  }
  if (status === StatusCodes.UNAUTHORIZED) {
    ResponseHandler.UnAuthorizedResponse(response, message);
    return sendEmail(body, message, url);
  }
  if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
    ResponseHandler.ServerErrorResponse(response, status, message, err);
    return sendEmail(body, message, url);
  }
  if (err === null) {
    ResponseHandler.ServerErrorResponse(
      response,
      status,
      'unable to complete request',
      err,
    );
    return sendEmail(body, message, url);
  }
  ResponseHandler.ServerErrorResponse(
    response,
    status,
    'unable to complete request',
    err,
  );
  return sendEmail(body, message, url);
}

export default errorMiddleware;
