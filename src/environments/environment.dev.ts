import { getEnv } from '@packages/common';
import { environment as prodEnvironment } from './environment.prod';

export const environment = {
  ...prodEnvironment,
  env: getEnv('NODE_ENV', 'development'),
  logLevel: getEnv('LOG_LEVEL', 'debug'),
  prettyLog: getEnv('PRETTY_LOGS', true),

  // server
  port: +getEnv('HTTP_PORT', '5000'),

  // connections
  postgresUrl: getEnv(
    'POSTGRES_URL',
    'postgresql://postgres:postgres@localhost:5432/example',
  ),
  postgresSsl: getEnv('POSTGRES_SSL', false),
};
