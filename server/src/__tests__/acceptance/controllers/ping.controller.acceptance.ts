import { Client, expect } from '@loopback/testlab';
import { GeovistoryServer } from '../../../server';
import { setupApplication } from '../_test-helper';

describe('PingController', () => {
  let server: GeovistoryServer;
  let client: Client;

  before('setupApplication', async () => {
    ({ server, client } = await setupApplication());
  });

  after(async () => {
    await server.stop();
  });

  it('invokes GET /ping', async () => {
    const res = await client.get('/ping?msg=world').expect(200);
    expect(res.body).to.containEql({ greeting: 'Hello from LoopBack' });

  });
});
