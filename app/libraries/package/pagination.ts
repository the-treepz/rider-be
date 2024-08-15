import { getPaginationQueryDetails } from 'simple-mongoose-pagination';

export interface PaginationQueryInterface {
  pageNumber: number;
  itemsPerPage: number;
}

const Pagination = {
  getPaginationQueryDetails(
    paginateQuery: PaginationQueryInterface,
    totalItemsCount: number,
  ) {
    return getPaginationQueryDetails(
      paginateQuery,
      totalItemsCount === 0 ? 0 : totalItemsCount,
    );
  },
};
export default Pagination;
