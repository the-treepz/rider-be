import { Types } from 'mongoose';
import { ENVIRONMENT } from '../config/secrets';
import { UnknownInterface } from './unknown.interface';
import { ClientError } from '../exception/client.error';

const { ObjectId } = Types;
const SharedHelper = {
  convertStringToObjectId(params: string) {
    if (this.validObjectId(params)) {
      return new Types.ObjectId(params);
    }
    throw new ClientError('id is not valid');
  },
  trimString(string: string) {
    return string.trim();
  },
  lowerCase(string: string) {
    return string.toLowerCase();
  },
  titleCase(str: string) {
    return str
      .trim()
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  },

  checkIfProductionOrStagingEnvironment() {
    return ENVIRONMENT === 'production' || ENVIRONMENT === 'staging';
  },
  checkIfEnvironmentIsProductionOrStaging() {
    return ENVIRONMENT === 'production' || ENVIRONMENT === 'staging';
  },
  validObjectId(id: UnknownInterface) {
    return ObjectId.isValid(id);
  },
};
export default SharedHelper;
