import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';

const TripValidation = {
  async bookTrip(request: Request, response: Response, next: NextFunction) {
    const schema = Joi.object({
      pickUpLocation: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
      dropOffLocation: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
    });

    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async confirmTrip(request: Request, response: Response, next: NextFunction) {
    const schema = Joi.object({
      pickUpLocation: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
      dropOffLocation: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
      driver: Joi.string().required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async selectDriver(request: Request, response: Response, next: NextFunction) {
    const schema = Joi.object({
      driver: Joi.string().required(),
      trip: Joi.string().required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
};
export default TripValidation;
