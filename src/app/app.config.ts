import process from 'node:process';

export const configs = {
  host: process.env['HOST'],
  port: Number(process.env['PORT']),
  hostname: process.env['HOST_NAME'],
  environment: process.env['NODE_ENV'],
  employerName: process.env['EMPLOYER_NAME'],
  database: {
    host: process.env['DATABASE_HOST'],
    name: process.env['DATABASE_NAME'],
    dialect: process.env['DATABASE_DIALECT'],
    port: Number(process.env['DATABASE_PORT']),
    password: process.env['DATABASE_PASSWORD'],
    username: process.env['DATABASE_USERNAME'],
  },
  auth: {
    jwt: {
      issuer: process.env['AUTH_JWT_ISSUER'],
      secret: process.env['AUTH_JWT_SECRET'],
      audience: process.env['AUTH_JWT_AUDIENCE'],
    },
  },
  crypto: {
    bcrypt: {
      rounds: process.env['CRYPTO_BCRYPT_ROUNDS'],
    },
  },
};
