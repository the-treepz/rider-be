import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';
import { EMPLOYEE_STATUS_ENUM } from './repository/employee.model';

const EmployeeValidation = {
  async edit(request: Request, response: Response, next: NextFunction) {
    const schema = Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      status: Joi.string().valid(
        EMPLOYEE_STATUS_ENUM.Active,
        EMPLOYEE_STATUS_ENUM.Invited,
        EMPLOYEE_STATUS_ENUM.Pending,
      ),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async invite(request: Request, response: Response, next: NextFunction) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
};
export default EmployeeValidation;
