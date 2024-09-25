import app from './app';
import logger from './lib/logger';
import { connectToDatabase } from './data-access/database-connection';
import { ENVIRONMENT } from './config/secrets';
import Notification from './lib/notification';
import Cron from './libraries/package/cron';
import BusinessModel from './component/business/repository/business.model';
import * as mongoose from 'mongoose';
const APP_PORT: number = parseInt(process.env.PORT as string, 10) || 1234;
const server = app.listen(APP_PORT, () => {
  logger.info(`Server started at ${APP_PORT}`);
  connectToDatabase()
    .then(async (response) => {
      mongoose.model('Business', BusinessModel.schema);
      // mongoose.model('Rider', RiderModel.schema);
      logger.debug(`${response.connection.name} ----> the name`);
      logger.debug(`${response.connection.host} ----> the host`);
      logger.debug(`${response.connection.user} ----> the user`);
      logger.info(`ENVIRONMENT: ${ENVIRONMENT}`);
      return Cron.sendUnsentEmails();
    })
    .catch(() => {
      logger.error('Unable to connect to the database');
      return Notification.notifyMe(
        'database is down on gearup',
        'Database Conection',
      );
    });
});
process.on('unhandledRejection', (err, promise) => {
  logger.info(err);
  logger.info(promise);
  server.close(() => process.exit(1));
});
