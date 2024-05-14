import { bootstrap } from '@packages/common';
import { AppModule } from './app.module';
import { environment } from './environments';
import { TypeormModule } from '@packages/typeorm';
import typeormconfig from './db/typeormconfig';

bootstrap([TypeormModule.forRoot(typeormconfig), AppModule], {
  environment: environment.env,
  appName: environment.appName,
  appVersion: environment.appVersion,
  logger: {
    prettyPrint: environment.prettyLog,
    level: environment.logLevel,
    sentryDsn: environment.sentryDsn,
  },
  httpServer: {
    globalPrefix: environment.globalPrefix,
    // globalPrefixIgnore: [`/internal/(.*)`],
    swaggerPath: environment.swaggerPath,
    apiDefaultVersion: '1',
    port: environment.port,
  },
});
