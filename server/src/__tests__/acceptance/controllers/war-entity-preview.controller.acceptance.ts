/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/camelcase */
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import io from 'socket.io-client';
import {WarEntityPreview} from '../../../models';
import {GeovistoryServer} from '../../../server';
import {createWarEntityPreview, deleteWarEntityPreview, updateWarEntityPreview} from '../../helpers/atomic/war-entity-preview.helper';
import {cleanDb} from '../../helpers/meta/clean-db.helper';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {wait} from '../../helpers/warehouse-helpers';

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

      it('should return project version, then repo version', async () => {
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

    describe('test the stream', () => {
      let url
      let socketClient: SocketIOClient.Socket
      const pkProject = 591;
      const pkEntity1 = 100
      beforeEach(async () => {
        await cleanDb();
        url = server.url;
        socketClient = io(`${url}/WarEntityPreview`);
      })

      afterEach(async () => {
        socketClient.close();
      })
      it('should return versions project and keep project after repo update', async () => {
        // add to stream
        socketClient.emit('addToStream', {pkProject, pks: [pkEntity1]});
        await wait(10)

        // add repo variant
        await createWarEntityPreview(new WarEntityPreview({
          pk_entity: pkEntity1,
          fk_project: undefined,
          entity_label: 'foo repo',
        }))
        // add project variant
        await createWarEntityPreview(new WarEntityPreview({
          pk_entity: pkEntity1,
          fk_project: pkProject,
          entity_label: 'foo',
        }))

        // check the entity preview
        let reply = await pEvent(socketClient, 'entityPreview');
        expect(reply.entity_label).to.equal('foo');

        // update repo variant
        updateWarEntityPreview({pk_entity: pkEntity1, fk_project: null},
          {entity_label: 'foo repo 2'}
        ).then(_ => {
          setTimeout(() => {
            // update prioject variant
            updateWarEntityPreview({pk_entity: pkEntity1, fk_project: pkProject},
              {entity_label: 'foo project 2'}
            )
          }, 10)
        })
        // check the entity preview
        reply = await pEvent(socketClient, 'entityPreview');
        expect(reply.entity_label).to.equal('foo');
        // check the entity preview
        reply = await pEvent(socketClient, 'entityPreview');
        expect(reply.entity_label).to.equal('foo project 2');
      });
      it('should return versions of repo -> project -> repo', async () => {
        // add to stream
        socketClient.emit('addToStream', {pkProject, pks: [pkEntity1]});
        await wait(10)

        // add repo variant
        await createWarEntityPreview(new WarEntityPreview({
          pk_entity: pkEntity1,
          fk_project: undefined,
          entity_label: 'foo repo',
        }))

        // check the entity preview
        let reply = await pEvent(socketClient, 'entityPreview');
        expect(reply.entity_label).to.equal('foo repo');

        // add project variant
        await createWarEntityPreview(new WarEntityPreview({
          pk_entity: pkEntity1,
          fk_project: pkProject,
          entity_label: 'foo',
        }))

        // check the entity preview
        reply = await pEvent(socketClient, 'entityPreview');
        expect(reply.entity_label).to.equal('foo');

        // remove project variant
        await deleteWarEntityPreview({pk_entity: pkEntity1, fk_project: pkProject})

        // check the entity preview
        reply = await pEvent(socketClient, 'entityPreview');
        expect(reply.entity_label).to.equal('foo repo');

      });

    })

  })


});
