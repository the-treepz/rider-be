import { UnknownInterface } from '../../../../lib/unknown.interface';

export interface PlunkSendEmailInterface {
  to: string;
  subject: string;
  body: string;
}
export interface PlunkResponseInterface {
  status: number;
  data: { messages: UnknownInterface };
  response?: UnknownInterface;
}
