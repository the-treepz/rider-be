import { UnknownInterface } from '../../../../lib/unknown.interface';

export interface BrevoResponseInterface {
  status: number;
  data: { messages: UnknownInterface };
  response?: UnknownInterface;
}

export interface BrevoSendEmailInterface {
  htmlContent: string;
  sender: { email: string; name: string };
  subject: string;
  to: [{ email: string }];
}
