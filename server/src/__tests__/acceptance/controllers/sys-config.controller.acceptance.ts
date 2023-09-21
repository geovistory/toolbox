import {Client, expect} from '@loopback/testlab';
import {GeovistoryApplication} from '../../../application';
import {SysConfigValue} from "../../../models/sys-config/sys-config-value.model";
import {SysConfigValueMock} from '../../helpers/data/gvDB/SysConfigValueMock';
import {setupApplication, validateAgainstSchema} from '../../helpers/gv-server-helpers';

describe('SysConfigController', () => {
  let server: GeovistoryApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({server, client} = await setupApplication());
  });

  after(async () => {
    await server.stop();
  });
  describe('GET /get-system-config', () => {
    it('should return 200', async () => {
      const res = await client.get('/get-system-config').expect(200);
      expect(res.body).to.have.ownProperty('classes')
    });
  })

  describe('POST /set-system-config', () => {
    it('should reject POST /set-system-config as "Unauthorized"', async () => {
      await client.post('/set-system-config').expect(401);
    });

    // TODO: add test for POST /set-system-config with not-sys-admin user

    // TODO: add test for POST /set-system-config with sys-admin user
  })

  describe('POST /validate-system-config', () => {

    it('should reject empty body as "Bad Request"', async () => {
      await client.post('/validate-system-config').expect(400);
    });

    it('should reject invalid body as 422 "Unprocessable Entity"', async () => {
      await client
        .post('/validate-system-config')
        .send({foo: 'bar'})
        .expect(422);
    });
    it('should validate the config schema (no api involved)', async () => {
      await validateAgainstSchema(SysConfigValueMock.SYS_CONFIC_VALID, SysConfigValue, server)
    })
    it('should return 200', async () => {
      await client
        .post('/validate-system-config')
        .send(SysConfigValueMock.SYS_CONFIC_VALID)
        .expect(200);
    });

  })
});


