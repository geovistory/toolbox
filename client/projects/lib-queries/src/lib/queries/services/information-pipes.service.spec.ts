import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState, ReduxMainService, SchemaService } from '@kleiolab/lib-redux';
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
  let dataService: ReduxMainService;
  let schemaService: SchemaService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports,
      providers: [
        { provide: SubfieldPageControllerService, useClass: MockPaginatedStatementsControllerService }
      ]
    });
    service = TestBed.inject(InformationPipesService);
    dataService = TestBed.inject(ReduxMainService);
    schemaService = TestBed.inject(SchemaService);
    ngRedux = TestBed.inject(NgRedux);
  });


  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })

  describe('.pipeFieldPage()', () => {
    it('should return subfield page for subfieldType appellation', (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.appeTeEnRefersToName
      dataService.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

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
    it('should return subfield page for subfieldType place', (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.madridsPresenceWasAtPlace
      dataService.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

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
    it('should return subfield page for subfieldType dimension', (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.journyeHasDuration
      dataService.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

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

    it('should return subfield page for subfieldType langString', (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.manifSingletonHasShortTitleMurderer
      dataService.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

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

    it('should return subfield page for subfieldType language', (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.appeTeEnUsedInLanguage
      dataService.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

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
    it('should return subfield page for subfieldType timePrimitive', (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.shipVoyageAtSomeTimeWithin
      dataService.loadFieldPage([req])

      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

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

    it('should return subfield page for subfieldType temporalEntity', (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.person1HasAppeTeEn
      dataService.loadFieldPage([req])
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.project1, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, 0)


      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, false)

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

    it('should not emit more than once after paginating forth and back for subfieldType temporalEntity', (done) => {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({
        imports: moduleImports,
        providers: [
          // inject other mock service
          { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes }
        ]
      });
      service = TestBed.inject(InformationPipesService);
      dataService = TestBed.inject(ReduxMainService);
      schemaService = TestBed.inject(SchemaService);
      ngRedux = TestBed.inject(NgRedux);

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
        dataService.loadFieldPage([req])

        // using pipe
        const q$ = service.pipeFieldPage(req.page, req.targets, false).pipe(
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


    xit('should return subfield page for subfieldType timeSpan', (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvFieldPageReqMock.shipVoyageHasTimeSpan
      dataService.loadFieldPage([req])
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.modelOfShipVoyage, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.project1, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, 0)


      // using pipe
      const q$ = service.pipeFieldPage(req.page, req.targets, true)

      // testing pipe
      // const expectedSequence: SubfieldPage[] = [SubfieldPageMock.shipVoyageHasTimeSpan]

      // q$.pipe(take(1), toArray())
      //   .subscribe(
      //     actualSequence => {
      //       expect(actualSequence).toEqual(expectedSequence)
      //     },
      //     null,
      //     done);
    });


  })

  it('should return subfield page for subfieldType entityPreview', (done) => {
    // seeding data
    setAppState(ngRedux, IAppStateMock.stateProject1)
    const req = GvFieldPageReqMock.appeTeEnRefersToName
    dataService.loadFieldPage([req])

    // using pipe
    const q$ = service.pipeFieldPage(req.page, req.targets, false)

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
