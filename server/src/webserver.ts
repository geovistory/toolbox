/**
 * This section is starting the express server as described here
 * https://github.com/strongloop/loopback-next/tree/master/examples/lb3-application#tutorial
 */
import {GeovistoryServer} from './server';
import {getGvDatabaseUrl} from './utils/databaseUrl';


const PORT = +(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? '0.0.0.0'

console.log(`Starting server at: ${HOST}:${PORT}`);
// Run the application
const config = {
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

    // Added for mounting Lb3 in Lb4 setup
    // https://github.com/strongloop/loopback-next/tree/master/examples/lb3-application#tutorial
    listenOnStart: false,
  },
  websocket: {
    port: PORT,
  },
};

export async function main() {
  console.log(`Starting server using database: ${getGvDatabaseUrl()?.split('@')?.[1]}`)

  const server = new GeovistoryServer(config);
  await server.boot();
  await server.start();

  console.log(`Server is running at ${server.url}`);
}

if (require.main === module) {
  main().catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}


/**
 * The commented section is the default Lb4 Setup
 */
// import {GeovistoryApplication} from './application';
// import {ApplicationConfig} from '@loopback/core';

// export {GeovistoryApplication};

// export async function main(options: ApplicationConfig = {}) {
//   const app = new GeovistoryApplication(options);
//   await app.boot();
//   await app.start();

//   const url = app.restServer.url;
//   console.log(`Server is running at ${url}`);
//   console.log(`Try ${url}/ping`);

//   return app;
// }
