// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import io from 'socket.io-client';
import {WarEntityPreview} from '../../../models';
import {GeovistoryServer} from '../../../server';
import {createWarEntityPreview} from '../../helpers/atomic/war-entity_preview.helper';
import {cleanDb} from '../../helpers/cleaning/clean-db.helper';
import {setupApplication} from '../_test-helper';

const pEvent = require('p-event');

describe('WarEntityPreviewController', () => {
  let server: GeovistoryServer;
  before('setupApplication', async () => {
    ({server} = await setupApplication());
  });
  after(async () => {
    await server.stop();
  });
  describe('websockets', () => {

    describe('addToStream', () => {
      let entityPreview: WarEntityPreview;
      beforeEach(async () => {
        await cleanDb();
        entityPreview = await createWarEntityPreview(new WarEntityPreview({
          pk_entity: 4,
          fk_project: 8,
          entity_label: 'foo',
        }));

      })

      it('should return EntityPreview from database with pk_entity', async () => {
        const url = server.url;
        const socketClient = io(`${url}/WarEntityPreview`);
        // add to stream
        socketClient.emit('addToStream', {pkProject: entityPreview.fk_project, pks: [entityPreview.pk_entity]});

        // wait for response of server being received by client
        const reply = await pEvent(socketClient, 'entityPreview');

        socketClient.close();

        // check if the entity preview has pk_entity
        expect(reply).to.have.key('pk_entity');

      });

      it('should return EntityPreview from database with fk_class', async () => {
        const url = server.url;
        const socketClient = io(`${url}/WarEntityPreview`);
        // add to stream
        socketClient.emit('addToStream', {pkProject: entityPreview.fk_project, pks: [entityPreview.pk_entity]});

        // wait for response of server being received by client
        const reply = await pEvent(socketClient, 'entityPreview');

        socketClient.close();

        // check if the entity preview has fk_class
        expect(reply).to.have.key('fk_class');

      });
    })

  })


});
