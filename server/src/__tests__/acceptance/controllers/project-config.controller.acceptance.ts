/* eslint-disable @typescript-eslint/camelcase */
import { Client, expect } from '@loopback/testlab';
import { clone } from 'ramda';
import { LoginResponse } from '../../../controllers/account.controller';
import { GetEntityLabelConfigResponse } from '../../../controllers/project-config.controller';
import { ProEntityLabelConfig } from '../../../models';
import { GeovistoryServer } from '../../../server';
import { createProEntityLabelConfig } from '../../helpers/atomic/pro-entity-label-config.helper';
import { linkAccountToProject } from '../../helpers/atomic/pub-account_project_rel.helper';
import { DfhApiClassMock } from '../../helpers/data/gvDB/DfhApiClassMock';
import { ProEntityLabelConfigMock } from '../../helpers/data/gvDB/ProEntityLabelConfigMock';
import { ProProjectMock } from '../../helpers/data/gvDB/ProProjectMock';
import { createAccountVerified } from '../../helpers/generic/account.helper';
import { createProject1 } from '../../helpers/graphs/project.helper';
import { setupApplication } from '../../helpers/gv-server-helpers';
import { cleanDb } from '../../helpers/meta/clean-db.helper';
import { createModel } from '../../helpers/meta/model.helper';


