/* eslint-disable @typescript-eslint/no-floating-promises */
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import io from 'socket.io-client';
import {IO_FIELD_CHANGE} from '../../../../controllers/project-data/field-change.controller';
import {WarFieldChangeAddToStream} from '../../../../models/war-field-change-id.model';
import {WarFieldChange} from '../../../../models/war-field-change.model';
import {GeovistoryServer} from '../../../../server';
import {createWarFieldChange} from '../../../helpers/atomic/war-field-change.helper';
import {WarFieldChangeMock} from '../../../helpers/data/gvDB/WarFieldChangeMock';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';

const pEvent = require('p-event');

describe('WarFieldChangeController', () => {
  let server: GeovistoryServer;
  let socket: SocketIOClient.Socket

  before('setupApplication', async () => {
    ({server} = await setupApplication());
  });
  beforeEach(async () => {
    await cleanDb();
    socket = io(`${server.url}/${IO_FIELD_CHANGE}`);
  })

  afterEach(async () => {
    socket.close();
  })
  after(async () => {
    await server.stop();
  });

  it('connects to controller and forwards message', async () => {
    socket.emit(`${IO_FIELD_CHANGE}::general-message-forward`, 'Hello');
    const msg = await pEvent(socket, 'general-message-forward');
    expect(msg).to.match('Hello');
  });
  it('addToStream returns the existing WarFieldChange immediately', async () => {
    await createWarFieldChange(WarFieldChangeMock.FIELD_1)

    const fieldsToAdd: WarFieldChangeAddToStream = {
      pkProject: 1,
      fieldIds: [
        WarFieldChangeMock.toFieldId(WarFieldChangeMock.FIELD_1)
      ]
    }
    socket.emit(`${IO_FIELD_CHANGE}::addToStream`, fieldsToAdd);
    const msg: WarFieldChange = await pEvent(socket, 'fieldChange');
    const date = new Date(msg.tmsp_last_modification)
    expect(date.getFullYear()).to.equal(2000);
    expect(date.getMonth()).to.equal(0);
  });

  it('extendStream returns the existing WarFieldChange on change', async () => {

    const fieldsToAdd: WarFieldChangeAddToStream = {
      pkProject: 1,
      fieldIds: [
        WarFieldChangeMock.toFieldId(WarFieldChangeMock.FIELD_1)
      ]
    }
    socket.emit(`${IO_FIELD_CHANGE}::extendStream`, fieldsToAdd);
    setTimeout(() => {
      createWarFieldChange(WarFieldChangeMock.FIELD_1)
    }, 300)
    const msg: WarFieldChange = await pEvent(socket, 'fieldChange');
    const date = new Date(msg.tmsp_last_modification)
    expect(date.getFullYear()).to.equal(2000);
    expect(date.getMonth()).to.equal(0);
  });


});
