import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import EmployeeService from './employee.service';
import ResponseHandler from '../../lib/response-handler';
import { ClientError } from '../../exception/client.error';
import SharedHelper from '../../lib/shared.helper';
import RiderService from '../rider/rider.service';
import EmployeeEmail from './employee.email';

class EmployeeController {
  public getAll = async (request: Request, response: Response) => {
    const { employees, totalItemsCount, totalPages, currentPage } =
      await EmployeeService.findAll(
        {},
        Number(request.query.itemsPerPage) || 1,
        Number(request.query.pageNumber) || 1,
      );
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'fetched employees',
      { employees, totalItemsCount, totalPages, currentPage },
    );
  };

  public edit = async (request: Request, response: Response) => {
    if (!request.params.employeeId)
      throw new ClientError('employee id is required');
    await EmployeeService.checkIfEmployeeExists({
      _id: SharedHelper.convertStringToObjectId(request.params.employeeId),
    });
    const updatedEmployee = await EmployeeService.update(
      SharedHelper.convertStringToObjectId(request.params.employeeId),
      request.body,
    );
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'Employee updated successfully',
      updatedEmployee,
    );
  };

  public invite = async (request: Request, response: Response) => {
    await EmployeeService.checkIfEmployeeAlreadyExists(request.body.email);
    await EmployeeService.invite({
      ...request.body,
      ...{ business: request.user.id },
    });
    ResponseHandler.CreatedResponse(response, 'employee created');
    const business = await RiderService.findOne({
      _id: request.user.id,
    });
    return EmployeeEmail.sendInvite({
      businessName: business.name,
      email: request.body.email,
      firstName: request.body.firstName,
    });
  };
}

export default EmployeeController;
