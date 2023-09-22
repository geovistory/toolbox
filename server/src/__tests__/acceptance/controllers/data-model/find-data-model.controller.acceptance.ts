import {Client, expect} from '@loopback/testlab';
import {GeovistoryApplication} from '../../../../application';
import {LoginResponse} from '../../../../controllers/account.controller';
import {GvSchemaModifier} from '../../../../models/gv-schema-modifier.model';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProfile} from '../../../helpers/atomic/dfh-api-profile.helper';
import {createDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel} from '../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {linkAccountToProject} from '../../../helpers/atomic/pub-account_project_rel.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiProfileMock} from '../../../helpers/data/gvDB/DfhApiProfileMock';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {createAccountVerified} from '../../../helpers/generic/account.helper';
import {createProject1} from '../../../helpers/graphs/project.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {createTypes} from '../../../helpers/meta/model.helper';


describe('FindDataModelController', () => {
  let server: GeovistoryApplication;
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
    await createTypes();
    await createInfLanguage(InfLanguageMock.GERMAN);
    await createProject1();

    accountInProject = await createAccountVerified(emailGaetan, pwd);
    await linkAccountToProject(accountInProject, ProProjectMock.PROJECT_1.pk_entity as number);
    await createAccountVerified(emailJonas, pwd);
    const loginRes = await client.post('/login').send({email: emailGaetan, password: pwd});
    const loginResponse: LoginResponse = loginRes.body;
    lb4Token = loginResponse.lb4Token;
  });

  describe('GET /data-model/profiles/of-project', () => {

    it('should respond with GvSchemaModifier containing two profiles', async () => {

      await createDfhApiProfile(DfhApiProfileMock.MARITIME_HISTORY); // 8
      await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_BASIC); // 5 <- always loaded!
      await createDfhApiProfile(DfhApiProfileMock.BIOGRAPHY_AND_FAMILY); // <- 12
      await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_12) // <- add 12 to project

      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .get('/data-model/profiles/of-project')
        .set('Authorization', lb4Token)
        .query(params)
      expect(res.body.positive.dfh?.profile?.length).to.equal(2)
    })
  })

  describe('GET /data-model/classes/of-project', () => {

    it('should respond with GvSchemaModifier containing one class', async () => {

      await createDfhApiProfile(DfhApiProfileMock.MARITIME_HISTORY); // 8
      await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_BASIC); // 5 <- always loaded!
      await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_GENERIC_HIST); // <- 4
      await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4) // <- add 4 to project
      await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH) // in profile 4
      await createDfhApiClass(DfhApiClassMock.EN_523_SHIP_VOYAGE) // in profile 8
      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .get('/data-model/classes/of-project')
        .set('Authorization', lb4Token)
        .query(params)
      expect(res.body.positive.dfh?.klass?.length).to.equal(1)
    })
  })

  describe('GET /data-model/labels/of-project', () => {

    it('should respond with GvSchemaModifier containing two labels', async () => {

      await createDfhApiProfile(DfhApiProfileMock.BIOGRAPHY_AND_FAMILY); // 12
      await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_BASIC); // 5 <- always loaded!
      await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_GENERIC_HIST); // <- 4
      await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4) // <- add 4 to project
      await createDfhApiProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM) // in profile 12
      await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE) // in profile 4
      await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH) // in profile 4

      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .get('/data-model/labels/of-project')
        .set('Authorization', lb4Token)
        .query(params)
      expect(res.body.positive.dfh?.label?.length).to.equal(9)
    })
  })
});

