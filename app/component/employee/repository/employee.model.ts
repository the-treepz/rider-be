import { model, Schema } from 'mongoose';
import { EmployeeDocument } from './employee.document';
import { EmployeeModelInterface } from '../interface/employee-model.interface';

export const EMPLOYEE_STATUS_ENUM = {
  Active: 'Active',
  Invited: 'Invited',
  Pending: 'Pending',
};

const EmployeeSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    status: {
      type: String,
      enum: [
        EMPLOYEE_STATUS_ENUM.Pending,
        EMPLOYEE_STATUS_ENUM.Active,
        EMPLOYEE_STATUS_ENUM.Invited,
      ],
      default: EMPLOYEE_STATUS_ENUM.Pending,
    },
    business: { type: Schema.Types.ObjectId, ref: 'Business' },
  },
  { timestamps: true },
);

const EmployeeModel = model<EmployeeDocument, EmployeeModelInterface>(
  'Employee',
  EmployeeSchema,
);

export default EmployeeModel;
