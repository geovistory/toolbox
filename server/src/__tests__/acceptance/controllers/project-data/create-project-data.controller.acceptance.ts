import {DataObject} from '@loopback/repository/dist/common-types';
import {Client, expect} from '@loopback/testlab';
import {GeovistoryApplication} from '../../../../application';
import {CLASS_PK_EXPRESSION, CLASS_PK_ITEM, CLASS_PK_MANIFESTATION_PRODUCT_TYPE, CLASS_PK_MANIFESTATION_SINGLETON, CLASS_PK_WEB_REQUEST, PROPERTY_PK_P4_IS_SERVER_RESPONSE_TO_REQUEST, PROPERTY_PK_P5_HAS_CARRIER_PROVIDED_BY, PROPERTY_PK_R42_IS_REP_MANIFESTATION_SINGLETON_FOR, PROPERTY_PK_R4_CARRIERS_PROVIDED_BY} from '../../../../config';
import {LoginResponse} from '../../../../controllers/account.controller';
import {InfAppellation, InfDimension, InfLangString, InfPlace, InfResource, InfResourceWithRelations, InfStatementWithRelations, InfTimePrimitive} from '../../../../models';
import {CalendarType} from '../../../../models/enums/CalendarType';
import {Granularity} from '../../../../models/enums/Granularity';
import {GvSchemaModifier} from '../../../../models/gv-schema-modifier.model';
import {ProjectVisibilityOptions} from '../../../../models/sys-config/sys-config-project-visibility-options';
import {createDfhApiClass} from '../../../helpers/atomic/createDfhApiClass';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfResource} from '../../../helpers/atomic/inf-resource.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {createProVisibilitySettings} from '../../../helpers/atomic/pro-visibility-settings.helper';
import {linkAccountToProject} from '../../../helpers/atomic/pub-account_project_rel.helper';
import {createSysSystemConfig} from '../../../helpers/atomic/sys-system-config.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../../../helpers/data/gvDB/InfResourceMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {createAccountVerified} from '../../../helpers/generic/account.helper';
import {createProject1} from '../../../helpers/graphs/project.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {setupTestDB} from '../../../helpers/setupTestDB';

