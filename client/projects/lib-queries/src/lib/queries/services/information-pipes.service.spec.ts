import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { GvSchemaActions, IAppState, SchemaService } from '@kleiolab/lib-redux';
import { PaginatedStatementsControllerService } from '@kleiolab/lib-sdk-lb4';
import { moduleImports } from 'projects/lib-queries/src/__tests__/helpers/module-imports';
import { setAppState } from 'projects/lib-queries/src/__tests__/helpers/set-app-state';
import { GvLoadSubfieldPageReqMock } from 'projects/__test__/data/GvLoadSubfieldPageReq';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { StatementWithTargetMock } from 'projects/__test__/data/StatementWithTargetMock';
import { MockPaginatedStatementsControllerService } from 'projects/__test__/mock-services/MockPaginatedStatementsControllerService';
import { take, toArray } from 'rxjs/operators';
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
        { provide: PaginatedStatementsControllerService, useClass: MockPaginatedStatementsControllerService }
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

  describe('.pipeSubfieldPage()', () => {
    it('should return subfield page for subfieldType appellation', async (done) => {
      // seeding data
      setAppState(ngRedux, IAppStateMock.stateProject1)
      const req = GvLoadSubfieldPageReqMock.appeTeEnHasAppeVt
      schemaActions.loadGvPaginationObject(req)

      // using pipe
      const q$ = service.pipeSubfieldPage(req.page, req.subfieldType)
      // // testing pipe

      const expectedSequence = [[StatementWithTargetMock.appeTeEnHasAppeVtWithTarget]]

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
      const req = GvLoadSubfieldPageReqMock.person1HasAppeTeEn
      schemaActions.loadGvPaginationObject(req)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.basicClassesAndProperties, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.project1, 0)
      schemaService.storeSchemaObjectGv(GvSchemaObjectMock.sysConfig, 0)


      // using pipe
      const q$ = service.pipeSubfieldPage(req.page, req.subfieldType)

      // testing pipe
      const expectedSequence = [[StatementWithTargetMock.person1HasAppeTeEnWithTarget]]

      q$.pipe(take(1), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);
    });


  })


});
