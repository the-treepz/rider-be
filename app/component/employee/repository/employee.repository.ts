import EmployeeModel from './employee.model';
import * as type from '../interface/employee.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';

class EmployeeRepository {
  public static async countDocument(query: type.FindEmployeeInterface) {
    try {
      return EmployeeModel.countDocuments(query);
    } catch (e) {
      return e;
    }
  }

  public static async findAll(
    query: type.FindEmployeeInterface,
    skip: number,
    limit: number,
  ) {
    try {
      // Conditionally add $skip and $limit
      const pipeline: UnknownInterface = [
        { $match: query },
        {
          $lookup: {
            from: 'trips',
            localField: '_id',
            foreignField: 'user',
            as: 'trips',
          },
        },
        {
          $project: {
            email: 1,
            firstName: 1,
            lastName: 1,
            status: 1,
            business: 1,
            totalCheckIn: { $size: '$checkIns' },
            totalCheckOut: {
              $size: {
                $filter: {
                  input: '$checkIns',
                  as: 'checkIn',
                  cond: { $ne: ['$$checkIn.checkOutTime', null] },
                },
              },
            },
          },
        },
      ];
      if (skip >= 0) {
        pipeline.push({ $skip: skip });
      }
      if (limit > 0) {
        pipeline.push({ $limit: limit });
      }
      return EmployeeModel.aggregate(pipeline);
    } catch (e) {
      return e;
    }
  }

  public static async findOne(query: type.FindEmployeeInterface) {
    try {
      return EmployeeModel.findOne(query);
    } catch (e) {
      return e;
    }
  }

  public static async update(
    employee: type.EmployeeInterface['_id'],
    query: type.UpdateEmployeeInterface,
  ) {
    try {
      return EmployeeModel.findByIdAndUpdate(employee, query, { new: true });
    } catch (e) {
      return e;
    }
  }

  public static async invite(query: type.CreateEmployeeInterface) {
    try {
      return EmployeeModel.create(query);
    } catch (e) {
      return e;
    }
  }
}
export default EmployeeRepository;
