import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  port: number | string;
  database: string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  port: process.env.PORT || 4000,
  database: process.env.DB_URI || '',
};
