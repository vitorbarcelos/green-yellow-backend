import process from 'node:process';

export const configs = {
  host: process.env['HOST'] || 'http://localhost:3333',
  port: Number(process.env['PORT']) || 3333,
  hostname: process.env['HOST_NAME'] || 'http://localhost',
  environment: process.env['NODE_ENV'] || 'development',
  employerName: process.env['EMPLOYER_NAME'] || 'GreenYellow',
  database: {
    name: process.env['DATABASE_NAME'] || 'greenyellow',
    dialect: process.env['DATABASE_DIALECT'] || 'postgres',
    port: Number(process.env['DATABASE_PORT']) || 5432,
    password: process.env['DATABASE_PASSWORD'] || 'user-pwd',
    username: process.env['DATABASE_USERNAME'] || 'user',
    host: process.env['DATABASE_HOST'] || 'localhost',
  },
  auth: {
    jwt: {
      issuer: process.env['AUTH_JWT_ISSUER'] || 'http://localhost:3333',
      secret: process.env['AUTH_JWT_SECRET'] || 'UvqQY6GJbnEmmBzQkF6hl',
      audience: process.env['AUTH_JWT_AUDIENCE'] || 'http://localhost:3333',
    },
  },
  crypto: {
    bcrypt: {
      rounds: Number(process.env['CRYPTO_BCRYPT_ROUNDS']) || 14,
    },
  },
};
