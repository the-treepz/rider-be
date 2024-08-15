import { NextFunction, Request, Response } from 'express';
import { TREEPZ_JWT_SECRET } from '../config/secrets';
import { UnAuthorizedError } from '../exception/un-authorized.error';
import Jwt from '../lib/jwt';
import AuthMiddlewareService from '../component/auth/auth.middleware';

async function checkTheAuthorization(
  next: NextFunction,
  request: Request,
  response: Response,
  token: string,
) {
  if (token.startsWith('Bearer')) {
    request.user = Jwt.verifyToken(
      token.replace(/^Bearer\s/, '').trim(),
      TREEPZ_JWT_SECRET,
    );
    return AuthMiddlewareService.getVerifiedUniversity(
      next,
      request.user.email,
    );
  }
  throw new UnAuthorizedError(
    'incorrect format - user must start with Bearer ',
  );
}
async function requireAuthorization(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.header('Authorization');
  if (!token)
    throw new UnAuthorizedError(
      'Authorization Denied: Authentication Token is Required',
    );
  return checkTheAuthorization(next, request, response, token);
}
export default requireAuthorization;
