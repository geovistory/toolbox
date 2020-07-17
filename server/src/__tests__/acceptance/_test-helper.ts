import {Client, createRestAppClient, givenHttpServerConfig} from '@loopback/testlab';
import {GeovistoryServer} from '../../server';
import {TestdbDataSource} from '../../datasources/testdb.datasource';
import {Client as pgClient} from 'pg';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const server = new GeovistoryServer({
    rest: restConfig,
  });

  await server.boot();
  await server.start();

  const client = createRestAppClient(server);

  return {server, client};
}

export interface AppWithClient {
  server: GeovistoryServer;
  client: Client;
}
