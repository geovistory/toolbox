import {Client, expect} from '@loopback/testlab';
import {LoginResponse} from '../../../../controllers/account.controller';
import {GvPositiveSchemaObject} from '../../../../models/gv-positive-schema-object.model';
import {GeovistoryServer} from '../../../../server';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createInfResource} from '../../../helpers/atomic/inf-resource.helper';
import {createProInfoProjRel} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {linkAccountToProject} from '../../../helpers/atomic/pub-account_project_rel.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {InfResourceMock} from '../../../helpers/data/gvDB/InfResourceMock';
import {ProInfoProjRelMock} from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {createAccountVerified} from '../../../helpers/generic/account.helper';
import {createProject1} from '../../../helpers/graphs/project.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {createModel} from '../../../helpers/meta/model.helper';


describe('FindProjectDataController', () => {
  let server: GeovistoryServer;
  let client: Client;
  let accountInProject: number;
  const emailGaetan = 'gaetan.muck@kleiolab.ch';
  const emailJonas = 'jonas.schneider@kleiolab.ch';
  const pwd = 'testtest1';
  let lb4Token: string

  before(async () => {({server, client} = await setupApplication());});
  after(async () => {await server.stop();});

  beforeEach(async () => {
    await cleanDb();
    await createModel();
    await createProject1();

    accountInProject = await createAccountVerified(emailGaetan, pwd);
    await linkAccountToProject(accountInProject, ProProjectMock.PROJECT_1.pk_entity as number);
    await createAccountVerified(emailJonas, pwd);
    const loginRes = await client.post('/login').send({email: emailGaetan, password: pwd});
    const loginResponse: LoginResponse = loginRes.body;
    lb4Token = loginResponse.lb4Token;
  });

  describe('GET /project-data/get-resource', () => {

    it('should respond with GvPositiveSchemaObject containing the resource', async () => {

      await createInfResource(InfResourceMock.PERSON_1);
      await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1);
      await createInfResource(InfResourceMock.BIRTH_1);
      await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_BIRTH);
      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
        pkEntity: InfResourceMock.PERSON_1.pk_entity
      }
      const res: {body: GvPositiveSchemaObject} = await client
        .get('/project-data/get-resource')
        .set('Authorization', lb4Token)
        .query(params)
      expect(res.body.inf?.resource?.length).to.equal(1)
    })
  })

  describe('GET project-data/get-types-of-project', () => {

    it('should respond with GvPositiveSchemaObject containing the resource', async () => {

      await createInfResource(InfResourceMock.GEO_PLACE_TYPE_CITY);
      await createDfhApiClass(DfhApiClassMock.EN_364_GEO_PLACE_TYPE);
      await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_CITY_TYPE)

      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity
      }
      const res: {body: GvPositiveSchemaObject} = await client
        .get('/project-data/get-types-of-project')
        .set('Authorization', lb4Token)
        .query(params)
      expect(res.body.inf?.resource?.length).to.equal(1)
      expect(res.body.inf?.resource?.[0].pk_entity).to.equal(InfResourceMock.GEO_PLACE_TYPE_CITY.pk_entity)
    })
  })


  // describe('GET project-data/get-chunks-of-digital', () => {

  //   it('should respond with GvPositiveSchemaObject containing the resource', async () => {
  //     await createProProject(ProProjectMock.SANDBOX_PROJECT)
  //     await linkAccountToProject(accountInProject, ProProjectMock.SANDBOX_PROJECT.pk_entity as number);
  //     await createDatNamespace(DatNamespaceMock.SANDBOX_NAMESPACE);
  //     await createDatDigital(DatDigitalMock.DIGITAL_TEXT_RODOLF_FOO);
  //     await createDatChunk(DatChunkMock.RUDOLF)
  //     await createInfStatement(InfStatementMock.CHUNK_RUDOLF_REFERS_TO_RUDOLF)
  //     await addInfoToProject(
  //       InfStatementMock.CHUNK_RUDOLF_REFERS_TO_RUDOLF.pk_entity,
  //       ProProjectMock.SANDBOX_PROJECT.pk_entity,
  //     )

  //     const params = {
  //       pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity,
  //       pkDigital: DatDigitalMock.DIGITAL_TEXT_RODOLF_FOO.pk_entity
  //     }
  //     const res: {body: GvPositiveSchemaObject} = await client
  //       .get('/project-data/get-chunks-of-digital')
  //       .set('Authorization', lb4Token)
  //       .query(params)
  //     expect(res.body.inf?.statement?.length).to.equal(1)
  //     expect(res.body.pro?.info_proj_rel?.length).to.equal(1)
  //     expect(res.body.dat?.chunk?.length).to.equal(1)
  //   })
  // })
});

