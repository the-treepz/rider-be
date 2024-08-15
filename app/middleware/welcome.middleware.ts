import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ENVIRONMENT } from '../config/secrets';
import ResponseHandler from '../lib/response-handler';

function welcomeMessage(request: Request, response: Response) {
  const message =
    ENVIRONMENT === 'staging' ? 'hello from staging' : 'hello from production';
  ResponseHandler.SuccessResponse(response, StatusCodes.OK, message);
}

export default welcomeMessage;
