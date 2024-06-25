import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GvPositiveSchemaObject, SdkLb4Module, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { FieldPageMock } from '../../_helpers/data/FieldPageMock';
import { GvSchemaObjectMock } from '../../_helpers/data/GvSchemaObjectMock';
import { IAppStateMock } from '../../_helpers/data/IAppStateMock';
import { GvFieldPageReqMock } from '../../_helpers/data/auto-gen/api-requests/GvFieldPageReq';
import { MockPaginatedStatementsControllerService } from '../../_helpers/mock-services/MockPaginatedStatementsControllerService';
import { schemaModifierActions, setDataState } from '../../redux-store/data/data.actions';
import { DataFacade } from '../../redux-store/data/data.facade';
import { IAppState } from '../../redux-store/state.model';
import { StateModule } from '../../redux-store/state.module';
import { setUiState } from '../../redux-store/ui/ui.actions';

import { InfLanguageMock } from '../../_helpers/data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from '../../_helpers/data/auto-gen/gvDB/InfResourceMock';
import { ProInfoProjRelMock } from '../../_helpers/data/auto-gen/gvDB/ProInfoProjRelMock';
import { ProProjectMock } from '../../_helpers/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from '../../_helpers/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from '../../_helpers/data/auto-gen/gvDB/WarEntityPreviewMock';
import { OntomeProfileMock } from '../../_helpers/data/auto-gen/gvDB/local-model.helpers';
import { PROFILE_5_CLASSES, PROFILE_5_PROPERTIES } from '../../_helpers/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { createCrmAsGvPositiveSchema } from '../../_helpers/transformers';
import { FieldPage } from '../configuration/models/FieldPage';
import { InformationPipesService } from './information-pipes.service';
import { ClassAndTypeNode } from './models/ClassAndTypeNode';

