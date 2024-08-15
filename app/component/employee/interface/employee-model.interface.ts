import { Model } from 'mongoose';
import { EmployeeDocument } from '../repository/employee.document';
import { EmployeeInterface } from './employee.interface';

export interface EmployeeModelInterface extends Model<EmployeeDocument> {
  build(attr: EmployeeInterface): EmployeeDocument;
}
