import BusinessModel from './business.model';
import * as type from '../interface/business.interface';
import { BusinessInterface } from '../interface/business.interface';

class BusinessRepository {
  public static async countDocument() {
    try {
      return BusinessModel.countDocuments();
    } catch (e) {
      return e;
    }
  }

  public static async create(data: type.CreateBusinessInterface) {
    try {
      return BusinessModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async findOne(
    data: type.FindBusinessInterface,
    lean?: boolean,
  ) {
    try {
      if (lean) return BusinessModel.findOne(data);
      return BusinessModel.findOne(data).populate('employees');
    } catch (e) {
      return e;
    }
  }
}
export default BusinessRepository;
