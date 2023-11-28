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

import { FieldPage } from '../configuration/models/FieldPage';
import { InformationPipesService } from './information-pipes.service';

describe('InformationPipesService', () => {
  let store: Store<IAppState>;
  let service: InformationPipesService;
  let facade: DataFacade;

  const storeSchemaObjectGv = (positive: GvPositiveSchemaObject, projectId: number) => {
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
      storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, 0)
      storeSchemaObjectGv(GvSchemaObjectMock.project1, 0)
      storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, 0)


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


});
