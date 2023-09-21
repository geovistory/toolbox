import {Client, expect} from '@loopback/testlab';
import {GeovistoryApplication} from '../../../application';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {cleanDb} from '../../helpers/meta/clean-db.helper';

describe('PingController', () => {
  let server: GeovistoryApplication;
  let client: Client;

  before(async () => {({server, client} = await setupApplication());});
  after(async () => {await server.stop();});

  describe('GET /ping', () => {
    beforeEach(async () => cleanDb());

    it('should answer to normal ping', async () => {
      const res = await client.get('/ping?msg=world').expect(200);
      expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
    });
  });

});
