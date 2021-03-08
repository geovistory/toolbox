import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState, SchemaService } from '@kleiolab/lib-redux';
import { moduleImports } from 'projects/lib-queries/src/__tests__/helpers/module-imports';
import { setAppState } from 'projects/lib-queries/src/__tests__/helpers/set-app-state';
import { PK_DEFAULT_CONFIG_PROJECT } from 'projects/__test__/data/auto-gen/gvDB/local-model.helpers';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { BehaviorSubject } from 'rxjs';
import { first, toArray } from 'rxjs/operators';
import { ActiveProjectPipesService } from './active-project-pipes.service';


describe('ActiveProjectPipesService', () => {
  let service: ActiveProjectPipesService;
  let ngRedux: NgRedux<IAppState>;
  let schemaObjServcie: SchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports
    })
    service = TestBed.get(ActiveProjectPipesService);
    ngRedux = TestBed.get(NgRedux);
    schemaObjServcie = TestBed.get(SchemaService);
  });

  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
  describe('.pkProject$', () => {
    it('should return pkProject', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)

      const q$ = service.pkProject$.pipe(first())
      q$.pipe(toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual([IAppStateMock.stateProject1.activeProject.pk_project])
          },
          null,
          done);
    });
  })
  describe('.pipeActiveProject()', () => {
    it('should return ProProject', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeGv(new BehaviorSubject(GvSchemaObjectMock.project1), PK_DEFAULT_CONFIG_PROJECT)
      const q$ = service.pipeActiveProject().pipe(first())
      q$.pipe(toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(GvSchemaObjectMock.project1.pro.project)
          },
          null,
          done);
    });
  })
  describe('.pipeActiveProjectLanguage()', () => {
    it('should return InfLanguage', (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      schemaObjServcie.storeGv(new BehaviorSubject(GvSchemaObjectMock.project1), PK_DEFAULT_CONFIG_PROJECT)
      const q$ = service.pipeActiveDefaultLanguage().pipe(first())
      q$.pipe(toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(GvSchemaObjectMock.project1.inf.language)
          },
          null,
          done);
    });
  })

});
