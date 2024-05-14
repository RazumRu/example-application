import * as dotenv from 'dotenv';

dotenv.config();

import * as envDev from './environment.dev';
import * as envProd from './environment.prod';

const ENV_MAP: any = {
  test: envDev,
  development: envDev,
  production: envProd,
};
const NODE_ENV = String(process.env.NODE_ENV || 'production');

export const environment = ENV_MAP[NODE_ENV].environment;
