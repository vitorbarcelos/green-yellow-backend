export type AppConfig = {
  readonly host: string;
  readonly port: number;
  readonly auth: AuthConfig;
  readonly hostname: string;
  readonly environment: string;
  readonly crypto: CryptoConfig;
  readonly database: DatabaseConfig;
};

export type DatabaseConfig = {
  readonly host: string;
  readonly name: string;
  readonly port: number;
  readonly password: string;
  readonly username: string;
  readonly dialect: 'mysql' | 'mariadb';
};

export type AuthConfig = {
  jwt: {
    issuer: string;
    secret: string;
    audience: string;
  };
};

export type CryptoConfig = {
  bcrypt: {
    rounds: string;
  };
};
