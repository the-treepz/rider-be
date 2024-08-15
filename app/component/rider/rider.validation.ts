import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';

const RiderValidation = {
  async update(request: Request, response: Response, next: NextFunction) {
    const schema = Joi.object({
      image: Joi.string().label('image'),
      firstName: Joi.string(),
      lastName: Joi.string(),
      phoneNumber: Joi.string(),
      email: Joi.string().email(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
};
export default RiderValidation;
