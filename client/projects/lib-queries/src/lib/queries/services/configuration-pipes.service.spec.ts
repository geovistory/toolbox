import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState, SchemaService } from '@kleiolab/lib-redux';
import { GvFieldTargetViewType, GvPositiveSchemaObject, GvSubentityFieldTargetViewType, SysConfigFormCtrlType } from '@kleiolab/lib-sdk-lb4';
import { moduleImports } from 'projects/lib-queries/src/__tests__/helpers/module-imports';
import { setAppState } from 'projects/lib-queries/src/__tests__/helpers/set-app-state';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiPropertyMock';
import { DfhApiClass, PK_DEFAULT_CONFIG_PROJECT } from 'projects/__test__/data/auto-gen/gvDB/local-model.helpers';
import { ProClassFieldConfigMock } from 'projects/__test__/data/auto-gen/gvDB/ProClassFieldConfigMock';
import { ProDfhProfileProjRelMock } from 'projects/__test__/data/auto-gen/gvDB/ProDfhProfileProjRelMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2021-06-30';
import { PROFILE_32_LINKED_IDENTIFI_2021_07_23 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-32-linked-identifi-2021-07-23';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2021-06-30';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { createCrmAsGvPositiveSchema, ontomeProfileMockToGvPositiveSchema, transformDfhApiClassToDfhClass, transformDfhApiClassToDfhLabel, transformDfhApiPropertyToDfhProperty } from 'projects/__test__/helpers/transformers';
import { first, take, toArray } from 'rxjs/operators';
import { Field } from '../models/Field';
import { ConfigurationPipesService, DisplayType, SectionName } from './configuration-pipes.service';

describe('ConfigurationPipeService', () => {
  let ngRedux: NgRedux<IAppState>;
  let service: ConfigurationPipesService;
  let schemaObjService: SchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports,
    });
    service = TestBed.inject(ConfigurationPipesService);
    schemaObjService = TestBed.inject(SchemaService);
    ngRedux = TestBed.inject(NgRedux);
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
    it('should return two custom profiles + basic profile (id:5)', (done) => {
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
      schemaObjService.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)

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
      const gvSchemaObj: GvPositiveSchemaObject = {
        pro: { class_field_config: [ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME] }
      }
      schemaObjService.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)

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

  describe('.pipeNestedResource()', () => {
    it('should go through nested fields of stems from - union', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv
        (
          ontomeProfileMockToGvPositiveSchema(PROFILE_12_BIOGRAPHICAL_BA_2022_01_14, ProProjectMock.PROJECT_1.pk_entity),
          PK_DEFAULT_CONFIG_PROJECT
        )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeNestedResource(
        DfhApiClassMock.EN_633_UNION.dfh_pk_class, DfhApiPropertyMock.EN_1435_STEMS_FROM.dfh_pk_property
      )

      q$.pipe(first())
        .subscribe(
          actualSequence => {
            expect(actualSequence).not.toBeUndefined();
          },
          null,
          done);

    });
  })


  describe('.pipeFieldLabel()', () => {
    it('should return label for EN_1111_IS_APPE_OF', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const isOutgoing = true

      const q$ = service.pipeFieldLabel(
        DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_property_domain,
        isOutgoing,
        DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
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
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const isOutgoing = true
      const q$ = service.pipeFieldLabel(
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_domain,
        isOutgoing,
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_pk_property,
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
    it('should return inverse label for 1762_HAS_DEFINITION', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const isOutgoing = false
      const q$ = service.pipeFieldLabel(
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_range,
        isOutgoing,
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_pk_property,
      )

      // testing pipe
      const expectedSequence: string[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0]).toEqual(DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_inverse_label)
          },
          null,
          done);

    });
  })

  describe('.pipeClassLabel()', () => {
    it('should return label for EN_21_PERSON', (done) => {
      const dfhClass = DfhApiClassMock.EN_21_PERSON
      pipeClassLabelTest(dfhClass, ngRedux, schemaObjService, service, done);
    });
    it('should return label for EN_365_NAMING', (done) => {
      const dfhClass = DfhApiClassMock.EN_365_NAMING
      pipeClassLabelTest(dfhClass, ngRedux, schemaObjService, service, done);
    });
    it('should return label for EN_785_TEXT', (done) => {
      const dfhClass = DfhApiClassMock.EN_785_TEXT
      pipeClassLabelTest(dfhClass, ngRedux, schemaObjService, service, done);
    });
    it('should return label for EN_40_APPELLATION', (done) => {
      const dfhClass = DfhApiClassMock.EN_40_APPELLATION
      pipeClassLabelTest(dfhClass, ngRedux, schemaObjService, service, done);
    });
  })
  describe('.pipeTargetTypesOfClass()', () => {
    it('should return correct target types for EN_784_SHORT_TITLE', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeTargetTypesOfClass(
        DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class,
        -1
      )

      // testing pipe
      const shortTitleConfig = GvSchemaObjectMock.sysConfig.sys.config[0].classes[DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class];
      const expectedSequence = [{
        viewType: shortTitleConfig.valueObjectType,
        formControlType: shortTitleConfig.formControlType
      }]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);

    });

    it('should return correct target types for EN_785_TEXT', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeTargetTypesOfClass(
        DfhApiClassMock.EN_785_TEXT.dfh_pk_class,
        -1
      )

      // testing pipe
      const shortTitleConfig = GvSchemaObjectMock.sysConfig.sys.config[0].classes[DfhApiClassMock.EN_785_TEXT.dfh_pk_class];
      const expectedSequence = [{
        viewType: shortTitleConfig.valueObjectType,
        formControlType: shortTitleConfig.formControlType
      }]

      q$.pipe(first(), toArray())
        .subscribe({
          next: actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          complete: done
        });

    });

    it('should return typeItem/typeItem for EN_364_GEO_PLACE_TYPE', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.classGeographicalPlaceType, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeTargetTypesOfClass(
        DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class,
        1
      )

      // testing pipe
      const viewType: GvFieldTargetViewType = { typeItem: 'true' }
      const formControlType: SysConfigFormCtrlType = { typeItem: 'true' }
      const expectedSequence = [{ viewType, formControlType }]

      q$.pipe(first(), toArray())
        .subscribe({
          next: actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          complete: done
        });

    });

    it('should return entityPreview/entity for EN_363_GEO_PLACE', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.classGeographicalPlace, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeTargetTypesOfClass(
        DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
        1
      )

      // testing pipe
      const viewType: GvFieldTargetViewType = { entityPreview: 'true' }
      const formControlType: SysConfigFormCtrlType = { entity: 'true' }
      const expectedSequence = [{ viewType, formControlType }]

      q$.pipe(first(), toArray())
        .subscribe({
          next: actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          complete: done
        });

    });

    it('should return entity/nestedRessource for EN_61_BIRTH', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.modelOfBirth, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeTargetTypesOfClass(
        DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
        1
      )
      q$.pipe(first(), toArray())
        .subscribe({
          next: actualSequence => {
            expect(actualSequence[0].formControlType).toEqual({ entity: 'true' })
            expect(actualSequence[0].viewType.nestedResource.length).toEqual(3)
          },
          complete: done
        });

    });
    it('should return appellationTeEn/nestedRessource for EN_365_NAMING', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.modelOfBirth, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeTargetTypesOfClass(
        DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
        1
      )
      q$.pipe(first(), toArray())
        .subscribe({
          next: actualSequence => {
            expect(actualSequence[0].formControlType).toEqual({ appellationTeEn: 'true' })
            expect(actualSequence[0].viewType.nestedResource.length).toBeGreaterThan(0)
          },
          complete: done
        });

    });

  })

  describe('.pipeFields()', () => {

    it('should return correct fields of manifestation singleton', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.fieldsOfManifestationSingleton, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

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
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0].length).toEqual(7)
          },
          null,
          done);

    });

    it('should return fields of presence', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.modelOfPresence, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_84_PRESENCE.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0].length).toEqual(3)
          },
          null,
          done);

    });

    it('should return fields of birth', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv
        (
          ontomeProfileMockToGvPositiveSchema(PROFILE_12_BIOGRAPHICAL_BA_2022_01_14, ProProjectMock.PROJECT_1.pk_entity),
          PK_DEFAULT_CONFIG_PROJECT
        )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_61_BIRTH.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(actualSequence)
            expect(actualSequence[0].length).toEqual(3)
          },
          null,
          done);

    });

    it('nested fields should be of type entityPreview, not nestedResource', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv
        (
          ontomeProfileMockToGvPositiveSchema(PROFILE_12_BIOGRAPHICAL_BA_2022_01_14, ProProjectMock.PROJECT_1.pk_entity),
          PK_DEFAULT_CONFIG_PROJECT
        )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_61_BIRTH.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(actualSequence)
            const stemsFromField = actualSequence[0].find(f => f.property.fkProperty === 1435) // stems from
            const targetUnion = stemsFromField.targets[633] // union
            const broughtIntoLifeField = targetUnion.viewType.nestedResource.find(sf => sf.page.property.fkProperty === 1435) // brought into life (stems from)
            const targetBirth: GvSubentityFieldTargetViewType = broughtIntoLifeField.targets[61] // birth
            expect(targetBirth.entityPreview).not.toBeUndefined()
          },
          null,
          done);

    });
  })

  describe('.pipeAllSections()', () => {
    it('should return correct fields of Appellation for language', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv({
        sys: {
          config: [{
            classes: {}, specialFields: {
              outgoingProperties: {
                1111: { viewSections: { specific: { position: 1 } } }, // is appellation for language of
                1762: { viewSections: { specific: { position: 2 } } }, // has definition
                4: { viewSections: { specific: { position: 3 } } }, // has time-span
              }
            }
          }]
        },
      }, PK_DEFAULT_CONFIG_PROJECT)
      // using pipe
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_365_NAMING.dfh_pk_class, DisplayType.view)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            const fs = actualSequence[0];

            expect(fs[0].label).toEqual('is appellation for language of')
            expect(fs[0].display.viewSections.specific.position).toEqual(1)
            expect(fs[1].label).toEqual('has definition')
            expect(fs[2].label).toEqual('has time-span')
            expect(fs[3].label).toEqual('refers to name')
          },
          null,
          done);

    });

    it('should mark the field Person->AppeTeEn->Person as circular', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      // using pipe
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_21_PERSON.dfh_pk_class, DisplayType.view)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(actualSequence)
            const fs = actualSequence[0];
            expect(fs[0].property.fkProperty).toEqual(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property)
            expect(fs[0].targets[DfhApiClassMock.EN_365_NAMING.dfh_pk_class].viewType.nestedResource[2].page.isCircular).toEqual(true)
          },
          null,
          done);
    });
    it('should mark the field Person->AppeTeEn->Appe as not circular', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      // using pipe
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_21_PERSON.dfh_pk_class, DisplayType.view)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(JSON.stringify(actualSequence))
            const fs = actualSequence[0];
            expect(fs[0].property.fkProperty).toEqual(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property)
            expect(fs[0].targets[DfhApiClassMock.EN_365_NAMING.dfh_pk_class].viewType.nestedResource[3].page.isCircular).toEqual(false)
          },
          null,
          done);
    });
    it('should return correct fields of manifestation singleton', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.fieldsOfManifestationSingleton, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class, DisplayType.view)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            const fs = actualSequence[0];
            // expect(fs[0].display.formSections.basic.position).toEqual(1)
            /*>> maybe the position is not 1: if there is a property with pos 1 but this class does not have it*/
            expect(fs[0].label)
              .toEqual('has short title')
            expect(fs[1].label)
              .toEqual('has appellation for language')
            expect(fs[2].label)
              .toEqual('has definition')
            expect(fs[3].label)
              .toEqual('has manifestation singleton type')
            expect(fs[4].label)
              .toEqual('is representative manifestation singleton for')
            expect(fs[5].label)
              .toEqual('[inverse property label missing for 992]')
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
      schemaObjService.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)


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
      schemaObjService.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)


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

  describe('.pipeSection()', () => {
    it('should return section: form - basic', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(
        ontomeProfileMockToGvPositiveSchema(PROFILE_5_GEOVISTORY_BASI_2022_01_14, ProProjectMock.PROJECT_1.pk_entity),
        PK_DEFAULT_CONFIG_PROJECT
      )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)


      service.pipeSection(84, DisplayType.form, SectionName.basic).pipe(first())
        .subscribe(
          result => {
            expect(result.length).toBeGreaterThan(0);
          },
          null,
          done
        )
    })

    it('should return section: form - metadata', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_14, PROFILE_32_LINKED_IDENTIFI_2021_07_23],
          sysConf: {
            classes: {},
            specialFields: {
              incomingProperties: {
                1782: {
                  formSections: { metadata: { position: 1 } }
                }
              }
            },
            addProperty: [
              {
                isOutgoing: false,
                wherePkProperty: 1782,
                toSourceClass: {
                  wherePkClassIn: [21]
                }
              }
            ]
          },
          p: ProProjectMock.PROJECT_1.pk_entity
        }),
        PK_DEFAULT_CONFIG_PROJECT
      )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.form, SectionName.metadata).pipe(first())
        .subscribe(
          result => {
            expect(result.length).toBeGreaterThan(0);
          },
          null,
          done
        )
    })

    it('should return section: form - specific', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_12_BIOGRAPHICAL_BA_2022_01_14, PROFILE_32_LINKED_IDENTIFI_2021_07_23],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        }),
        PK_DEFAULT_CONFIG_PROJECT
      )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.form, SectionName.specific).pipe(first())
        .subscribe(
          result => {
            expect(result.length).toBeGreaterThan(0);
          },
          null,
          done
        )
    })

    it('should return section: form - hidden property', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_12_BIOGRAPHICAL_BA_2022_01_14, PROFILE_32_LINKED_IDENTIFI_2021_07_23],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        }),
        PK_DEFAULT_CONFIG_PROJECT
      )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.form, SectionName.metadata).pipe(first())
        .subscribe(
          result => {
            // console.log(result)
            expect(result.length).toEqual(0);
          },
          null,
          done
        )
    })

    it('should return section: view - basic', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_14, PROFILE_32_LINKED_IDENTIFI_2021_07_23],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        }),
        PK_DEFAULT_CONFIG_PROJECT
      )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.view, SectionName.basic).pipe(first())
        .subscribe(
          result => {
            expect(result.length).toBeGreaterThan(0);
          },
          null,
          done
        )
    })

    it('should return section: view - metadata', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_32_LINKED_IDENTIFI_2021_07_23],
          sysConf: {
            classes: {}, specialFields: {
              bySourceClass: {
                21: {
                  "incomingProperties": {
                    "1782": {
                      "comment": "has identification",
                      "viewSections": {
                        "metadata": {
                          "position": 1
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          p: ProProjectMock.PROJECT_1.pk_entity
        }),
        PK_DEFAULT_CONFIG_PROJECT
      )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.view, SectionName.metadata).pipe(first())
        .subscribe(
          result => {
            expect(result.length).toBeGreaterThan(0);
          },
          null,
          done
        )
    })

    it('should return section: view - specific', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_12_BIOGRAPHICAL_BA_2022_01_14, PROFILE_32_LINKED_IDENTIFI_2021_07_23],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        }),
        PK_DEFAULT_CONFIG_PROJECT
      )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.view, SectionName.specific).pipe(first())
        .subscribe(
          result => { expect(result.length).toBeGreaterThan(0); },
          null,
          done
        )
    })
  })

  describe('.pipeAllSections()', () => {
    it('should return all section: view', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_14, PROFILE_32_LINKED_IDENTIFI_2021_07_23],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        }),
        PK_DEFAULT_CONFIG_PROJECT
      )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeAllSections(68, DisplayType.view).pipe(first())
        .subscribe(
          result => {
            // console.log(result)
            expect(result.length).toEqual(3);
          },
          null,
          done
        )
    })



  });

  describe('.pipePropertiesToSubfields()', () => {
    it('should return subfield that is removed from api', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjService.storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_14],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        }),
        PK_DEFAULT_CONFIG_PROJECT
      )
      schemaObjService.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      const property = transformDfhApiPropertyToDfhProperty(PROFILE_5_GEOVISTORY_BASI_2022_01_14.properties[0])
      property.profiles[0].removed_from_api = true
      service.pipePropertiesToSubfields(
        [property],
        true, // is outgoing
        [5] // enabled profile
      ).pipe(first())
        .subscribe(
          result => {
            // console.log(result)
            expect(result[0].removedFromAllProfiles).toEqual(true);
          },
          null,
          done
        )
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
})
