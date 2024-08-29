import {UserInterface} from "../rider/interface/user.interface";
import * as type from "./interface/trip.interface";
import TripRepository from "./repository/trip.repository";
import {UnknownInterface} from "../../lib/unknown.interface";

const TripService = {
  async getTotalCheckInsOrCheckOuts(
      business: UserInterface['_id'],
      checkType: string,
  ) {
    // const findBuisness = await RiderService.findOne({ _id: business }, false);
    // const employeeIds = findBuisness.employees.map(
    //     (employee: RiderInterface['_id']) => employee._id,
    // );
    // if (checkType === 'in') {
    //   return TripRepository.getCheckInCount(employeeIds);
    // }
    // return TripRepository.getCheckOutCount(employeeIds);
  },
  // async findOne(body: type.FindTripInterface) {
  //   return TripRepository.findOne(body);
  // },
  async create(body: type.CreateTripInerfacee) {
    return TripRepository.create(body);
  },

  async findAll(params: {
    rider: UserInterface['_id'];
    from?: string;
    to?: string;
    itemsPerPage: number;
    pageNumber: number;
  }) {
    const { rider, from, to, itemsPerPage, pageNumber } = params;
    const query: UnknownInterface = {};
    // const { employees } = await RiderService.findAll({ rider }, 0, 0);
    // const employeeIds = employees.map((one: any) => one._id);
    // query.employee = { $in: employeeIds };
    // if (from || to) {
    //   query.createdAt = {};
    //   if (from) {
    //     query.createdAt.$gte = new Date(from);
    //   }
    //   if (to) {
    //     query.createdAt.$lte = new Date(to);
    //   }
    // }
    // const allTrips = await TripRepository.countDocuments(query);
    //
    // const result = Pagination.getPaginationQueryDetails(
    //     { pageNumber, itemsPerPage },
    //     allTrips,
    // );
    // const filteredTrips = await TripRepository.findAll(
    //     query,
    //     result.skip,
    //     result.limit,
    // );
    // return {
    //   trips: filteredTrips,
    //   currentPage: result.currentPage,
    //   totalItemsCount: result.totalItemsCount,
    //   totalPages: result.totalPages,
    // };
  },
};
export default TripService;
