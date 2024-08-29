import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';

const TripValidation = {
  async create(request: Request, response: Response, next: NextFunction) {
    const schema = Joi.object({
      batteryCapacity: Joi.string().required(),
      fuel: Joi.string().required(),
      images: Joi.array().items(Joi.string()).required(),
      logo: Joi.string().required(),
      model: Joi.string().required(),
      size: Joi.string().required(),
      transmission: Joi.string().required(),
      year: Joi.string().required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
};
export default TripValidation;
