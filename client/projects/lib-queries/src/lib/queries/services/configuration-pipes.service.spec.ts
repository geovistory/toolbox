import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState, SchemaService } from '@kleiolab/lib-redux';
import { GvPositiveSchemaObject, GvTargetType } from '@kleiolab/lib-sdk-lb4';
import { moduleImports } from 'projects/lib-queries/src/__tests__/helpers/module-imports';
import { setAppState } from 'projects/lib-queries/src/__tests__/helpers/set-app-state';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiPropertyMock';
import { DfhApiClass, PK_DEFAULT_CONFIG_PROJECT } from 'projects/__test__/data/auto-gen/gvDB/local-model.helpers';
import { ProClassFieldConfigMock } from 'projects/__test__/data/auto-gen/gvDB/ProClassFieldConfigMock';
import { ProDfhProfileProjRelMock } from 'projects/__test__/data/auto-gen/gvDB/ProDfhProfileProjRelMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { transformDfhApiClassToDfhClass, transformDfhApiClassToDfhLabel } from 'projects/__test__/helpers/transformers';
import { first, take, toArray } from 'rxjs/operators';
import { Field } from '../models/Field';
import { Subfield } from '../models/Subfield';
import { ConfigurationPipesService } from './configuration-pipes.service';

describe('ConfigurationPipeService', () => {
  let ngRedux: NgRedux<IAppState>;
  let service: ConfigurationPipesService;
  let schemaObjServcie: SchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports
    });
    service = TestBed.get(ConfigurationPipesService);
    schemaObjServcie = TestBed.get(SchemaService);
    ngRedux = TestBed.get(NgRedux);
  });
  // afterEach(() => {
  //   setAppState(ngRedux, {})
  // });
  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })

  describe('.pipeProfilesEnabledByProject()', () => {
    it('should return two custom profiles + basic profile (id:5)', async (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      // seeding data
      const gvSchemaObj: GvPositiveSchemaObject = {
        pro: {
          dfh_profile_proj_rel: [
            ProDfhProfileProjRelMock.PROJ_1_PROFILE_12,
            ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
          ]
        }
      }
      schemaObjServcie.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)

      // console.log(JSON.stringify(ngRedux.getState().pro.dfh_profile_proj_rel.by_fk_project__enabled))
      // using pipe
      const q$ = service.pipeProfilesEnabledByProject()

      // testing pipe
      const expectedSequence = [12, 4, 5]

      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0]).toContain(12)
            expect(actualSequence[0]).toContain(4)
            expect(actualSequence[0]).toContain(5)
          },
          null,
          done);
    });



  })
  describe('.pipeClassFieldConfigs()', () => {
    it('should return class config for class C365_NAMING', (done) => {
      setAppState(ngRedux, IAppStateMock.stateDefaultConfigProject)
      // seeding data
      const gvSchemaObj: GvPositiveSchemaObject = { pro: { class_field_config: [ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME] } }
      schemaObjServcie.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)

      setTimeout(() => {

        // using pipe
        const q$ = service.pipeFieldConfigs(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME.fk_domain_class)

        // testing pipe
        const expectedSequence = [[ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME]]

        q$.pipe(first(), toArray())
          .subscribe(
            actualSequence => {
              expect(actualSequence).toEqual(expectedSequence)
            },
            null,
            done);

      });
    })




  })

  describe('.pipeFieldLabel()', () => {
    it('should return label for EN_1111_IS_APPE_OF', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFieldLabel(
        DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
        DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_property_domain,
        DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_property_range,
      )

      // testing pipe
      const expectedSequence: string[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0]).toEqual(DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_property_label)
          },
          null,
          done);

    });
    it('should return label for 1762_HAS_DEFINITION', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFieldLabel(
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_pk_property,
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_domain,
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_range,
      )

      // testing pipe
      const expectedSequence: string[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0]).toEqual(DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_label)
          },
          null,
          done);

    });
  })

  describe('.pipeClassLabel()', () => {
    it('should return label for EN_21_PERSON', (done) => {
      const dfhClass = DfhApiClassMock.EN_21_PERSON
      pipeClassLabelTest(dfhClass, ngRedux, schemaObjServcie, service, done);
    });
    it('should return label for EN_365_NAMING', (done) => {
      const dfhClass = DfhApiClassMock.EN_365_NAMING
      pipeClassLabelTest(dfhClass, ngRedux, schemaObjServcie, service, done);
    });
    it('should return label for EN_785_TEXT', (done) => {
      const dfhClass = DfhApiClassMock.EN_785_TEXT
      pipeClassLabelTest(dfhClass, ngRedux, schemaObjServcie, service, done);
    });
    it('should return label for EN_40_APPELLATION', (done) => {
      const dfhClass = DfhApiClassMock.EN_40_APPELLATION
      pipeClassLabelTest(dfhClass, ngRedux, schemaObjServcie, service, done);
    });
  })
  describe('.pipeSubfieldTypeOfClass()', () => {
    it('should return subfieldtype for EN_784_SHORT_TITLE', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeSubfieldTypeOfClass(
        GvSchemaObjectMock.sysConfig.sys.config[0],
        DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class,
        -1
      )

      // testing pipe
      const expectedSequence: GvTargetType[] = [GvSchemaObjectMock.sysConfig.sys.config[0].classes[DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class].valueObjectType]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);

    });
    it('should return subfieldtype for EN_785_TEXT', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeSubfieldTypeOfClass(
        GvSchemaObjectMock.sysConfig.sys.config[0],
        DfhApiClassMock.EN_785_TEXT.dfh_pk_class,
        -1
      )

      // testing pipe
      const expectedSequence: GvTargetType[] = [GvSchemaObjectMock.sysConfig.sys.config[0].classes[DfhApiClassMock.EN_785_TEXT.dfh_pk_class].valueObjectType]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);

    });
  })
  // describe('.pipePropertiesToSubfields()', () => {
  //   it('should contvert property EN_1113_REFERS_TO_NAME to subfield', (done) => {
  //     // seeding data
  //     setAppState(ngRedux, IAppStateMock.stateProject1)
  //     schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

  //     // using pipe
  //     const q$ = service.pipePropertiesToSubfields(
  //       [transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME)],
  //       true,
  //       [4, 5],
  //       SysConfigValueMock.SYS_CONFIC_VALID
  //     )

  //     // testing pipe
  //     const expectedSequence = [[SubfieldMock.appeHasAppeString]]

  //     q$.pipe(first(), toArray())
  //       .subscribe(
  //         actualSequence => {
  //           expect(actualSequence).toEqual(expectedSequence)
  //         },
  //         null,
  //         done);

  //   });
  //   it('should contvert property EN_1762_HAS_DEFINITION to subfield', (done) => {
  //     // seeding data
  //     setAppState(ngRedux, IAppStateMock.stateProject1)
  //     schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
  //     schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.fieldsOfManifestationSingleton, PK_DEFAULT_CONFIG_PROJECT)
  //     schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
  //     schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
  //     // using pipe
  //     const q$ = service.pipePropertiesToSubfields(
  //       [transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1762_HAS_DEFINITION)],
  //       true,
  //       [4, 5],
  //       SysConfigValueMock.SYS_CONFIC_VALID
  //     )

  //     // testing pipe (remove source class info because this is a generic property where souce is CRM Entity)
  //     const { sourceClass, sourceClassLabel, ...subfield } = SubfieldMock.manifestationSingletonHasDefinition;

  //     q$.pipe(first(), toArray())
  //       .subscribe(
  //         actualSequence => {
  //           const { sourceClass, sourceClassLabel, ...actualSubfield } = actualSequence[0][0]
  //           expect(actualSubfield).toEqual(subfield)
  //         },
  //         null,
  //         done);

  //   });
  //   it('should contvert appeForLang->hasTimeSpanProperty to subfield', (done) => {
  //     // seeding data
  //     setAppState(ngRedux, IAppStateMock.stateProject1)
  //     schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
  //     schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.fieldsOfManifestationSingleton, PK_DEFAULT_CONFIG_PROJECT)
  //     schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
  //     schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
  //     // using pipe
  //     const q$ = service.pipePropertiesToSubfields(
  //       [createHasTimeSpanProperty(DfhApiClassMock.EN_365_NAMING.dfh_pk_class)],
  //       true,
  //       [4, 5],
  //       SysConfigValueMock.SYS_CONFIC_VALID
  //     )

  //     // testing pipe (remove source class info because this is a generic property where souce is CRM Entity)
  //     const { sourceClass, sourceClassLabel, ...subfield } = SubfieldMock.appeHasTimeSpan;

  //     q$.pipe(first(), toArray())
  //       .subscribe(
  //         actualSequence => {
  //           const { sourceClass, sourceClassLabel, ...actualSubfield } = actualSequence[0][0]
  //           expect(actualSubfield).toEqual(subfield)
  //         },
  //         null,
  //         done);

  //   });
  // })

  describe('.pipeFields()', () => {

    it('should return correct fields of manifestation singleton', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.fieldsOfManifestationSingleton, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0].length).toEqual(6)
          },
          null,
          done);

    });


    it('should return fields of time span', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0].length).toEqual(6)
          },
          null,
          done);

    });
  })

  describe('.pipeBasicAndSpecificFields()', () => {
    it('should return correct fields of Appellation for language', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      // using pipe
      const q$ = service.pipeBasicAndSpecificFields(DfhApiClassMock.EN_365_NAMING.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(JSON.stringify(actualSequence))
            const fs = actualSequence[0];

            expect(fs[0].label).toEqual('has definition')
            expect(fs[0].placeOfDisplay.basicFields.position).toEqual(4)
            expect(fs[1].label).toEqual('has time-span')
            expect(fs[2].label).toEqual('is appellation for language of')
            expect(fs[3].label).toEqual('refers to name')
          },
          null,
          done);

    });

    it('should mark the field Person->AppeTeEn->Person as circular', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      // using pipe
      const q$ = service.pipeBasicAndSpecificFields(DfhApiClassMock.EN_21_PERSON.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(JSON.stringify(actualSequence))
            const fs = actualSequence[0];
            expect(fs[0].property.fkProperty).toEqual(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property)
            expect(fs[0].targets[DfhApiClassMock.EN_365_NAMING.dfh_pk_class].listType.temporalEntity[0].page.isCircular).toEqual(true)
          },
          null,
          done);
    });
    it('should mark the field Person->AppeTeEn->Appe as not circular', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      // using pipe
      const q$ = service.pipeBasicAndSpecificFields(DfhApiClassMock.EN_21_PERSON.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(JSON.stringify(actualSequence))
            const fs = actualSequence[0];
            expect(fs[0].property.fkProperty).toEqual(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property)
            expect(fs[0].targets[DfhApiClassMock.EN_365_NAMING.dfh_pk_class].listType.temporalEntity[3].page.isCircular).toEqual(false)
          },
          null,
          done);
    });
    it('should return correct fields of manifestation singleton', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.fieldsOfManifestationSingleton, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeBasicAndSpecificFields(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(JSON.stringify(actualSequence))
            const fs = actualSequence[0];

            expect(fs[0].placeOfDisplay.basicFields.position).toEqual(1)
            expect(fs[0].label).toEqual('has short title')
            expect(fs[1].label).toEqual('* reverse of: is appellation for language of*')
            expect(fs[2].label).toEqual('has manifestation singleton type')
            expect(fs[3].label).toEqual('has definition')
            expect(fs[4].label).toEqual('is representative manifestation singleton for')
            expect(fs[5].label).toEqual('* reverse of: created*')
          },
          null,
          done);

    });
  })

  describe('.pipeTypeClassesEnabledByProjectProfiles()', () => {
    it('should return one type class', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      // seeding data
      const gvSchemaObj: GvPositiveSchemaObject = {
        dfh: {
          klass: [
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_364_GEO_PLACE_TYPE),
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_365_NAMING)
          ],
          label: [
            transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_364_GEO_PLACE_TYPE),
            transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_365_NAMING)
          ]
        },
        pro: {
          dfh_profile_proj_rel: [
            ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
          ]
        }
      }
      schemaObjServcie.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)


      // using pipe
      const q$ = service.pipeTypeClassesEnabledByProjectProfiles()

      // testing pipe
      const expectedSequence = [12, 4, 5]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0]).toEqual([transformDfhApiClassToDfhClass(DfhApiClassMock.EN_364_GEO_PLACE_TYPE)])
          },
          null,
          done);

    });




  })

  describe('.pipeClassLabel()', () => {
    it('should return class label of Geographical Place', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      // seeding data
      const gvSchemaObj: GvPositiveSchemaObject = {
        dfh: {
          klass: [
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_363_GEO_PLACE),
          ],
          label: [
            transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_363_GEO_PLACE),
          ]
        },
        pro: {
          dfh_profile_proj_rel: [
            ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
          ]
        }
      }
      schemaObjServcie.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)


      // using pipe
      const q$ = service.pipeClassLabel(DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class)

      // testing pipe
      const expectedSequence = ['Geographical Place']

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);

    });

  })

  describe('.pipeSubfieldIdToSubfield()', () => {
    it('should return subfield', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      // using pipe
      const q$ = service.pipeSubfieldIdToSubfield(
        21,
        1111,
        365,
        false
      )

      // testing pipe
      const expectedSequence: Subfield[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            const fs = actualSequence[0];
            expect(fs.sourceClass).toEqual(21)
            expect(fs.targetClass).toEqual(365)
          },
          null,
          done);

    });

  })


});
function pipeClassLabelTest(
  dfhClass: DfhApiClass,
  ngRedux: NgRedux<IAppState>,
  schemaObjServcie: SchemaService,
  service: ConfigurationPipesService,
  done: DoneFn
) {
  setAppState(ngRedux, IAppStateMock.stateProject1);
  schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT);
  schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT);
  // using pipe
  const q$ = service.pipeClassLabel(dfhClass.dfh_pk_class);
  // testing pipe
  const expectedSequence: string[] = [dfhClass.dfh_class_label];
  q$.pipe(first(), toArray())
    .subscribe(actualSequence => {
      expect(actualSequence).toEqual(expectedSequence);
    }, null, done);
}

