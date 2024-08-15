import { RiderInterface } from '../rider/interface/rider.interface';
import RiderService from '../rider/rider.service';
import { EmployeeInterface } from '../employee/interface/employee.interface';
import TripRepository from './repository/trip.repository';
import * as type from './interface/trip.interface';
import { UnknownInterface } from '../../lib/unknown.interface';
import EmployeeService from '../employee/employee.service';
import Pagination from '../../libraries/package/pagination';

const TripService = {
  async getTotalCheckInsOrCheckOuts(
    business: RiderInterface['_id'],
    checkType: string,
  ) {
    const findBuisness = await RiderService.findOne({ _id: business }, false);
    const employeeIds = findBuisness.employees.map(
      (employee: EmployeeInterface) => employee._id,
    );
    if (checkType === 'in') {
      return TripRepository.getCheckInCount(employeeIds);
    }
    return TripRepository.getCheckOutCount(employeeIds);
  },
  async findOne(body: type.FindTripInterface) {
    return TripRepository.findOne(body);
  },

  async findAll(params: {
    business: RiderInterface['_id'];
    from?: string;
    to?: string;
    itemsPerPage: number;
    pageNumber: number;
  }) {
    const { business, from, to, itemsPerPage, pageNumber } = params;
    const query: UnknownInterface = {};
    const { employees } = await EmployeeService.findAll({ business }, 0, 0);
    const employeeIds = employees.map((one: any) => one._id);
    query.employee = { $in: employeeIds };
    if (from || to) {
      query.createdAt = {};
      if (from) {
        query.createdAt.$gte = new Date(from);
      }
      if (to) {
        query.createdAt.$lte = new Date(to);
      }
    }
    const allTrips = await TripRepository.countDocuments(query);

    const result = Pagination.getPaginationQueryDetails(
      { pageNumber, itemsPerPage },
      allTrips,
    );
    const filteredTrips = await TripRepository.findAll(
      query,
      result.skip,
      result.limit,
    );
    return {
      trips: filteredTrips,
      currentPage: result.currentPage,
      totalItemsCount: result.totalItemsCount,
      totalPages: result.totalPages,
    };
  },
};
export default TripService;
