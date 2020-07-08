import {Client} from '@loopback/testlab';
import {GeovistoryServer} from '../../server';
import {setupApplication} from './_test-helper';

describe('Static Files', () => {
  let app: GeovistoryServer;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
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
