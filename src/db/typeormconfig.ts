import { DataSource } from '@packages/typeorm';
import { environment } from '../environments';

export default new DataSource({
  type: 'postgres',
  url: environment.postgresUrl,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  synchronize: false,
  dropSchema: false,
  // run migrations everywhere, except test
  migrationsRun: environment.env !== 'test',
  migrationsTransactionMode: 'each',
  ssl: environment.postgresSsl,
});
