import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { GvSchemaActions, IAppState, SchemaService } from '@kleiolab/lib-redux';
import { SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { moduleImports } from 'projects/lib-queries/src/__tests__/helpers/module-imports';
import { setAppState } from 'projects/lib-queries/src/__tests__/helpers/set-app-state';
import { GvFieldPageReqMock } from 'projects/__test__/data/auto-gen/api-requests/GvFieldPageReq';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { SubfieldPageMock } from 'projects/__test__/data/SubfieldPageMock';
import { MockPaginatedStatementsControllerService } from 'projects/__test__/mock-services/MockPaginatedStatementsControllerService';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { equals } from 'ramda';
import { Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil, toArray } from 'rxjs/operators';
import { SubfieldPage } from '../models/StatementWithTarget';
import { InformationPipesService } from './information-pipes.service';

describe('InformationPipesService', () => {
  let ngRedux: NgRedux<IAppState>;
  let service: InformationPipesService;
  let schemaActions: GvSchemaActions;
  let schemaService: SchemaService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports,
      providers: [
        { provide: SubfieldPageControllerService, useClass: MockPaginatedStatementsControllerService }
      ]
    });
    service = TestBed.get(InformationPipesService);
    schemaActions = TestBed.get(GvSchemaActions);
    schemaService = TestBed.get(SchemaService);
    ngRedux = TestBed.get(NgRedux);
  });


  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })

  describe('.pipeFieldPage()', () => {
    it('should return subfield page for subfieldType appellation', async (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.appeTeEnRefersToName
      schemaActions.loadGvPaginationObject(req)

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets)

      // testing pipe
      const expectedSequence: SubfieldPage[] = [SubfieldPageMock.appeTeEnHasAppe]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });
    it('should return subfield page for subfieldType place', async (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.madridsPresenceWasAtPlace
      schemaActions.loadGvPaginationObject(req)

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets)

      // testing pipe
      const expectedSequence: SubfieldPage[] = [SubfieldPageMock.madridsPresenceWasAtPlace]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });
    it('should return subfield page for subfieldType dimension', async (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.journyeHasDuration
      schemaActions.loadGvPaginationObject(req)

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets)

      // testing pipe
      const expectedSequence: SubfieldPage[] = [SubfieldPageMock.journyeHasDuration]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });

    it('should return subfield page for subfieldType langString', async (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.manifSingletonHasShortTitleMurderer
      schemaActions.loadGvPaginationObject(req)

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets)

      // testing pipe
      const expectedSequence: SubfieldPage[] = [SubfieldPageMock.manifSingletonHasShortTitleMurderer]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });

    it('should return subfield page for subfieldType language', async (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.appeTeEnUsedInLanguage
      schemaActions.loadGvPaginationObject(req)

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets)

      // testing pipe
      const expectedSequence: SubfieldPage[] = [SubfieldPageMock.appeTeEnUsedInLanguage]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });
    it('should return subfield page for subfieldType timePrimitive', async (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.shipVoyageAtSomeTimeWithin
      schemaActions.loadGvPaginationObject(req)

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets)

      // testing pipe
      const expectedSequence: SubfieldPage[] = [SubfieldPageMock.shipVoyageAtSomeTimeWithin]
      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });

    it('should return subfield page for subfieldType temporalEntity', async (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.person1HasAppeTeEn
      schemaActions.loadGvPaginationObject(req)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.project1, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, 0)


      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets)

      // testing pipe
      const expectedSequence: SubfieldPage[] = [SubfieldPageMock.person1HasAppeTeEn]

      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });

    it('should not emit more than once after paginating forth and back for subfieldType temporalEntity', async (done) => {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({
        imports: moduleImports,
        providers: [
          // inject other mock service
          { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes }
        ]
      });
      service = TestBed.get(InformationPipesService);
      schemaActions = TestBed.get(GvSchemaActions);
      schemaService = TestBed.get(SchemaService);
      ngRedux = TestBed.get(NgRedux);

      // seeding basic data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.project1, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, 0)
      const pages = [
        { limit: 2, offset: 0 },
        { limit: 2, offset: 2 },
        { limit: 2, offset: 0 },
      ]
      const pipePage = (i = 0) => {
        if (i >= pages.length) return done()

        // get page 0-5
        const req = {
          ...GvFieldPageReqMock.person1HasAppeTeEn,
          page: {
            ...GvFieldPageReqMock.person1HasAppeTeEn.page,
            ...pages[i]
          }
        }
        schemaActions.loadGvPaginationObject(req)

        // using pipe
        const q$ = service.pipeFieldPage(req.page, req.targets).pipe(
          distinctUntilChanged((a, b) => {
            // console.log('a', JSON.stringify(a))
            // console.log('b', JSON.stringify(b))
            return equals(a, b)
          }),
        )

        // testing number of events happening within 100ms
        const expectedSequence: SubfieldPage[] = [SubfieldPageMock.person1HasAppeTeEn]
        const t$ = new Subject()
        setTimeout(() => t$.next(), 300)
        q$.pipe(
          takeUntil(t$),
          toArray(),
        )
          .subscribe(
            actualSequence => {
              // console.log(JSON.stringify(pages[i]), actualSequence.length)
              expect(actualSequence.length).toEqual(1)
            },
            null,
            () => pipePage(i + 1));

      }

      pipePage()
    });


    it('should return subfield page for subfieldType timeSpan', async (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.shipVoyageHasTimeSpan
      schemaActions.loadGvPaginationObject(req)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.modelOfShipVoyage, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.project1, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, 0)


      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets)

      // testing pipe
      const expectedSequence: SubfieldPage[] = [SubfieldPageMock.shipVoyageHasTimeSpan]

      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });


  })

  it('should return subfield page for subfieldType entityPreview', async (done) => {
    // seeding data
    setAppState(ngRedux, IAppStateMock.stateProject1)
    const req = GvFieldPageReqMock.appeTeEnRefersToName
    schemaActions.loadGvPaginationObject(req)

    // using pipe
    const q$ = service.pipeFieldPage(req.page, req.targets)

    // testing pipe
    const expectedSequence: SubfieldPage[] = [SubfieldPageMock.appeTeEnHasAppe]
    q$.pipe(take(1), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence).toEqual(expectedSequence)
        },
        null,
        done);
  });


});