describe('ProjectConfigController', () => {
  let server: GeovistoryServer;
  let client: Client;
  let accountInProject: number;
  const emailGaetan = 'gaetan.muck@kleiolab.ch';
  const emailJonas = 'jonas.schneider@kleiolab.ch';
  const pwd = 'testtest1';

  before(async () => { ({ server, client } = await setupApplication()); });
  after(async () => { await server.stop(); });

  beforeEach(async () => {
    await cleanDb();
    await createModel();
    await createProject1();

    accountInProject = await createAccountVerified(emailGaetan, pwd);
    await linkAccountToProject(accountInProject, ProProjectMock.PROJECT_1.pk_entity as number);
    await createAccountVerified(emailJonas, pwd);
  });

  describe('GET /entity-label-config', () => {

    it('should respond with default entity label config for given project and class', async () => {
      const loginRes = await client.post('/login').send({ email: emailGaetan, password: pwd });
      const loginResponse: LoginResponse = loginRes.body;

      await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);
      const res: { body: GetEntityLabelConfigResponse } = await client
        .get('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .query({
          pkProject: ProProjectMock.PROJECT_1.pk_entity,
          fkClass: DfhApiClassMock.EN_633_UNION.dfh_pk_class
        })
      expect(res.body.defaultConfig?.config?.labelParts?.length).to.equal(1)
      expect(res.body.customConfig).to.be.undefined();
    })

    it('should respond with default and custom entity label config for given project and class', async () => {
      const loginRes = await client.post('/login').send({ email: "gaetan.muck@kleiolab.ch", password: pwd });
      const loginResponse: LoginResponse = loginRes.body;

      await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);
      await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_1);
      const res: { body: GetEntityLabelConfigResponse } = await client
        .get('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .query({
          pkProject: ProProjectMock.PROJECT_1.pk_entity,
          fkClass: DfhApiClassMock.EN_633_UNION.dfh_pk_class
        })
      expect(res.body.defaultConfig?.config?.labelParts?.length).to.equal(1)
      expect(res.body.customConfig?.config?.labelParts?.length).to.equal(2)
    })

    it('should reject if not project member', async () => {
      const loginRes = await client.post('/login').send({ email: emailJonas, password: pwd });
      const loginResponse: LoginResponse = loginRes.body;
      await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);
      await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_1);

      const res = await client
        .get('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .query({
          pkProject: ProProjectMock.PROJECT_1.pk_entity,
          fkClass: DfhApiClassMock.EN_633_UNION.dfh_pk_class
        })
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.containEql({ statusCode: 403 });
    })

    it('should reject if not logged in', async () => {
      const res = await client
        .get('/entity-label-config')
        .query({
          pkProject: ProProjectMock.PROJECT_1.pk_entity,
          fkClass: DfhApiClassMock.EN_633_UNION.dfh_pk_class
        })
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.containEql({ statusCode: 401 });
    })

  });

  describe('POST /entity-label-config', () => {

    it('should create entity label config', async () => {
      const loginRes = await client.post('/login').send({ email: emailGaetan, password: pwd });
      const loginResponse: LoginResponse = loginRes.body;

      const res: { body: ProEntityLabelConfig } = await client
        .post('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .send(ProEntityLabelConfigMock.C633_UNION_PROJECT_1)
      expect(res.body?.config?.labelParts?.length).to.equal(2)
    })

    it('should update entity label config', async () => {
      const loginRes = await client.post('/login').send({ email: emailGaetan, password: pwd });
      const loginResponse: LoginResponse = loginRes.body;

      let res: { body: ProEntityLabelConfig } = await client
        .post('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .send(ProEntityLabelConfigMock.C633_UNION_PROJECT_1)
      expect(res.body?.config?.labelParts?.length).to.equal(2)

      const modified = clone(ProEntityLabelConfigMock.C633_UNION_PROJECT_1)
      if(modified?.config) modified.config.labelParts = modified.config.labelParts?.splice(1, 1)
      res = await client
        .post('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .send(modified)
      expect(res.body?.config?.labelParts?.length).to.equal(1)
    })

    it('should reject if not project member', async () => {
      const loginRes = await client.post('/login').send({ email: emailJonas, password: pwd });
      const loginResponse: LoginResponse = loginRes.body;
      const res = await client
        .post('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .send(ProEntityLabelConfigMock.C633_UNION_PROJECT_1)
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.containEql({ statusCode: 403 });
    })

    it('should reject if not logged in', async () => {
      const res = await client
        .post('/entity-label-config')
        .send(ProEntityLabelConfigMock.C633_UNION_PROJECT_1)
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.containEql({ statusCode: 401 });
    })

  });

  describe('DEL /entity-label-config', () => {

    it('should delete entity label config', async () => {
      const loginRes = await client.post('/login').send({ email: emailGaetan, password: pwd });
      const loginResponse: LoginResponse = loginRes.body;
      await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await client
        .del('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .query({
          pkProject: ProProjectMock.PROJECT_1.pk_entity,
          fkClass: DfhApiClassMock.EN_633_UNION.dfh_pk_class
        })
      expect(res?.statusCode).to.equal(204)
    })

    it('should reject delete entity label config with not found', async () => {
      const loginRes = await client.post('/login').send({ email: emailGaetan, password: pwd });
      const loginResponse: LoginResponse = loginRes.body;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await client
        .del('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .query({
          pkProject: ProProjectMock.PROJECT_1.pk_entity,
          fkClass: DfhApiClassMock.EN_633_UNION.dfh_pk_class
        })
      expect(res.body.error.statusCode).to.equal(404)
    })

    it('should reject if not project member', async () => {
      const loginRes = await client.post('/login').send({ email: emailJonas, password: pwd });
      const loginResponse: LoginResponse = loginRes.body;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await client
        .del('/entity-label-config')
        .set('Authorization', loginResponse.lb4Token)
        .query({
          pkProject: ProProjectMock.PROJECT_1.pk_entity,
          fkClass: DfhApiClassMock.EN_633_UNION.dfh_pk_class
        })
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.containEql({ statusCode: 403 });
    })

    it('should reject if not logged in', async () => {
      const res = await client
        .del('/entity-label-config')
        .query({
          pkProject: ProProjectMock.PROJECT_1.pk_entity,
          fkClass: DfhApiClassMock.EN_633_UNION.dfh_pk_class
        })
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.containEql({ statusCode: 401 });
    })

  });

});

