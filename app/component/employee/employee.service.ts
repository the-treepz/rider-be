import * as type from './interface/employee.interface';
import EmployeeRepository from './repository/employee.repository';
import Pagination from '../../libraries/package/pagination';
import SharedHelper from '../../lib/shared.helper';
import { ClientError } from '../../exception/client.error';
import { NotFoundError } from '../../exception/not-found.error';

const EmployeeService = {
  async findOne(body: type.FindEmployeeInterface) {
    return EmployeeRepository.findOne(body);
  },
  async checkIfEmployeeAlreadyExists(email: string) {
    const checkIfEmployeeExists = await EmployeeService.findOne({
      email: SharedHelper.lowerCase(email),
    });
    if (checkIfEmployeeExists) throw new ClientError('employee already exists');
    return checkIfEmployeeExists;
  },
  async checkIfEmployeeExists(data: type.FindEmployeeInterface) {
    const checkIfEmployeeExists = await this.findOne(data);
    if (checkIfEmployeeExists) return checkIfEmployeeExists;
    throw new NotFoundError('the employee does not exist');
  },
  async update(
    employee: type.EmployeeInterface['_id'],
    body: type.UpdateEmployeeInterface,
  ) {
    return EmployeeRepository.update(employee, body);
  },
  async invite(params: type.CreateEmployeeInterface) {
    return EmployeeRepository.invite(params);
  },
  async findAll(
    query: type.FindEmployeeInterface,
    itemsPerPage: number,
    pageNumber: number,
  ) {
    const allEmployees = await EmployeeRepository.countDocument(query);
    const result = Pagination.getPaginationQueryDetails(
      { pageNumber, itemsPerPage },
      allEmployees,
    );
    const employees = await EmployeeRepository.findAll(
      query,
      result.skip,
      result.limit,
    );
    return {
      employees,
      currentPage: result.currentPage,
      totalItemsCount: result.totalItemsCount,
      totalPages: result.totalPages,
    };
  },
};
export default EmployeeService;
