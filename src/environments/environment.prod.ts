import { getEnv } from '@packages/common';

export const environment = {
  env: getEnv('NODE_ENV', 'production'),
  appName: getEnv('TF_APP_NAME', 'api'),
  logLevel: getEnv('LOG_LEVEL', 'info'),
  prettyLog: getEnv('PRETTY_LOGS', false),

  // server
  globalPrefix: <string>getEnv('GLOBAL_PATH_PREFIX', 'api'),
  swaggerPath: getEnv('SWAGGER_PATH', '/swagger-api'),
  port: +getEnv('HTTP_PORT', '5000'),

  // connections
  postgresUrl: getEnv('POSTGRES_URL'),
  postgresSsl: getEnv('POSTGRES_SSL', true),
};
