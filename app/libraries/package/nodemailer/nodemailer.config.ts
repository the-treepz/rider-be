import nodemailer from 'nodemailer';
import {
  TREEPZ_MAIL_TRAP_PASSWORD,
  TREEPZ_MAIL_TRAP_USERNAME,
} from '../../../config/secrets';

export const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: TREEPZ_MAIL_TRAP_USERNAME,
    pass: TREEPZ_MAIL_TRAP_PASSWORD,
  },
  // secure: false,
});
