import { Application } from 'express';
import EmployeeController from './employee.controller';
import { EDIT_EMPLOYEE, GET_EMPLOYEES, INVITE_EMPLOYEE } from './employee.url';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';
import EmployeeValidation from './employee.validation';

class EmployeeRoute {
  public employeeController: EmployeeController = new EmployeeController();

  public routes = (app: Application): void => {
    app
      .route(`${GET_EMPLOYEES}`)
      .get(
        asyncHandler(requireAuthorization),
        asyncHandler(this.employeeController.getAll),
      );
    app
      .route(`${EDIT_EMPLOYEE}/:employeeId`)
      .put(
        asyncHandler(requireAuthorization),
        asyncHandler(EmployeeValidation.edit),
        asyncHandler(this.employeeController.edit),
      );
    app
      .route(`${INVITE_EMPLOYEE}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(EmployeeValidation.invite),
        asyncHandler(this.employeeController.invite),
      );
  };
}

export default EmployeeRoute;
