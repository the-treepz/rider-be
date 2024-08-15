import {
  CreateEmailInterface,
  EmailLogInterface,
  FindEmailInterface,
  UpdateEmailLogInterface,
} from '../interface/email.interface';
import EmailModel from './email-log.model';

class EmailLogRepository {
  public static async addEvents(
    email: EmailLogInterface['_id'],
    event: string,
  ) {
    return EmailModel.findByIdAndUpdate(
      email,
      { $push: { events: { $each: [event] } } },
      { new: true }, // Return the updated document
    );
  }

  public static async linksClicked(
    email: EmailLogInterface['_id'],
    link: string,
  ) {
    return EmailModel.findByIdAndUpdate(
      email,
      { $push: { linksClicked: { $each: [link] } } },
      { new: true }, // Return the updated document
    );
  }

  public static async create(data: CreateEmailInterface) {
    try {
      return EmailModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async find(data: FindEmailInterface) {
    try {
      return EmailModel.findOne(data);
    } catch (e) {
      return e;
    }
  }

  public static async update(
    email: EmailLogInterface['_id'],
    data: UpdateEmailLogInterface,
  ) {
    try {
      return EmailModel.findByIdAndUpdate(email, data, { new: true });
    } catch (e) {
      return e;
    }
  }

  public static async getEmails(status: string) {
    try {
      return EmailModel.find({ status });
    } catch (e) {
      return e;
    }
  }
}

export default EmailLogRepository;
