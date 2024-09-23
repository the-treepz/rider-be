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
      estimatedPickUpTime: Joi.string().required(),
      estimatedDropOffTime: Joi.string(),
      tripType: Joi.string().required().valid('round', 'one-way'), // Must be either 'self' or 'others'
      bookingFor: Joi.string()
        .valid('self', 'others') // Must be either 'self' or 'others'
        .required(), // Make it required
      details: Joi.object().when(
        Joi.object({ bookingFor: 'others' }).unknown(),
        {
          then: Joi.object({
            name: Joi.string().required(), // Name is required when booking for others
            phoneNumber: Joi.string()
              .pattern(/^[0-9]{10}$/) // Example pattern for a 10-digit phone number
              .required(), // Phone number is required
          }).required(), // Make the details object required if booking for others
          otherwise: Joi.forbidden(), // No additional details allowed when booking for self
        },
      ),
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
