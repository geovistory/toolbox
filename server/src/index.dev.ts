import {ApplicationConfig} from '@loopback/core';
import {GeovistoryServer} from './server';
import {cleanAndStartDev} from './warehouse';
import {cleanDb} from './__tests__/helpers/cleaning/clean-db.helper';
import {forFeatureX} from './__tests__/helpers/graphs/feature-X.helper';

/**
 * This function starts the geovistory application and fills the database
 * with mock data
 * @param options
 */
export async function serveWithMockData(options: ApplicationConfig = {}) {
  console.log(`Cleaning test database...`);
  await cleanDb();

  console.log(`Seeding test database with mock data...`);
  await forFeatureX();
  console.log(`Test database is ready!\n`);

  console.log(`Cleaning and starting the Warehouse...`);
  await cleanAndStartDev()

  console.log(`Starting server using database: ${process.env.DATABASE_URL}`)
  console.log(`Starting server at ${options.rest.host}:${options.rest.port} ...`);
  const server = new GeovistoryServer(options);
  await server.boot();
  await server.start();


  console.log(`Server is up and running!`);

}
