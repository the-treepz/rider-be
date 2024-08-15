import {
  CreateEmailInterface,
  EmailLogInterface,
  FindEmailInterface,
  UpdateEmailLogInterface,
} from './interface/email.interface';
import EmailLogRepository from './repository/email-log.repository';
import { NotFoundError } from '../../exception/not-found.error';
import EmailLogHelper from './email-log.helper';

const EmailLogService = {
  async logEmail(data: CreateEmailInterface) {
    return EmailLogRepository.create(data);
  },
  async findEmail(data: FindEmailInterface, handle?: boolean) {
    const email = await EmailLogRepository.find(data);
    if (handle) {
      if (email) return email;
      throw new NotFoundError(`${JSON.stringify(data)} not found`);
    }
    return email;
  },
  async update(email: EmailLogInterface['_id'], data: UpdateEmailLogInterface) {
    return EmailLogRepository.update(email, data);
  },
  async addEvents(email: EmailLogInterface['_id'], event: string) {
    return EmailLogRepository.addEvents(email, event);
  },
  async linksClicked(email: EmailLogInterface['_id'], link: string) {
    return EmailLogRepository.linksClicked(email, link);
  },
  async sendFailedEmails() {
    const emails = await EmailLogRepository.getEmails('Failed');
    emails.map((data: EmailLogInterface) => {
      return EmailLogHelper.sendPendingOrFailedEmmails(data);
    });
  },
  async sendPendingEmails() {
    const emails = await EmailLogRepository.getEmails('Pending');
    emails.map((data: EmailLogInterface) => {
      return EmailLogHelper.sendPendingOrFailedEmmails(data);
    });
  },
};
export default EmailLogService;
