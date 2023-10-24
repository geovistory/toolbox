import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GvPositiveSchemaObject, SdkLb4Module, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { GvFieldPageReqMock } from 'projects/__test__/data/auto-gen/api-requests/GvFieldPageReq';
import { FieldPageMock } from 'projects/__test__/data/FieldPageMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { MockPaginatedStatementsControllerService } from 'projects/__test__/mock-services/MockPaginatedStatementsControllerService';
import { firstValueFrom } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { schemaModifierActions } from '../../data/data.actions';
import { StateFacade } from '../../state.facade';
import { IAppState } from '../../state.model';
import { StateModule } from '../../state.module';
import { FieldPage } from '../configuration/models/FieldPage';
import { InformationPipesService } from './information-pipes.service';

describe('InformationPipesService', () => {
  let store: Store<IAppState>;
  let service: InformationPipesService;
  let facade: StateFacade;

  const storeSchemaObjectGv = (positive: GvPositiveSchemaObject, projectId: number) => {
    store.dispatch(schemaModifierActions.succeeded({ payload: { positive } }))
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
    facade = TestBed.inject(StateFacade);
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
      facade.setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.appeTeEnRefersToName
      facade.data.loadFieldPage([req])

      // using pipe
      const actual = await firstValueFrom(service.pipeFieldPage(req.page, req.targets, false))

      // testing pipe
      const expected: FieldPage = FieldPageMock.appeTeEnHasAppe
      expect(actual).toEqual(expected)
    });
    it('should return subfield page for subfieldType place', (done) => {
      // seeding data
      facade.setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.madridsPresenceWasAtPlace
      facade.data.loadFieldPage([req])

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
      facade.setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.journyeHasDuration
      facade.data.loadFieldPage([req])

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
      facade.setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.manifSingletonHasShortTitleMurderer
      facade.data.loadFieldPage([req])

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
      facade.setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.appeTeEnUsedInLanguage
      facade.data.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

      // testing pipe
      const expectedSequence: FieldPage[] = [FieldPageMock.appeTeEnUsedInLanguage]
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
      facade.setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.shipVoyageAtSomeTimeWithin
      facade.data.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

      // testing pipe
      const expectedSequence: FieldPage[] = [FieldPageMock.shipVoyageAtSomeTimeWithin]
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
      facade.setState(IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.person1HasAppeTeEn
      facade.data.loadFieldPage([req])
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
    facade.setState(IAppStateMock.stateProject1)
    const req = GvFieldPageReqMock.appeTeEnRefersToName
    facade.data.loadFieldPage([req])

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
