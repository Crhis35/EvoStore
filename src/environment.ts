import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  port: number | string;
  database: string;
  jwtCookieExpires: number;
  jwtSecret: string;
  jwtExpires: string;
  env: string;
  emailHost: string;
  emailFrom: string;
  emailPort: number;
  emailUser: string;
  emailPass: string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true' || true,
    playground: process.env.APOLLO_PLAYGROUND === 'true' || true,
  },
  port: process.env.PORT || 4000,
  database: process.env.DB_URI || '',
  jwtCookieExpires: parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '1'),
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'perrointensovolumne2',
  jwtExpires: process.env.JWT_EXPIRES_IN || '1d',
  emailHost: process.env.EMAIL_HOST || '',
  emailFrom: process.env.EMAIL_FROM || '',
  emailPort: parseInt(process.env.EMAIL_PORT || '0'),
  emailUser: process.env.EMAIL_USERNAME || '',
  emailPass: process.env.EMAIL_PASSWORD || '',
};
