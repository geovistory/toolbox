/* eslint-disable @typescript-eslint/no-floating-promises */
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import io, {Socket} from 'socket.io-client';
import {GeovistoryApplication} from '../../../application';
import {WarEntityPreviewWithFulltext} from "../../../models/war-entity-preview-with-full-text.model";
import {createWarEntityPreview, updateWarEntityPreview} from '../../helpers/atomic/war-entity-preview.helper';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {cleanDb} from '../../helpers/meta/clean-db.helper';

const pEvent = require('p-event');

describe('WarEntityPreviewController', () => {
  let server: GeovistoryApplication;
  before('setupApplication', async () => {
    ({server} = await setupApplication());
  });
  after(async () => {
    await server.stop();
  });
  describe('websockets', () => {

    describe('addToStream', () => {
      let entityPreview: WarEntityPreviewWithFulltext;
      beforeEach(async () => {
        await cleanDb();
        entityPreview = await createWarEntityPreview(new WarEntityPreviewWithFulltext({
          pk_entity: 4,
          fk_project: 8,
          fk_class: 21,
          entity_label: 'foo',
        }));

      })

      it('should return EntityPreview from database with pk_entity', async () => {
        const url = server.url;
        const socketClient = io(`${url}/WarEntityPreview`);
        // add to stream
        const key = entityPreview.fk_project + '_' + entityPreview.pk_entity;
        socketClient.emit('addToStream', {pkProject: entityPreview.fk_project, pks: [key]});

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
        const key = entityPreview.fk_project + '_' + entityPreview.pk_entity;
        socketClient.emit('addToStream', {pkProject: entityPreview.fk_project, pks: [key]});

        // wait for response of server being received by client
        const reply = await pEvent(socketClient, 'entityPreview');

        socketClient.close();

        // check if the entity preview has fk_class
        expect(reply).to.have.key('fk_class');

      });

      // it('should return project version, then repo version', async () => {
      //   const url = server.url;
      //   const socketClient = io(`${url}/WarEntityPreview`);
      //   // add to stream
      //   const key = entityPreview.fk_project + '_' + entityPreview.pk_entity;
      //   socketClient.emit('addToStream', {pkProject: entityPreview.fk_project, pks: [entityPreview.pk_entity]});

      //   // wait for response of server being received by client
      //   const reply = await pEvent(socketClient, 'entityPreview');

      //   socketClient.close();

      //   // check if the entity preview has fk_class
      //   expect(reply).to.have.key('fk_class');

      // });
    })

    describe('test the stream', () => {
      let url
      let socketClient: Socket
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
        const repoKey = 0 + '_' + pkEntity1
        const projectKey = pkProject + '_' + pkEntity1
        // add to stream
        socketClient.emit('addToStream', {pkProject, pks: [repoKey, projectKey]});

        // add repo variant
        createWarEntityPreview(new WarEntityPreviewWithFulltext({
          pk_entity: pkEntity1,
          fk_project: 0,
          entity_label: 'foo repo',
          fk_class: 21,
        }))
        // add project variant
        createWarEntityPreview(new WarEntityPreviewWithFulltext({
          pk_entity: pkEntity1,
          fk_project: pkProject,
          entity_label: 'foo',
          fk_class: 21,
        }))

        // check the entity preview
        const emit1 = await pEvent(socketClient, 'entityPreview');
        const emit2 = await pEvent(socketClient, 'entityPreview');
        expect([emit1, emit2].find(e => e.entity_label === 'foo')).not.to.be.undefined();
        expect([emit1, emit2].find(e => e.entity_label === 'foo repo')).not.to.be.undefined();

        let reply;

        // update repo variant
        updateWarEntityPreview({pk_entity: pkEntity1, fk_project: 0},
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
        expect(reply.entity_label).to.equal('foo repo 2');
        // check the entity preview
        reply = await pEvent(socketClient, 'entityPreview');
        expect(reply.entity_label).to.equal('foo project 2');
      });


    })

  })


});
