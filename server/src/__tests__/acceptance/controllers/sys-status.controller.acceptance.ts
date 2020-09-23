import {expect} from '@loopback/testlab';
import pEvent from 'p-event';
import io from 'socket.io-client';
import {GeovistoryServer} from '../../../server';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {pgNotify} from '../../helpers/warehouse-helpers';

describe('SysStatusController', () => {
  let server: GeovistoryServer;

  before('setupApplication', async () => {
    ({server} = await setupApplication());
  });

  after(async () => {
    await server.stop();
  });
  describe('WS/SysStatus warehouseInitializing', () => {

    it('should be true', async () => {
      await pgNotify('warehouse_initializing', 'true')
      const socketClient = io(`${server.url}/SysStatus`);
      const reply = await pEvent(socketClient, 'warehouseInitializing');
      expect(reply).to.equal(true)
    });
    it('should be false | true | false', async () => {
      const socketClient = io(`${server.url}/SysStatus`);
      let reply = await pEvent(socketClient, 'warehouseInitializing');
      await pgNotify('warehouse_initializing', 'false')
      reply = await pEvent(socketClient, 'warehouseInitializing');
      expect(reply).to.equal(false)

      await pgNotify('warehouse_initializing', 'true')
      reply = await pEvent(socketClient, 'warehouseInitializing');
      expect(reply).to.equal(true)

      await pgNotify('warehouse_initializing', 'false')
      reply = await pEvent(socketClient, 'warehouseInitializing');
      expect(reply).to.equal(false)
    });
  })


});