describe('InformationPipesService', () => {
  let store: Store<IAppState>;
  let service: InformationPipesService;
  let facade: DataFacade;

  const storeSchemaObjectGv = (positive: GvPositiveSchemaObject) => {
    store.dispatch(schemaModifierActions.succeeded({ payload: { positive } }))
  }
  const setState = (state: IAppState) => {
    store.dispatch(setUiState({ ui: state.ui }));
    store.dispatch(setDataState({ data: state.data }));
  }

  beforeEach(() => {
    @NgModule({
      providers: [
        InformationPipesService,
        { provide: SubfieldPageControllerService, useClass: MockPaginatedStatementsControllerService }
      ]
    })
    class InformationPipesModule { }

    @NgModule({
      imports: [
        InformationPipesModule,
        SdkLb4Module,
        StateModule,
        HttpClientModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    service = TestBed.inject(InformationPipesService);
    facade = TestBed.inject(DataFacade);
    store = TestBed.inject(Store);
  });


  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })

  describe('.pipeFieldPage()', () => {
    it('should return subfield page for subfieldType appellation', async () => {
      // seeding data
      setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.appeTeEnRefersToName
      facade.loadFieldPage([req])

      // using pipe
      const actual = await firstValueFrom(service.pipeFieldPage(req.page, req.targets, false))

      // testing pipe
      const expected: FieldPage = FieldPageMock.appeTeEnHasAppe
      expect(actual).toEqual(expected)
    });
    it('should return subfield page for subfieldType place', (done) => {
      // seeding data
      setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.madridsPresenceWasAtPlace
      facade.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

      // testing pipe
      const expectedSequence: FieldPage[] = [FieldPageMock.madridsPresenceWasAtPlace]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });
    it('should return subfield page for subfieldType dimension', (done) => {
      // seeding data
      setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.journyeHasDuration
      facade.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

      // testing pipe
      const expectedSequence: FieldPage[] = [FieldPageMock.journyeHasDuration]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });

    it('should return subfield page for subfieldType langString', (done) => {
      // seeding data
      setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.manifSingletonHasShortTitleMurderer
      facade.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

      // testing pipe
      const expectedSequence: FieldPage[] = [FieldPageMock.manifSingletonHasShortTitleMurderer]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });

    it('should return subfield page for subfieldType language', (done) => {
      // seeding data
      setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.appeTeEnUsedInLanguage
      facade.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

      // testing pipe
      const expectedSequence: FieldPage[] = [FieldPageMock.appeTeEnUsedInLanguageFieldPage]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });
    it('should return subfield page for subfieldType timePrimitive', (done) => {
      // seeding data
      setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.shipVoyageAtSomeTimeWithin
      facade.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

      // testing pipe
      const expectedSequence: FieldPage[] = [FieldPageMock.shipVoyageAtSomeTimeWithinFielPage]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });

    it('should return subfield page for subfieldType temporalEntity', (done) => {
      // seeding data
      setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.person1HasAppeTeEn
      facade.loadFieldPage([req])
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties)
      storeSchemaObjectGv(GvSchemaObjectMock.project1)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig)


      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

      // testing pipe
      const expectedSequence: FieldPage[] = [FieldPageMock.person1HasAppeTeEn]

      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });

  })

  it('should return subfield page for subfieldType entityPreview', (done) => {
    // seeding data
    setState(IAppStateMock.stateProject1)
    const req = GvFieldPageReqMock.appeTeEnRefersToName
    facade.loadFieldPage([req])

    // using pipe
    const q$ = service.pipeFieldPage(req.page, req.targets, false)

    // testing pipe
    const expectedSequence: FieldPage[] = [FieldPageMock.appeTeEnHasAppe]
    q$.pipe(take(1), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence).toEqual(expectedSequence)
        },
        null,
        done);
  });


  describe('.pipeClassesAndTypesOfClasses()', () => {
    it('should return array of ClassAndTypeNode', async () => {
      setState(IAppStateMock.stateProject1)
      const mockSchema: OntomeProfileMock = {
        profile: {
          removed_from_api: false,
          requested_language: 'en',
          dfh_pk_profile: 5,
          dfh_profile_label: "Geovistory Basics",
          dfh_project_label: "Geovistory",
          dfh_owned_by_project: 6,
          dfh_profile_definition: "This profile includes classes and properties that are directly implemented in the Geovistory virtual search environment or that represent the foundation of its functionalities. They are always present in the information system.",
          dfh_project_label_language: "en",
          dfh_profile_label_language: "en",
          dfh_profile_definition_language: "en",
          dfh_is_ongoing_forced_publication: true,
          dfh_is_root_profile: false,
          dfh_fk_root_profile: 52
        },
        classes: [
          PROFILE_5_CLASSES.EN_363_GEOGRAPHICAL_PLACE,
          PROFILE_5_CLASSES.EN_364_GEOGRAPHICAL_PLACE_TYPE,
        ],
        properties: [
          PROFILE_5_PROPERTIES.EN_363_1110_364_HAS_GEOGRAPHICAL_PLACE_TYPE,
        ]
      }

      const positive = createCrmAsGvPositiveSchema({
        ontoMocks: [mockSchema],
        sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
        p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
      })
      // seeding ontology
      storeSchemaObjectGv(positive)
      // seeding project basics
      storeSchemaObjectGv({
        pro: { project: [ProProjectMock.PROJECT_1] },
        inf: { language: [InfLanguageMock.GERMAN] }
      })
      // seeding type
      storeSchemaObjectGv({
        inf: { resource: [InfResourceMock.GEO_PLACE_TYPE_CITY] },
        pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_CITY_TYPE] },
        war: { entity_preview: [WarEntityPreviewMock.GEO_PLACE_TYPE_CITY] }
      })
      // using pipe
      const actual = await firstValueFrom(service.pipeClassesAndTypesOfClasses([363]))

      // testing pipe
      const expected: ClassAndTypeNode[] = [
        {
          label: "Geographical Place",
          data: {
            pkClass: 363,
            pkHasTypeProperty: 1110,
            pkType: null,
          },
          children: [
            {
              label: "City",
              data: {
                pkClass: 363,
                pkHasTypeProperty: 1110,
                pkType: 2003,
              },
            },
          ],
        },
      ]
      expect(actual).toEqual(expected)
    });


  })

});
