import {ApplicationConfig} from '@loopback/core';
import {GeovistoryApplication} from './application';
import {getGvDatabaseUrl} from './utils/databaseUrl';


const PORT = +(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? '0.0.0.0'

const config: ApplicationConfig = {
  rest: {
    port: PORT,
    host: HOST,
    // The `gracePeriodForClose` provides a graceful close for http/https
    // servers with keep-alive clients. The default value is `Infinity`
    // (don't force-close). If you want to immediately destroy all sockets
    // upon stop, set its value to `0`.
    // See https://www.npmjs.com/package/stoppable
    gracePeriodForClose: 5000, // 5 seconds
    openApiSpec: {
      // useful when used with OpenAPI-to-GraphQL to locate your application
      setServersFromRequest: true,
    },
  },
  websocket: {
    port: PORT,
  },
};


export const main = async () => {
  console.log(`Starting server using database: ${getGvDatabaseUrl()?.split('@')?.[1]}`)
  const app = new GeovistoryApplication(config);
  await app.boot();
  await app.start();
  return app;
}


if (require.main === module) {
  main().catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

