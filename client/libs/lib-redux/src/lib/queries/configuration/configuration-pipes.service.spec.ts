import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GvFieldTargetViewType, GvPositiveSchemaObject, SdkLb4Module, SysConfigFormCtrlType } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { first, toArray } from 'rxjs/operators';
import { createCrmAsGvPositiveSchema, ontomeProfileMockToGvPositiveSchema, transformDfhApiClassToDfhClass, transformDfhApiClassToDfhLabel, transformDfhApiPropertyToDfhProperty } from '../../_helpers/transformers';
import { schemaModifierActions } from '../../redux-store/data/data.actions';
import { StateFacade } from '../../redux-store/state.facade';
import { IAppState } from '../../redux-store/state.model';
import { StateModule } from '../../redux-store/state.module';
import { ConfigurationPipesService } from './configuration-pipes.service';
import { DisplayType } from "./models/DisplayType";
import { SectionName } from "./models/SectionName";
import { IAppStateMock } from '../../_helpers/data/IAppStateMock';
import { ProClassFieldConfigMock } from '../../_helpers/data/auto-gen/gvDB/ProClassFieldConfigMock';
import { DfhApiClassMock } from '../../_helpers/data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from '../../_helpers/data/auto-gen/gvDB/DfhApiPropertyMock';
import { ProProjectMock } from '../../_helpers/data/auto-gen/gvDB/ProProjectMock';
import { DfhApiClass } from '../../_helpers/data/auto-gen/gvDB/local-model.helpers';

import { GvSchemaObjectMock } from '../../_helpers/data/GvSchemaObjectMock';
import { ProDfhProfileProjRelMock } from '../../_helpers/data/auto-gen/gvDB/ProDfhProfileProjRelMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_02_09 } from '../../_helpers/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from '../../_helpers/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_32_IDENTIFIERS_2022_02_09 } from '../../_helpers/data/auto-gen/ontome-profiles/profile-32-identifiers-2022-02-09';
import { SysConfigValueMock } from '../../_helpers/data/auto-gen/gvDB/SysConfigValueMock';

