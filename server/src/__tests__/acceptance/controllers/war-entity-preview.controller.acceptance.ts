// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import io from 'socket.io-client';
import {GeovistoryServer} from '../../../server';
import {setupApplication} from '../_test-helper';

const pEvent = require('p-event');

describe('WarEntityPreviewController', () => {
  let app: GeovistoryServer;
  before('setupApplication', async () => {
    ({app} = await setupApplication());
  });
  after(async () => {
    await app.stop();
  });
  describe('websocket server', () => {

    it('addToStream returns EntityPreview from database with pk_entity', async () => {
      const url = app.url;
      const socketClient = io(`${url}/WarEntityPreview`);
      // add to stream
      socketClient.emit('addToStream', {pkProject: 591, pks: [25774]});

      // wait for response of server being received by client
      const reply = await pEvent(socketClient, 'entityPreview');

      socketClient.close();

      // check if the entity preview has pk_entity
      expect(reply).to.have.key('pk_entity');

    });

    it('addToStream returns EntityPreview from database with fk_class', async () => {
      const url = app.url;
      const socketClient = io(`${url}/WarEntityPreview`);
      // add to stream
      socketClient.emit('addToStream', {pkProject: 591, pks: [25774]});

      // wait for response of server being received by client
      const reply = await pEvent(socketClient, 'entityPreview');

      socketClient.close();

      // check if the entity preview has fk_class
      expect(reply).to.have.key('fk_class');

    });
  })


});
