/**
 * The uncommented section is the default Lb4 Setup
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

/**
 * This section is starting the express server as described here
 * https://github.com/strongloop/loopback-next/tree/master/examples/lb3-application#tutorial
 */
import {ApplicationConfig} from '@loopback/core';
import {ExpressServer} from './server';

export {ExpressServer};

export async function main(options: ApplicationConfig = {}) {
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
  console.log(`Server is running at ${server.url}`);
}
