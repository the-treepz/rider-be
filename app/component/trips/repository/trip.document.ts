import { Document, Types } from 'mongoose';

export interface TripDocument extends Document {
  _id: Types.ObjectId;
  city: string;
  country: string;
  creditScore: string;
  email: string;
  startDate: string;
  phoneNumber: string;
  knowsCreditScore: boolean;
  hasDriverLicense: boolean;
  needHelpGettingDriverLicence: boolean;
  /**
   * drive to owm
   * flexirental
   */
  typeOfArrangement: string;
  validDriversLicense: string;
  hasValidDriversLicence: string;
  province: string;
  postCode: string;
  aboveAge: boolean;
  firstName: string;
  lastName: string;
}
