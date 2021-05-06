/* eslint-disable @typescript-eslint/camelcase */
import {Client, expect} from '@loopback/testlab';
import {LoginResponse} from '../../../../controllers/account.controller';
import {InfAppellation, InfDimension, InfLangString, InfPlace, InfLanguage, InfTimePrimitive, ProInfoProjRel, DatChunk, InfResource} from '../../../../models';
import {GvSchemaModifier} from '../../../../models/gv-schema-modifier.model';
import {InfResourceWithRelations} from '../../../../models/inf-resource-with-relations.model';
import {GeovistoryServer} from '../../../../server';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfResource} from '../../../helpers/atomic/inf-resource.helper';
import {linkAccountToProject} from '../../../helpers/atomic/pub-account_project_rel.helper';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../../../helpers/data/gvDB/InfResourceMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {createAccountVerified} from '../../../helpers/generic/account.helper';
import {createProject1} from '../../../helpers/graphs/project.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {DatChunkMock} from '../../../helpers/data/gvDB/DatChunkMock';


describe('CreateProjectDataController', () => {
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
    // await createModel();
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProject1();

    accountInProject = await createAccountVerified(emailGaetan, pwd);
    await linkAccountToProject(accountInProject, ProProjectMock.PROJECT_1.pk_entity as number);
    await createAccountVerified(emailJonas, pwd);
    const loginRes = await client.post('/login').send({email: emailGaetan, password: pwd});
    const loginResponse: LoginResponse = loginRes.body;
    lb4Token = loginResponse.lb4Token;
  });

  describe('POST /project-data/upsert-resources', () => {

    it('should respond with GvSchemaModifier containing an appellation (from object)', async () => {

      const resource: Partial<InfResourceWithRelations> = {
        fk_class: 1,
        outgoing_statements: [
          {
            fk_property: 1,
            fk_object_info: 2
          },
          {
            fk_property: 1,
            object_appellation: new InfAppellation({
              fk_class: 2,
              string: 'abc',
            })
          }
        ]
      }
      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])

      expect(res.body.positive.inf?.resource?.length).to.equal(1)
      expect(res.body.positive.inf?.statement?.length).to.equal(2)
      expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(3)
      expect(res.body.positive.inf?.appellation?.length).to.equal(1)
    })
  })

  it('should respond with GvSchemaModifier containing a place (from object)', async () => {

    const resource: Partial<InfResourceWithRelations> = {
      fk_class: 1,
      outgoing_statements: [
        {
          fk_property: 1,
          object_place: new InfPlace({
            fk_class: 2,
            lat: 1,
            long: 1
          })
        }
      ]
    }
    const params = {
      pkProject: ProProjectMock.PROJECT_1.pk_entity,
    }
    const res: {body: GvSchemaModifier} = await client
      .post('/project-data/upsert-resources')
      .set('Authorization', lb4Token)
      .query(params)
      .send([resource])

    expect(res.body.positive.inf?.resource?.length).to.equal(1)
    expect(res.body.positive.inf?.statement?.length).to.equal(1)
    expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(2)
    expect(res.body.positive.inf?.place?.length).to.equal(1)
  })

  it('should respond with GvSchemaModifier containing a dimesion (from object)', async () => {
    await createInfResource(InfResourceMock.TIME_UNIT_MONTH)
    const unit: Partial<InfResourceWithRelations> = InfResourceMock.TIME_UNIT_MONTH
    const resource: Partial<InfResourceWithRelations> = {
      fk_class: 1,
      outgoing_statements: [
        {
          fk_property: 1,
          object_dimension: new InfDimension({
            fk_class: 2,
            fk_measurement_unit: InfResourceMock.TIME_UNIT_MONTH.pk_entity,
            numeric_value: 1
          })
        }
      ]
    }
    const params = {
      pkProject: ProProjectMock.PROJECT_1.pk_entity,
    }
    const res: {body: GvSchemaModifier} = await client
      .post('/project-data/upsert-resources')
      .set('Authorization', lb4Token)
      .query(params)
      .send([unit, resource])

    expect(res.body.positive.inf?.resource?.length).to.equal(2)
    expect(res.body.positive.inf?.statement?.length).to.equal(1)
    expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(3)
    expect(res.body.positive.inf?.dimension?.length).to.equal(1)
  })


  it('should respond with GvSchemaModifier containing a langString (from object)', async () => {
    await createInfLanguage(InfLanguageMock.ITALIAN)
    const lang: Partial<InfResourceWithRelations> = InfLanguageMock.ITALIAN
    const resource: Partial<InfResourceWithRelations> = {
      fk_class: 1,
      outgoing_statements: [
        {
          fk_property: 1,
          object_lang_string: new InfLangString({
            fk_class: 2,
            fk_language: lang.pk_entity,
            string: 'abcd'
          })
        }
      ]
    }
    const params = {
      pkProject: ProProjectMock.PROJECT_1.pk_entity,
    }
    const res: {body: GvSchemaModifier} = await client
      .post('/project-data/upsert-resources')
      .set('Authorization', lb4Token)
      .query(params)
      .send([resource])

    expect(res.body.positive.inf?.resource?.length).to.equal(1)
    expect(res.body.positive.inf?.statement?.length).to.equal(1)
    expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(2)
    expect(res.body.positive.inf?.lang_string?.length).to.equal(1)
  })


  it('should respond with GvSchemaModifier containing a language (from object)', async () => {
    await createInfLanguage(InfLanguageMock.ITALIAN)
    const lang: Partial<InfResourceWithRelations> = InfLanguageMock.ITALIAN
    const resource: Partial<InfResourceWithRelations> = {
      fk_class: 1,
      outgoing_statements: [
        {
          fk_property: 1,
          object_language: new InfLanguage(lang)
        }
      ]
    }
    const params = {
      pkProject: ProProjectMock.PROJECT_1.pk_entity,
    }
    const res: {body: GvSchemaModifier} = await client
      .post('/project-data/upsert-resources')
      .set('Authorization', lb4Token)
      .query(params)
      .send([resource])

    expect(res.body.positive.inf?.resource?.length).to.equal(1)
    expect(res.body.positive.inf?.statement?.length).to.equal(1)
    expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(2)
    expect(res.body.positive.inf?.language?.length).to.equal(1)
  })


  it('should respond with GvSchemaModifier containing a timePrimitive (from object)', async () => {
    const resource: Partial<InfResourceWithRelations> = {
      fk_class: 1,
      outgoing_statements: [
        {
          fk_property: 1,
          object_time_primitive: new InfTimePrimitive({
            fk_class: 2,
            duration: '1 year',
            julian_day: 123456,
          }),
          entity_version_project_rels: [
            new ProInfoProjRel({calendar: 'julian'})
          ]
        }
      ]
    }
    const params = {
      pkProject: ProProjectMock.PROJECT_1.pk_entity,
    }
    const res: {body: GvSchemaModifier} = await client
      .post('/project-data/upsert-resources')
      .set('Authorization', lb4Token)
      .query(params)
      .send([resource])

    expect(res.body.positive.inf?.resource?.length).to.equal(1)
    expect(res.body.positive.inf?.statement?.length).to.equal(1)
    expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(2)
    expect(res.body.positive.pro?.info_proj_rel?.filter(r => r.calendar === 'julian').length).to.equal(1)
    expect(res.body.positive.inf?.time_primitive?.length).to.equal(1)
  })


  it('should respond with GvSchemaModifier containing a chunk (from object)', async () => {
    const resource: Partial<InfResourceWithRelations> = {
      fk_class: 1,
      outgoing_statements: [
        {
          fk_property: 1,
          object_chunk: new DatChunk({
            fk_text: 1,
            fk_entity_version: 1,
            fk_namespace: 2,
            quill_doc: DatChunkMock.RUDOLF.quill_doc
          }),
          entity_version_project_rels: [
            new ProInfoProjRel({calendar: 'julian'})
          ]
        }
      ]
    }
    const params = {
      pkProject: ProProjectMock.PROJECT_1.pk_entity,
    }
    const res: {body: GvSchemaModifier} = await client
      .post('/project-data/upsert-resources')
      .set('Authorization', lb4Token)
      .query(params)
      .send([resource])

    expect(res.body.positive.inf?.resource?.length).to.equal(1)
    expect(res.body.positive.inf?.statement?.length).to.equal(1)
    expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(2)
    expect(res.body.positive.dat?.chunk?.length).to.equal(1)
  })


  it('should respond with GvSchemaModifier containing a appellation in language (from subject) and a language (from object', async () => {
    await createInfLanguage(InfLanguageMock.ITALIAN)
    const lang: Partial<InfResourceWithRelations> = InfLanguageMock.ITALIAN
    const resource: Partial<InfResourceWithRelations> = {
      fk_class: 1,
      incoming_statements: [
        {
          fk_property: 1,
          subject_resource: new InfResource({
            fk_class: 2,
            outgoing_statements: [
              {
                fk_property: 2,
                object_language: new InfLanguage(lang)
              }
            ]
          })
        }
      ]
    }
    const params = {
      pkProject: ProProjectMock.PROJECT_1.pk_entity,
    }
    const res: {body: GvSchemaModifier} = await client
      .post('/project-data/upsert-resources')
      .set('Authorization', lb4Token)
      .query(params)
      .send([resource])

    expect(res.body.positive.inf?.resource?.length).to.equal(2)
    expect(res.body.positive.inf?.statement?.length).to.equal(2)
    expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(4)
    expect(res.body.positive.inf?.language?.length).to.equal(1)
  })


});

