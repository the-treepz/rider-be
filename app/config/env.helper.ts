import { ENVIRONMENT } from './secrets';

const env = require('./env')[String(ENVIRONMENT)];

const { database, appUrl, paystackSecretKey } = env;

const EnvHelper = {
  getFrontEndUrl() {
    return 'https://someurl.com/';
  },
  getPaystackSecretKey() {
    return paystackSecretKey;
  },
  getDatabase() {
    return database;
  },
  getAppUrl() {
    return appUrl;
  },
};
export default EnvHelper;
