import SharedHelper from '../../lib/shared.helper';
import EmailLogService from '../../lib/email/email-log.service';
import { ENVIRONMENT } from '../../config/secrets';

const cron = require('node-cron');

const Cron = {
  async sendUnsentEmails() {
    if (SharedHelper.checkIfProductionOrStagingEnvironment()) {
      cron.schedule('0 11 * * *', async () => {
        await EmailLogService.sendFailedEmails();
        return EmailLogService.sendPendingEmails();
      });
    }
    return ENVIRONMENT;
  },
};
export default Cron;
