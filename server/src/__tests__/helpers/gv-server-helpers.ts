import {Client, createRestAppClient, givenHttpServerConfig} from '@loopback/testlab';
import {GeovistoryServer} from '../../server';
import {testdb} from './testdb';

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



export function pgNotify(channel: string, value: string) {
  return testdb.execute(`SELECT pg_notify($1, $2)`, [channel, value])
}
