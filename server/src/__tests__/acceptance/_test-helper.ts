import {Client, createRestAppClient, givenHttpServerConfig} from '@loopback/testlab';
import {GeovistoryApplication} from '../../application';
import {GeovistoryServer} from '../../server';

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

  const client = createRestAppClient(server.lbApp);

  return {server, app: server.lbApp, client};
}

export interface AppWithClient {
  server: GeovistoryServer,
  app: GeovistoryApplication;
  client: Client;
}
