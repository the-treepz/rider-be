import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';

const VerificationValidation = {
  async validateVerifyEmail(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      otp: Joi.string()
        .label('the otp sent to your email on registration')
        .required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async validateToRequestToVerifyEmail(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required()
        .label('the email you used to register your account'),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
};
export default VerificationValidation;
