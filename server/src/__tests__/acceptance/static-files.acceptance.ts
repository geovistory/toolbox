import {Client} from '@loopback/testlab';
import {GeovistoryServer} from '../../server';
import {setupApplication} from './_test-helper';

describe('Static Files', () => {
  let server: GeovistoryServer;
  let client: Client;

  before('setupApplication', async () => {
    ({server, client} = await setupApplication());
  });

  after(async () => {
    await server.stop();
  });

  it('exposes angular index.html', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
    // .expect(/<title>Geovistory/);
  });

  it('exposes api explorer', async () => {
    await client
      .get('/explorer/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/);
  });
});
