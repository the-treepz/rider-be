import { ENVIRONMENT } from './secrets';

const env = require('./env')[String(ENVIRONMENT)];

const { database, appUrl } = env;

const EnvHelper = {
  getFrontEndUrl() {
    return 'https://someurl.com/';
  },
  getDatabase() {
    return database;
  },
  getAppUrl() {
    return appUrl;
  },
};
export default EnvHelper;
