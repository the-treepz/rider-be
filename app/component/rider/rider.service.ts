import * as type from './interface/rider.interface';
import RiderRepository from './repository/rider.repository';
import Pagination from '../../libraries/package/pagination';

const RiderService = {
  async findAll(
    query: type.FindRiderInterface,
    itemsPerPage: number,
    pageNumber: number,
  ) {
    const allBusinesses = await RiderRepository.countDocument();
    const result = Pagination.getPaginationQueryDetails(
      { pageNumber, itemsPerPage },
      allBusinesses,
    );
    const businesses = await RiderRepository.getAll(
      query,
      result.skip,
      result.limit,
    );
    return {
      businesses,
      currentPage: result.currentPage,
      totalItemsCount: result.totalItemsCount,
      totalPages: result.totalPages,
    };
  },

  async findOne(data: type.FindRiderInterface, lean?: boolean) {
    return RiderRepository.findOne(data, lean);
  },
  async update(
    business: type.RiderInterface['_id'],
    body: type.UpdateBusinessInterface,
  ) {
    return RiderRepository.update(business, body);
  },
};
export default RiderService;
