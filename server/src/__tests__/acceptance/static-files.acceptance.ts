import {Client} from '@loopback/testlab';
import {GeovistoryApplication} from '../../application';
import {setupApplication} from '../helpers/gv-server-helpers';
import {cleanDb} from '../helpers/meta/clean-db.helper';


describe('Static Files', () => {
  let server: GeovistoryApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({server, client} = await setupApplication());
  });

  after(async () => {
    await server.stop();
  });

  beforeEach(async () => cleanDb());

  it('exposes angular index.html', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
  });

  it('exposes api explorer', async () => {
    await client
      .get('/explorer/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/);
  });
});
