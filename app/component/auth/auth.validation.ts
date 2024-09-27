import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';

const AuthValidation = {
  async validateLogin(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      email: Joi.string().email().label('Email').required(),
      password: Joi.string().label('Password').required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async validateSignUp(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string()
        .label('Password')
        .required()
        .regex(/^.{8,200}$/)
        .message(
          'Password should contain at least 8 characters; 1 symbol, 1 number and 1 uppercase letter.',
        )
        .min(8),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async validateForgotPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      email: Joi.string().email().label('Email').required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async validateChangePassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      oldPassword: Joi.string().email().label('old Password').required(),
      newPassword: Joi.string().email().label('new Password').required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async validateResetPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      otp: Joi.string().required(),
      password: Joi.string().required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
};
export default AuthValidation;
