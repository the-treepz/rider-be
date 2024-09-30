import { UnknownInterface } from '../../../lib/unknown.interface';

export interface BrevoResponseInterface {
  status: number;
  data: { messages: UnknownInterface };
  response?: UnknownInterface;
}

export interface SendgridSendEmailInterface {
  to: string; // Change to your recipient
  from: string; // Change to your verified sender
  subject: string;
  // text: 'and easy to do anywhere, even with Node.js',
  html: string;
}
