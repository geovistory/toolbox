import {Client, expect} from '@loopback/testlab';
import {GeovistoryServer} from '../../../server';
import {setupApplication} from '../_test-helper';

describe('SysConfigController', () => {
  let app: GeovistoryServer;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
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

    it('should return 200', async () => {
      await client
        .post('/validate-system-config')
        .send({
          "classes": {
            "40": {
              "mapsToListType": {
                "appellation": "true"
              }
            },
            "51": {
              "mapsToListType": {
                "place": "true"
              }
            },
            "52": {
              "mapsToListType": {
                "dimension": {
                  "measurementUnitClass": 56
                }
              }
            },
            "54": {
              "mapsToListType": {
                "language": "true"
              }
            },
            "335": {
              "mapsToListType": {
                "timePrimitive": "true"
              }
            },
            "657": {
              "mapsToListType": {
                "langString": "true"
              }
            }
          }
        })
        .expect(200);
    });

  })
});
