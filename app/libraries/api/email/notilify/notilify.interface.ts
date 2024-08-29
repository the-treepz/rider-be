import { UnknownInterface } from '../../../../lib/unknown.interface';

export interface NotilifyResponseInterface {
  status: number;
  data: { data: UnknownInterface };
  response?: UnknownInterface;
}

export interface NotilifyGenerateOtpInterface {
  channel: string;
  type: string; // Values are alphanumeric,Letter or Number
  expiryTime?: string; // Default is 20 minutes
  length?: string; // Default Value is 6
}

export type NotilifyPostRequestInterface =
  | NotilifyGenerateOtpInterface
  | { otp: string };
