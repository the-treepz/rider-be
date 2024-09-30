module.exports = {
  ci: {
    database: process.env.TREEPZ_DATABASE_CI_URL,
    paystackSecretKey: process.env.TREEPZ_PAYSTACK_DEV_SECRET_KEY,
    appUrl: 'http://localhost:9032/v1/',
  },
  development: {
    database: process.env.TREEPZ_DATABASE_DEV_URL,
    paystackSecretKey: process.env.TREEPZ_PAYSTACK_DEV_SECRET_KEY,
    appUrl: 'http://localhost:9032/v1/',
  },
  production: {
    database: process.env.TREEPZ_DATABASE_URL,
    paystackSecretKey: process.env.TREEPZ_PAYSTACK_SECRET_KEY,
    appUrl: process.env.TREEPZ_APP_URL,
  },
  staging: {
    database: process.env.TREEPZ_DATABASE_STAGING_URL,
    paystackSecretKey: process.env.TREEPZ_PAYSTACK_DEV_SECRET_KEY,
    appUrl: process.env.TREEPZ_APP_STAGING_URL,
  },
  test: {
    database: process.env.TREEPZ_DATABASE_TEST_URL,
    paystackSecretKey: process.env.TREEPZ_PAYSTACK_DEV_SECRET_KEY,
    appUrl: 'http://localhost:9032/v1/',
  },
};