describe('CreateProjectDataController', () => {
  let server: GeovistoryApplication;
  let client: Client;
  let accountInProject: number;
  const emailGaetan = 'gaetan.muck@kleiolab.ch';
  const emailJonas = 'jonas.schneider@kleiolab.ch';
  const pwd = 'testtest1';
  let lb4Token: string


  afterEach(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    await setupTestDB();
    ({server, client} = await setupApplication());
    // await createModel();
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProject1();
    await createSysSystemConfig({
      classes: {},
      specialFields: {}
    });

    accountInProject = await createAccountVerified(emailGaetan, pwd);
    await linkAccountToProject(accountInProject, ProProjectMock.PROJECT_1.pk_entity as number);
    await createAccountVerified(emailJonas, pwd);
    const loginRes = await client.post('/login').send({email: emailGaetan, password: pwd});
    const loginResponse: LoginResponse = loginRes.body;
    lb4Token = loginResponse.lb4Token;
  });

  describe('POST /project-data/upsert-resources', () => {

    it('should respond with GvSchemaModifier containing an appellation (from object)', async () => {


      const resource: DataObject<InfResourceWithRelations> = {
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


    it('should respond with GvSchemaModifier containing a place (from object)', async () => {

      const resource: DataObject<InfResourceWithRelations> = {
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
      const unit: DataObject<InfResourceWithRelations> = InfResourceMock.TIME_UNIT_MONTH
      const resource: DataObject<InfResourceWithRelations> = {
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
      const resource: DataObject<InfResourceWithRelations> = {
        fk_class: 1,
        outgoing_statements: [
          {
            fk_property: 1,
            object_lang_string: new InfLangString({
              fk_class: 2,
              fk_language: InfLanguageMock.ITALIAN.pk_entity,
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
      const resource: DataObject<InfResourceWithRelations> = {
        fk_class: 1,
        outgoing_statements: [
          {
            fk_property: 1,
            object_language: InfLanguageMock.ITALIAN
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
      const resource: DataObject<InfResourceWithRelations> = {
        fk_class: 1,
        outgoing_statements: [
          {
            fk_property: 1,
            object_time_primitive: new InfTimePrimitive({
              fk_class: 2,
              duration: Granularity['1 year'],
              calendar: CalendarType.julian,
              julian_day: 123456,
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
      expect(res.body.positive.inf?.time_primitive?.length).to.equal(1)
    })



    it('should automatically create F2 Expression for F4 Manifestation Singleton', async () => {
      const resource: DataObject<InfResourceWithRelations> = {
        fk_class: CLASS_PK_MANIFESTATION_SINGLETON
      }
      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])

      // should have the man. singleton and the expression
      expect(res.body.positive.inf?.resource?.length).to.equal(2)
      // first instance should be man. singleton
      expect(res.body.positive.inf?.resource?.[0].fk_class).to.equal(CLASS_PK_MANIFESTATION_SINGLETON)
      // second instance should be expression
      expect(res.body.positive.inf?.resource?.[1].fk_class).to.equal(CLASS_PK_EXPRESSION)
      // should have statement
      expect(res.body.positive.inf?.statement?.length).to.equal(1)
      // statement should have correct property
      expect(res.body.positive.inf?.statement?.[0].fk_property).to.equal(PROPERTY_PK_R42_IS_REP_MANIFESTATION_SINGLETON_FOR)
      // object of statement should be expression
      expect(res.body.positive.inf?.statement?.[0].fk_object_info).to.equal(res.body.positive.inf?.resource?.[1]?.pk_entity)
      // subject of statement should be mainf singleton
      expect(res.body.positive.inf?.statement?.[0].fk_subject_info).to.equal(res.body.positive.inf?.resource?.[0]?.pk_entity)
      // should have 3 project relations (one for statement, two for instances)
      expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(3)
    })

    it('should automatically create F2 Expression for F3 Manifestation Product Type', async () => {
      const resource: DataObject<InfResourceWithRelations> = {
        fk_class: CLASS_PK_MANIFESTATION_PRODUCT_TYPE
      }
      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])

      // should have the man. prod. type and the expression
      expect(res.body.positive.inf?.resource?.length).to.equal(2)
      // first instance should be man. prod. type
      expect(res.body.positive.inf?.resource?.[0].fk_class).to.equal(CLASS_PK_MANIFESTATION_PRODUCT_TYPE)
      // second instance should be expression
      expect(res.body.positive.inf?.resource?.[1].fk_class).to.equal(CLASS_PK_EXPRESSION)
      // should have statement
      expect(res.body.positive.inf?.statement?.length).to.equal(1)
      // statement should have correct property
      expect(res.body.positive.inf?.statement?.[0].fk_property).to.equal(PROPERTY_PK_R4_CARRIERS_PROVIDED_BY)
      // subject of statement should be expression
      expect(res.body.positive.inf?.statement?.[0].fk_subject_info).to.equal(res.body.positive.inf?.resource?.[1]?.pk_entity)
      // object of statement should be mainf prod. type
      expect(res.body.positive.inf?.statement?.[0].fk_object_info).to.equal(res.body.positive.inf?.resource?.[0]?.pk_entity)
      // should have 3 project relations (one for statement, two for instances)
      expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(3)
    })


    it('should automatically create F2 Expression for F5 Item', async () => {
      const resource: DataObject<InfResourceWithRelations> = {
        fk_class: CLASS_PK_ITEM
      }
      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])

      // should have the man. prod. type and the expression
      expect(res.body.positive.inf?.resource?.length).to.equal(2)
      // first instance should be man. prod. type
      expect(res.body.positive.inf?.resource?.[0].fk_class).to.equal(CLASS_PK_ITEM)
      // second instance should be expression
      expect(res.body.positive.inf?.resource?.[1].fk_class).to.equal(CLASS_PK_EXPRESSION)
      // should have statement
      expect(res.body.positive.inf?.statement?.length).to.equal(1)
      // statement should have correct property
      expect(res.body.positive.inf?.statement?.[0].fk_property).to.equal(PROPERTY_PK_P5_HAS_CARRIER_PROVIDED_BY)
      // subject of statement should be expression
      expect(res.body.positive.inf?.statement?.[0].fk_subject_info).to.equal(res.body.positive.inf?.resource?.[1]?.pk_entity)
      // object of statement should be mainf prod. type
      expect(res.body.positive.inf?.statement?.[0].fk_object_info).to.equal(res.body.positive.inf?.resource?.[0]?.pk_entity)
      // should have 3 project relations (one for statement, two for instances)
      expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(3)
    })


    it('should automatically create F2 Expression for geovC4 Web Request', async () => {
      const resource: DataObject<InfResourceWithRelations> = {
        fk_class: CLASS_PK_WEB_REQUEST
      }
      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])

      // should have the man. prod. type and the expression
      expect(res.body.positive.inf?.resource?.length).to.equal(2)
      // first instance should be man. prod. type
      expect(res.body.positive.inf?.resource?.[0].fk_class).to.equal(CLASS_PK_WEB_REQUEST)
      // second instance should be expression
      expect(res.body.positive.inf?.resource?.[1].fk_class).to.equal(CLASS_PK_EXPRESSION)
      // should have statement
      expect(res.body.positive.inf?.statement?.length).to.equal(1)
      // statement should have correct property
      expect(res.body.positive.inf?.statement?.[0].fk_property).to.equal(PROPERTY_PK_P4_IS_SERVER_RESPONSE_TO_REQUEST)
      // subject of statement should be expression
      expect(res.body.positive.inf?.statement?.[0].fk_subject_info).to.equal(res.body.positive.inf?.resource?.[1]?.pk_entity)
      // object of statement should be mainf prod. type
      expect(res.body.positive.inf?.statement?.[0].fk_object_info).to.equal(res.body.positive.inf?.resource?.[0]?.pk_entity)
      // should have 3 project relations (one for statement, two for instances)
      expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(3)
    })

    it('should respond with GvSchemaModifier containing a appellation in language (from subject) and a language (from object', async () => {
      await createInfLanguage(InfLanguageMock.ITALIAN)
      const resource: DataObject<InfResourceWithRelations> = {
        fk_class: 1,
        incoming_statements: [
          {
            fk_property: 1,
            subject_resource: {
              fk_class: 2,
              outgoing_statements: [
                {
                  fk_property: 2,
                  object_language: InfLanguageMock.ITALIAN
                }
              ]
            }
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

    it('should create project relation with projectVisibilityDefault', async () => {
      await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
      const def: ProjectVisibilityOptions = {dataApi: false, website: true}
      await createSysSystemConfig({
        specialFields: {},
        classesDefault: {},
        classesByBasicType: {8: {projectVisibilityDefault: def}},
        classes: {},
      })
      const params = {pkProject: ProProjectMock.PROJECT_1.pk_entity, }
      const resource: Partial<InfResource> = {fk_class: 21}
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])
      expect(res.body.positive.pro?.info_proj_rel?.[0]?.project_visibility).to.deepEqual(def)
    })

    it('should create resource with communityVisibilityDefault', async () => {
      await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
      const def = {toolbox: true, dataApi: false, website: true}
      await createSysSystemConfig({
        specialFields: {},
        classesDefault: {},
        classesByBasicType: {8: {communityVisibilityDefault: def}},
        classes: {},
      })
      const params = {pkProject: ProProjectMock.PROJECT_1.pk_entity, }
      const resource: Partial<InfResource> = {fk_class: 21}
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])
      expect(res.body.positive.inf?.resource?.[0].community_visibility).to.deepEqual(def)
    })

    it('projectVisibilitySettings.classesDefault should override communityVisibilitySettings', async () => {
      await createDfhApiClass(DfhApiClassMock.EN_21_PERSON) // basic type 8
      await createProVisibilitySettings({
        pk_entity: 9001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        settings: {
          classesDefault: {
            communityVisibilityDefault: {toolbox: true, dataApi: true, website: true}, // <- should apply
          },
          classesByBasicType: {
            9: {
              communityVisibilityDefault: {toolbox: true, dataApi: true, website: false},
            }
          },
          classes: {
            363: {
              communityVisibilityDefault: {toolbox: true, dataApi: false, website: false},
            }
          }
        }
      })
      await createSysSystemConfig({
        specialFields: {},
        classes: {},
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},
          projectVisibilityDefault: {dataApi: false, website: false},
        },
      })
      const params = {pkProject: ProProjectMock.PROJECT_1.pk_entity, }
      const resource: Partial<InfResource> = {fk_class: 21}
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])
      expect(res.body.positive.inf?.resource?.[0].community_visibility).to
        .deepEqual({toolbox: true, dataApi: true, website: true})
    })

    it('projectVisibilitySettings.classesByBasicType should override communityVisibilitySettings', async () => {
      await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH) // basic type 9
      await createProVisibilitySettings({
        pk_entity: 9001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        settings: {
          classesDefault: {
            communityVisibilityDefault: {toolbox: true, dataApi: true, website: true},
          },
          classesByBasicType: {
            9: {
              communityVisibilityDefault: {toolbox: true, dataApi: true, website: false}, // <- should apply
            }
          },
          classes: {
            363: {
              communityVisibilityDefault: {toolbox: true, dataApi: false, website: false},
            }
          }
        }
      })
      await createSysSystemConfig({
        specialFields: {},
        classes: {},
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},
          projectVisibilityDefault: {dataApi: false, website: false},
        },
      })
      const params = {pkProject: ProProjectMock.PROJECT_1.pk_entity, }
      const resource: Partial<InfResource> = {fk_class: 61}
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])
      expect(res.body.positive.inf?.resource?.[0].community_visibility).to
        .deepEqual({toolbox: true, dataApi: true, website: false})
    })

    it('projectVisibilitySettings.classes should override communityVisibilitySettings', async () => {
      await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE) // basic type 8
      await createProVisibilitySettings({
        pk_entity: 9001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        settings: {
          classesDefault: {
            communityVisibilityDefault: {toolbox: true, dataApi: true, website: true},
          },
          classesByBasicType: {
            9: {
              communityVisibilityDefault: {toolbox: true, dataApi: true, website: false}, // <- should apply
            }
          },
          classes: {
            363: {
              communityVisibilityDefault: {toolbox: true, dataApi: false, website: false},
            }
          }
        }
      })
      await createSysSystemConfig({
        specialFields: {},
        classes: {},
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},
          projectVisibilityDefault: {dataApi: false, website: false},
        },
      })
      const params = {pkProject: ProProjectMock.PROJECT_1.pk_entity, }
      const resource: Partial<InfResource> = {fk_class: 363}
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])
      expect(res.body.positive.inf?.resource?.[0].community_visibility).to
        .deepEqual({toolbox: true, dataApi: false, website: false})
    })


    it('projectVisibilitySettings should not affect other projects and apply system defaults', async () => {
      await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE) // basic type 8
      await createProProject({pk_entity: 123})
      await createProVisibilitySettings({
        pk_entity: 9001,
        fk_project: 123,
        settings: {
          classesDefault: {
            communityVisibilityDefault: {toolbox: true, dataApi: true, website: true},
          },
          classesByBasicType: {
            9: {
              communityVisibilityDefault: {toolbox: true, dataApi: true, website: false},
            }
          },
          classes: {
            363: {
              communityVisibilityDefault: {toolbox: true, dataApi: false, website: false},
            }
          }
        }
      })
      await createSysSystemConfig({
        specialFields: {},
        classes: {},
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},  // <- should apply
          projectVisibilityDefault: {dataApi: false, website: false},
        },
      })
      const params = {pkProject: ProProjectMock.PROJECT_1.pk_entity, }
      const resource: Partial<InfResource> = {fk_class: 21}
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])
      expect(res.body.positive.inf?.resource?.[0].community_visibility).to
        .deepEqual({toolbox: false, dataApi: false, website: false})

      const res2: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-resources')
        .set('Authorization', lb4Token)
        .query(params)
        .send([resource])
      expect(res2.body.positive.inf?.resource?.[0].community_visibility).to
        .deepEqual({toolbox: false, dataApi: false, website: false})
    })

  })



  describe('POST /project-data/upsert-statements', () => {
    it('should respond with GvSchemaModifier containing many statements', async () => {
      await createInfResource(InfResourceMock.PERSON_1)
      await createInfLanguage(InfLanguageMock.ITALIAN)
      const statement: DataObject<InfStatementWithRelations> = {
        fk_subject_info: InfResourceMock.PERSON_1.pk_entity,
        fk_property: 1,
        object_resource: {
          fk_class: 1,
          incoming_statements: [
            {
              fk_property: 1,
              subject_resource: {
                fk_class: 2,
                outgoing_statements: [
                  {
                    fk_property: 2,
                    object_language: InfLanguageMock.ITALIAN
                  },
                  {
                    fk_property: 123,

                    object_lang_string: {
                      fk_language: InfLanguageMock.ITALIAN.pk_entity,
                      fk_class: 44,
                      string: 'foo'
                    }
                  }
                ]
              }
            },
          ]
        }
      }
      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-statements')
        .set('Authorization', lb4Token)
        .query(params)
        .send([statement])

      expect(res.body.positive.inf?.resource?.length).to.equal(2)
      expect(res.body.positive.inf?.statement?.length).to.equal(4)
      expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(6)
      expect(res.body.positive.inf?.language?.length).to.equal(1)
      expect(res.body.positive.inf?.lang_string?.length).to.equal(1)
    })


    it('should respond with GvSchemaModifier containing a normal statement and statement-of-statement', async () => {
      await createInfResource(InfResourceMock.PERSON_1)
      await createInfLanguage(InfLanguageMock.ITALIAN)
      const statements: DataObject<InfStatementWithRelations>[] = [
        {
          subject_statement: {fk_subject_info: 737365, fk_property: 1218, fk_object_info: 759082},
          fk_property_of_property: 1,
          object_lang_string: {quill_doc: {latestId: 4, ops: [{attributes: {charid: "4"}, insert: "3"}, {attributes: {blockid: "2"}, insert: "\n"}]}, fk_class: 657, fk_language: 18605}
        }]
      const params = {
        pkProject: ProProjectMock.PROJECT_1.pk_entity,
      }
      const res: {body: GvSchemaModifier} = await client
        .post('/project-data/upsert-statements')
        .set('Authorization', lb4Token)
        .query(params)
        .send(statements)

      expect(res.body.positive.inf?.statement?.length).to.equal(2)
      expect(res.body.positive.pro?.info_proj_rel?.length).to.equal(2)
      expect(res.body.positive.inf?.lang_string?.length).to.equal(1)
    })


  })


  describe('POST /project-data/upsert-data', () => {
    const person = {...InfResourceMock.PERSON_1}
    person.pk_entity = undefined;

    it('Create simple entity - respond with a pkEntity', async () => {
      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({resource: person})

      expect(res.body.positive.inf.resource.length).to.equal(1);
      expect(res.body.positive.inf.resource[0].pk_entity).to.not.be.undefined();
    })

    it('Create entity with relations - respond with a pkEntity', async () => {
      const resource: DataObject<InfResourceWithRelations> = {
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

      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({resource})

      expect(res.body.positive.inf.resource.length).to.equal(1);
      expect(res.body.positive.inf.resource[0].pk_entity).to.not.be.undefined();
    })

    it('Create simple statement - respond with a pkEntity', async () => {
      await createInfResource(InfResourceMock.PERSON_1)
      await createInfLanguage(InfLanguageMock.ITALIAN)

      const statement = {
        subject_statement: {fk_subject_info: 737365, fk_property: 1218, fk_object_info: 759082},
        fk_property_of_property: 1,
        object_lang_string: {quill_doc: {latestId: 4, ops: [{attributes: {charid: "4"}, insert: "3"}, {attributes: {blockid: "2"}, insert: "\n"}]}, fk_class: 657, fk_language: 18605}
      }

      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({statement})

      expect(res.body.positive.inf.statement.length).to.equal(1);
      expect(res.body.positive.inf.statement[0].pk_entity).to.not.be.undefined();
    })


    it('Create statement with relations - respond with a pkEntity', async () => {
      await createInfResource(InfResourceMock.PERSON_1)
      await createInfLanguage(InfLanguageMock.ITALIAN)

      const statement: DataObject<InfStatementWithRelations> = {
        fk_subject_info: InfResourceMock.PERSON_1.pk_entity,
        fk_property: 1,
        object_resource: {
          fk_class: 1,
          incoming_statements: [
            {
              fk_property: 1,
              subject_resource: {
                fk_class: 2,
                outgoing_statements: [
                  {
                    fk_property: 2,
                    object_language: InfLanguageMock.ITALIAN
                  },
                  {
                    fk_property: 123,

                    object_lang_string: {
                      fk_language: InfLanguageMock.ITALIAN.pk_entity,
                      fk_class: 44,
                      string: 'foo'
                    }
                  }
                ]
              }
            },
          ]
        }
      }

      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({statement})

      expect(res.body.positive.inf.statement.length).to.equal(1);
      expect(res.body.positive.inf.statement[0].pk_entity).to.not.be.undefined();
    })

    it('Create appellation - respond with a pkEntity', async () => {
      const appellation = new InfAppellation({fk_class: 2, string: 'abc'})

      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({appellation})

      expect(res.body.positive.inf.appellation.length).to.equal(1);
      expect(res.body.positive.inf.appellation[0].pk_entity).to.not.be.undefined();
    })

    it('Create place - respond with a pkEntity', async () => {
      const place = new InfPlace({fk_class: 2, lat: 1, long: 1})

      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({place})

      expect(res.body.positive.inf.place.length).to.equal(1);
      expect(res.body.positive.inf.place[0].pk_entity).to.not.be.undefined();
    })

    it('Create dimension - respond with a pkEntity', async () => {
      await createInfResource(InfResourceMock.TIME_UNIT_MONTH)
      const dimension = new InfDimension({fk_class: 2, fk_measurement_unit: InfResourceMock.TIME_UNIT_MONTH.pk_entity, numeric_value: 1})

      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({dimension})

      expect(res.body.positive.inf.dimension.length).to.equal(1);
      expect(res.body.positive.inf.dimension[0].pk_entity).to.not.be.undefined();
    })

    it('Create timePrimitive - respond with a pkEntity', async () => {
      const timePrimitive = new InfTimePrimitive({fk_class: 2, duration: Granularity['1 year'], calendar: CalendarType.julian, julian_day: 123456})

      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({timePrimitive: timePrimitive})

      expect(res.body.positive.inf.time_primitive.length).to.equal(1);
      expect(res.body.positive.inf.time_primitive[0].pk_entity).to.not.be.undefined();
    })

    it('Create language - respond with a pkEntity', async () => {
      const lang = {...InfLanguageMock.GERMAN}
      lang.pk_entity = undefined
      lang.pk_language = 'aaa'

      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({language: lang})

      expect(res.body.positive.inf.language.length).to.equal(1);
      expect(res.body.positive.inf.language[0].pk_entity).to.not.be.undefined();
    })

    it('Create langString - respond with a pkEntity', async () => {
      await createInfLanguage(InfLanguageMock.ITALIAN)
      const langString = new InfLangString({fk_class: 2, fk_language: InfLanguageMock.ITALIAN.pk_entity, string: 'abcd'})

      const res = await client.post('/project-data/upsert-data').set('Authorization', lb4Token)
        .query({pkProject: ProProjectMock.PROJECT_1.pk_entity})
        .send({langString: langString})

      expect(res.body.positive.inf.lang_string.length).to.equal(1);
      expect(res.body.positive.inf.lang_string[0].pk_entity).to.not.be.undefined();
    })

  })

});


