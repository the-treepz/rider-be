import { ENVIRONMENT } from './secrets';

const env = require('./env')[String(ENVIRONMENT)];

const { database, appUrl } = env;

const EnvHelper = {
  getDatabase() {
    return database;
  },
  getAppUrl() {
    return appUrl;
  },
};
export default EnvHelper;