describe('ConfigurationPipeService', () => {
  let service: ConfigurationPipesService;
  let facade: StateFacade;
  let store: Store<IAppState>;

  const storeSchemaObjectGv = (positive: GvPositiveSchemaObject) => {
    store.dispatch(schemaModifierActions.succeeded({ payload: { positive } }))
  }

  beforeEach(() => {
    @NgModule({
      providers: [ConfigurationPipesService]
    })
    class ConfigurationPipesModule { }

    @NgModule({
      imports: [
        ConfigurationPipesModule,
        SdkLb4Module,
        StateModule,
        HttpClientModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    service = TestBed.inject(ConfigurationPipesService);
    facade = TestBed.inject(StateFacade);
    store = TestBed.inject(Store);
  });

  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })

  describe('.pipeProfilesEnabledByProject()', () => {
    it('should return two custom profiles + basic profile (id:5)', async () => {
      facade.setState(IAppStateMock.stateProject1)
      facade.data.sys.config.loadSucceeded([{ classes: {}, specialFields: {}, ontome: { requiredOntomeProfiles: [5] } }], '')
      // seeding data
      const gvSchemaObj: GvPositiveSchemaObject = {
        pro: {
          dfh_profile_proj_rel: [
            ProDfhProfileProjRelMock.PROJ_1_PROFILE_12,
            ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
          ]
        }
      }

      storeSchemaObjectGv(gvSchemaObj)

      // using pipe
      const q$ = service.pipeProfilesEnabledByProject()

      // testing pipe
      const actualSequence = await firstValueFrom(q$)
      expect(actualSequence).toEqual([12, 4, 5])
    });



  })
  describe('.pipeClassFieldConfigs()', () => {
    it('should return class config for class C365_NAMING', (done) => {
      facade.setState(IAppStateMock.stateDefaultConfigProject)
      // seeding data
      const gvSchemaObj: GvPositiveSchemaObject = {
        pro: { class_field_config: [ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME] }
      }
      storeSchemaObjectGv(gvSchemaObj)

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
    it('should go through nested fields of stems from - union', async () => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        ontomeProfileMockToGvPositiveSchema(PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, ProProjectMock.PROJECT_1.pk_entity)
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)


      // using pipe
      const q$ = service.pipeNestedResource(
        DfhApiClassMock.EN_633_UNION.dfh_pk_class, DfhApiPropertyMock.EN_1435_STEMS_FROM.dfh_pk_property
      )

      const actualSequence = await firstValueFrom(q$.pipe(first()))
      expect(actualSequence).not.toBeUndefined();

    });
  })


  describe('.pipeFieldLabel()', () => {
    it('should return label for EN_1111_IS_APPE_OF', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)

      // using pipe
      const isOutgoing = true

      const q$ = service.pipeFieldLabel(
        DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_property_domain,
        isOutgoing,
        DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
      )

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0]).toEqual(DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_property_label)
          },
          null,
          done);

    });
    it('should return label for 1762_HAS_DEFINITION', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)

      // using pipe
      const isOutgoing = true
      const q$ = service.pipeFieldLabel(
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_domain,
        isOutgoing,
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_pk_property,
      )

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0]).toEqual(DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_label)
          },
          null,
          done);

    });
    it('should return inverse label for 1762_HAS_DEFINITION', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)

      // using pipe
      const isOutgoing = false
      const q$ = service.pipeFieldLabel(
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_range,
        isOutgoing,
        DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_pk_property,
      )

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
      pipeClassLabelTest(dfhClass, service, done);
    });
    it('should return label for EN_365_NAMING', (done) => {
      const dfhClass = DfhApiClassMock.EN_365_NAMING
      pipeClassLabelTest(dfhClass, service, done);
    });
    it('should return label for EN_785_TEXT', (done) => {
      const dfhClass = DfhApiClassMock.EN_785_TEXT
      pipeClassLabelTest(dfhClass, service, done);
    });
    it('should return label for EN_40_APPELLATION', (done) => {
      const dfhClass = DfhApiClassMock.EN_40_APPELLATION
      pipeClassLabelTest(dfhClass, service, done);
    });
  })
  describe('.pipeTargetTypesOfClass()', () => {
    it('should return correct target types for EN_784_SHORT_TITLE', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)

      // using pipe
      const q$ = service.pipeTargetTypesOfClass(
        DfhApiClassMock.EN_785_TEXT.dfh_pk_class,
        -1
      )

      // testing pipe
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

    it('should return typeItem/typeItem for EN_364_GEO_PLACE_TYPE', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)
      storeSchemaObjectGv(GvSchemaObjectMock.classGeographicalPlaceType)

      // using pipe
      const q$ = service.pipeTargetTypesOfClass(
        DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class,
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

    it('should return entityPreview/entity for EN_363_GEO_PLACE', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)
      storeSchemaObjectGv(GvSchemaObjectMock.classGeographicalPlace)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.modelOfBirth)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.modelOfBirth)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.fieldsOfManifestationSingleton)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class)


      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0].length).toEqual(6)
          },
          null,
          done);

    });


    it('should return fields of time span', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class)

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0].length).toEqual(7)
          },
          null,
          done);

    });

    it('should return fields of presence', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.modelOfPresence)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_84_PRESENCE.dfh_pk_class)

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence[0].length).toEqual(3)
          },
          null,
          done);

    });

    it('should return fields of birth', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        ontomeProfileMockToGvPositiveSchema(PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, ProProjectMock.PROJECT_1.pk_entity)
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_61_BIRTH.dfh_pk_class)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        ontomeProfileMockToGvPositiveSchema(PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, ProProjectMock.PROJECT_1.pk_entity)
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_61_BIRTH.dfh_pk_class)

      // testing pipe

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            // console.log(actualSequence)
            const stemsFromField = actualSequence[0].find(f => f.property.fkProperty === 1435) // stems from
            const targetUnion = stemsFromField.targets[633] // union
            const broughtIntoLifeField = targetUnion.viewType.nestedResource.find(sf => sf.page.property.fkProperty === 1435) // brought into life (stems from)
            const targetBirth: GvFieldTargetViewType = broughtIntoLifeField.targets[61] // birth
            expect(targetBirth.entityPreview).not.toBeUndefined()
          },
          null,
          done);

    });
  })

  describe('.pipeAllSections()', () => {
    it('should return correct fields of Appellation for language', async () => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv({
        sys: {
          config: [{
            ontome: { requiredOntomeProfiles: [5] },
            classes: {}, specialFields: {
              outgoingProperties: {
                1111: { viewSections: { specific: { position: 1 } } }, // is appellation for language of
                1762: { viewSections: { specific: { position: 2 } } }, // has definition
                4: { viewSections: { specific: { position: 3 } } }, // has time-span
              }
            }
          }]
        },
      })
      // using pipe
      const actualSequence = await firstValueFrom(service.pipeAllSections(DfhApiClassMock.EN_365_NAMING.dfh_pk_class, DisplayType.view))

      // testing pipe


      expect(actualSequence[0].label).toEqual('is appellation for language of')
      expect(actualSequence[0].display.viewSections.specific.position).toEqual(1)
      expect(actualSequence[1].label).toEqual('has definition')
      expect(actualSequence[2].label).toEqual('has time-span')
      expect(actualSequence[3].label).toEqual('refers to name')

    });

    it('should mark the field Person->AppeTeEn->Person as circular', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)
      // using pipe
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_21_PERSON.dfh_pk_class, DisplayType.view)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)
      // using pipe
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_21_PERSON.dfh_pk_class, DisplayType.view)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.fieldsOfManifestationSingleton)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)

      // using pipe
      const q$ = service.pipeAllSections(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class, DisplayType.view)

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
              .toEqual('[inverse property label missing for 992]')
            expect(fs[5].label)
              .toEqual('is representative manifestation singleton for')
          },
          null,
          done);

    });
  })

  describe('.pipeTypeClassesEnabledByProjectProfiles()', () => {
    it('should return one type class', async () => {
      facade.setState(IAppStateMock.stateProject1)
      facade.data.sys.config.loadSucceeded([{ classes: {}, specialFields: {} }], '')
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
      storeSchemaObjectGv(gvSchemaObj)


      // using pipe
      const q$ = service.pipeTypeClassesEnabledByProjectProfiles()
      const actualSequence = await firstValueFrom(q$)
      expect(actualSequence[0].dfhClass).toEqual(transformDfhApiClassToDfhClass(DfhApiClassMock.EN_364_GEO_PLACE_TYPE))

    });




  })

  describe('.pipeClassLabel()', () => {
    it('should return class label of Geographical Place', (done) => {
      facade.setState(IAppStateMock.stateProject1)
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
      storeSchemaObjectGv(gvSchemaObj)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)


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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        ontomeProfileMockToGvPositiveSchema(PROFILE_5_GEOVISTORY_BASI_2022_01_18, ProProjectMock.PROJECT_1.pk_entity)
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)


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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_32_IDENTIFIERS_2022_02_09],
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
        })
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_32_IDENTIFIERS_2022_02_09],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        })
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_32_IDENTIFIERS_2022_02_09],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        })
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)

      service.pipeSection(21, DisplayType.form, SectionName.metadata).pipe(first())
        .subscribe(
          result => {
            expect(result.length).toEqual(1);
          },
          null,
          done
        )
    })

    it('should return section: view - basic', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_32_IDENTIFIERS_2022_02_09],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        })
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_32_IDENTIFIERS_2022_02_09],
          sysConf: {
            classes: {}, specialFields: {
              bySourceClass: {
                21: {
                  'incomingProperties': {
                    '1782': {
                      'comment': 'has identification',
                      'viewSections': {
                        'metadata': {
                          'position': 1
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          p: ProProjectMock.PROJECT_1.pk_entity
        })
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_32_IDENTIFIERS_2022_02_09],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        })
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)

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
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_32_IDENTIFIERS_2022_02_09],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        })
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)

      service.pipeAllSections(68, DisplayType.view).pipe(first())
        .subscribe(
          result => {
            // console.log(result)
            expect(result.length).toEqual(5);
          },
          null,
          done
        )
    })



  });

  describe('.pipePropertiesToSubfields()', () => {
    it('should return subfield that is removed from api', (done) => {
      facade.setState(IAppStateMock.stateProject1)
      storeSchemaObjectGv(
        createCrmAsGvPositiveSchema({
          ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_18],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
          p: ProProjectMock.PROJECT_1.pk_entity
        })
      )
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      const property = transformDfhApiPropertyToDfhProperty(PROFILE_5_GEOVISTORY_BASI_2022_01_18.properties[0])
      property.profiles[0].removed_from_api = true
      service.pipePropertiesToSubfields(
        [property],
        true, // is outgoing
        [5], // enabled profile
        [] // platform vocabulary classes
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
    service: ConfigurationPipesService,
    done: jest.DoneCallback
  ) {
    facade.setState(IAppStateMock.stateProject1);
    storeSchemaObjectGv(GvSchemaObjectMock.project1);
    storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties);
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
