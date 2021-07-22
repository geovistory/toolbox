import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState, SchemaService } from '@kleiolab/lib-redux';
import { GvFieldTargetViewType, GvPositiveSchemaObject, SysConfigFormCtrlType } from '@kleiolab/lib-sdk-lb4';
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
import { combineLatest } from 'rxjs';
import { first, map, take, toArray } from 'rxjs/operators';
import { Field } from '../models/Field';
import { Subfield } from '../models/Subfield';
import { ConfigurationPipesService, DisplayType, SectionName } from './configuration-pipes.service';

describe('ConfigurationPipeService', () => {
  let ngRedux: NgRedux<IAppState>;
  let service: ConfigurationPipesService;
  let schemaObjServcie: SchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports,
    });
    service = TestBed.inject(ConfigurationPipesService);
    schemaObjServcie = TestBed.inject(SchemaService);
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
      schemaObjServcie.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)

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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

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
  describe('.pipeTargetTypesOfClass()', () => {
    it('should return correct target types for EN_784_SHORT_TITLE', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)

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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.classGeographicalPlaceType, PK_DEFAULT_CONFIG_PROJECT)

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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.classGeographicalPlace, PK_DEFAULT_CONFIG_PROJECT)

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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.modelOfBirth, PK_DEFAULT_CONFIG_PROJECT)

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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.modelOfBirth, PK_DEFAULT_CONFIG_PROJECT)

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
            expect(actualSequence[0].length).toEqual(7)
          },
          null,
          done);

    });

    it('should return fields of presence', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.modelOfPresence, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.modelOfBirth, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_61_BIRTH.dfh_pk_class)

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
  })

  describe('.pipeAllSections()', () => {
    it('should return correct fields of Appellation for language', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)
      // using pipe
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_365_NAMING.dfh_pk_class, DisplayType.view)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(JSON.stringify(actualSequence))
            const fs = actualSequence[0];

            expect(fs[0].label).toEqual('has definition')
            expect(fs[0].display.formSections.basic.position).toEqual(4)
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
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_21_PERSON.dfh_pk_class, DisplayType.view)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(JSON.stringify(actualSequence))
            const fs = actualSequence[0];
            expect(fs[0].property.fkProperty).toEqual(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property)
            expect(fs[0].targets[DfhApiClassMock.EN_365_NAMING.dfh_pk_class].viewType.nestedResource[0].page.isCircular).toEqual(true)
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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.fieldsOfManifestationSingleton, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.project1, PK_DEFAULT_CONFIG_PROJECT)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class, DisplayType.view)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(JSON.stringify(actualSequence))
            const fs = actualSequence[0];

            expect(fs[0].display.formSections.basic.position).toEqual(1)
            expect(fs[0].label).toEqual('has short title')
            expect(fs[1].label).toEqual('has appellation for language')
            expect(fs[2].label).toEqual('has manifestation singleton type')
            expect(fs[3].label).toEqual('has definition')
            expect(fs[4].label).toEqual('is representative manifestation singleton for')
            expect(fs[5].label).toEqual('[inverse property label missing for 992]')
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

  describe('.pipeSection()', () => {
    it('should return section: form - basic', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.form, SectionName.basic).pipe(first())
        .subscribe(
          result => { expect(result.length).toBeGreaterThan(0); },
          null,
          done
        )
    })

    it('should return section: form - metadata', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.form, SectionName.basic).pipe(first())
        .subscribe(
          result => { expect(result.length).toBeGreaterThan(0); },
          null,
          done
        )
    })

    it('should return section: form - specific', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.form, SectionName.basic).pipe(first())
        .subscribe(
          result => { expect(result.length).toBeGreaterThan(0); },
          null,
          done
        )
    })

    it('should return section: view - basic', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.view, SectionName.basic).pipe(first())
        .subscribe(
          result => { expect(result.length).toBeGreaterThan(0); },
          null,
          done
        )
    })

    it('should return section: view - metadata', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.view, SectionName.basic).pipe(first())
        .subscribe(
          result => { expect(result.length).toBeGreaterThan(0); },
          null,
          done
        )
    })

    it('should return section: view - specific', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeSection(21, DisplayType.view, SectionName.basic).pipe(first())
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
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      combineLatest([
        service.pipeSection(21, DisplayType.view, SectionName.basic),
        service.pipeSection(21, DisplayType.view, SectionName.metadata),
        service.pipeSection(21, DisplayType.view, SectionName.specific),
        service.pipeAllSections(21, DisplayType.view),
      ]).pipe(map(([basics, metadatas, specifics, alls]) => {
        expect(basics.length + metadatas.length + specifics.length).toEqual(alls.length);
      }))
    })

    fit('should return all section: view 2', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, PK_DEFAULT_CONFIG_PROJECT)

      service.pipeAllSections(21, DisplayType.view)
        .pipe(first())
        .subscribe({
          next: actualSequence => {
            expect(actualSequence?.length).toEqual(4)
          },
          complete: done
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
})
