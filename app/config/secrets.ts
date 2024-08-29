import dotenv from 'dotenv';
import fs from 'fs';
import logger from '../lib/logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}
function throwIfUndefined<T>(secret: T | undefined, name?: string): T {
  if (!secret) {
    logger.error(`${name} must not be undefined`);
    return process.exit(1);
  }
  return secret;
}
export const ENVIRONMENT = throwIfUndefined(process.env.NODE_ENV, 'NODE_ENV');

throwIfUndefined(
  process.env.TREEPZ_DATABASE_TEST_URL,
  'TREEPZ_DATABASE_TEST_URL',
);
throwIfUndefined(process.env.TREEPZ_DATABASE_URL, 'TREEPZ_DATABASE_URL');
throwIfUndefined(
  process.env.TREEPZ_DATABASE_DEV_URL,
  'TREEPZ_DATABASE_DEV_URL',
);
throwIfUndefined(
  process.env.TREEPZ_DATABASE_STAGING_URL,
  'TREEPZ_DATABASE_STAGING_URL',
);
throwIfUndefined(process.env.TREEPZ_DATABASE_CI_URL, 'TREEPZ_DATABASE_CI_URL');
export const TREEPZ_MAIL_TRAP_PASSWORD = throwIfUndefined(
  process.env.TREEPZ_MAIL_TRAP_PASSWORD,
  'TREEPZ_MAIL_TRAP_PASSWORD',
);
export const TREEPZ_MAIL_TRAP_USERNAME = throwIfUndefined(
  process.env.TREEPZ_MAIL_TRAP_USERNAME,
  'TREEPZ_MAIL_TRAP_USERNAME',
);

export const TREEPZ_BREVO_API_KEY = throwIfUndefined(
  process.env.TREEPZ_BREVO_API_KEY,
  'TREEPZ_BREVO_API_KEY',
);

export const TREEPZ_NOTILIFY_API_KEY = throwIfUndefined(
  process.env.TREEPZ_NOTILIFY_API_KEY,
  'TREEPZ_NOTILIFY_API_KEY',
);

export const TREEPZ_JWT_EXPIRY = throwIfUndefined(
  process.env.TREEPZ_JWT_EXPIRY,
  'TREEPZ_JWT_EXPIRY',
);

export const TREEPZ_JWT_SECRET = throwIfUndefined(
  process.env.TREEPZ_JWT_SECRET,
  'TREEPZ_JWT_SECRET',
);

throwIfUndefined(process.env.TREEPZ_APP_STAGING_URL, 'TREEPZ_APP_STAGING_URL');
throwIfUndefined(process.env.TREEPZ_APP_URL, 'TREEPZ_APP_URL');
export const TREEPZ_PLUNK_API_KEY = throwIfUndefined(
  process.env.TREEPZ_PLUNK_API_KEY,
  'TREEPZ_PLUNK_API_KEY',
);
