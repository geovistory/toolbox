import {ApplicationConfig} from '@loopback/core';
import {GeovistoryServer} from './server';
import {createHeavyFactoids} from './__tests__/helpers/graphs/heavy-factoids.helper';
import {cleanDb} from './__tests__/helpers/meta/clean-db.helper';
import {cleanAndStartDev} from './warehouse/startScripts';
import {getGvDatabaseUrl} from './utils/databaseUrl';

/**
 * This function starts the geovistory application and fills the database
 * with mock data
 * @param options
 */
export async function serveWithMockData(options: ApplicationConfig = {}) {
  process.stdout.write('Cleaning database ... ');
  await cleanDb();
  console.log('Done');

  console.log('Seeding test database with mock data:')
  // await forFeatureX();
  await createHeavyFactoids();
  console.log(`Test database is ready!\n`);

  console.log(`Cleaning and starting the Warehouse...`);
  await cleanAndStartDev()

  console.log(`Starting server using database: ${getGvDatabaseUrl()}`)
  console.log(`Starting server at ${options.rest.host}:${options.rest.port} ...`);
  const server = new GeovistoryServer(options);
  await server.boot();
  await server.start();


  console.log(`Server is up and running!`);

}
