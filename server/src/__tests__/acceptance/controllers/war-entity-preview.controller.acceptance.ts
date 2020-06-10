// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import io from 'socket.io-client';
import {GeovistoryServer} from '../../../server';
import {setupApplication} from '../_test-helper';

const pEvent = require('p-event');

describe('Websockets', () => {
  let server: GeovistoryServer;
  before('setupApplication', async () => {
    ({server} = await setupApplication());
  });
  after(async () => {
    await server.stop();
  });
  describe('websocket server', () => {

    it('addToStream returns EntityPreview with pk_entity', async () => {
      const url = server.url;
      const socketClient = io(`${url}/WarEntityPreview`);
      // add to stream
      socketClient.emit('addToStream', {pkProject: 591, pks: [123456]});

      // wait for response of server being received by client
      const reply = await pEvent(socketClient, 'entityPreview');

      socketClient.close();

      // check if the entity preview has pk_entity
      expect(reply).to.have.key('pk_entity');


    });

    it('addToStream returns EntityPreview with fk_class', async () => {
      const url = server.url;
      const socketClient = io(`${url}/WarEntityPreview`);
      // add to stream
      socketClient.emit('addToStream', {pkProject: 591, pks: [123456]});

      // wait for response of server being received by client
      const reply = await pEvent(socketClient, 'entityPreview');

      socketClient.close();

      // check if the entity preview has fk_class
      expect(reply).to.have.key('fk_class');

    });
  })


});
