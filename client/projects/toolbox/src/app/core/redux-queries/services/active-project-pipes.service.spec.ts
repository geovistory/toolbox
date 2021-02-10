import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState } from 'projects/toolbox/src/app/core/redux-store/model';
import { SchemaObjectService } from 'projects/toolbox/src/app/core/redux-store/schema-object.service';
import { SDKBrowserModule } from 'projects/toolbox/src/app/core/sdk';
import { BehaviorSubject } from 'rxjs';
import { first, toArray } from 'rxjs/operators';
import { PK_DEFAULT_CONFIG_PROJECT } from '__tests__/helpers/data/auto-gen/local-model.helpers';
import { IAppStateMock } from '__tests__/helpers/data/IAppStateMock';
import { project1 } from '__tests__/helpers/data/positive-schema-objects/project-1';
import { setAppState } from '__tests__/helpers/set-app-state';
import { ReduxQueriesModule } from '../redux-queries.module';
import { ActiveProjectPipesService } from './active-project-pipes.service';


describe('ActiveProjectPipesService', () => {
  let service: ActiveProjectPipesService;
  let ngRedux: NgRedux<IAppState>;
  let schemaObjServcie: SchemaObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        ReduxQueriesModule
      ]
    })
    service = TestBed.get(ActiveProjectPipesService);
    ngRedux = TestBed.get(NgRedux);
    schemaObjServcie = TestBed.get(SchemaObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#pkProject$', () => {
    it('should return pkProject', (done) => {
      setAppState(ngRedux, IAppStateMock.state1)

      const q$ = service.pkProject$.pipe(first())
      q$.pipe(toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual([IAppStateMock.state1.activeProject.pk_project])
          },
          null,
          done);
    });
  })
  describe('#pipeActiveProject', () => {
    it('should return ProProject', (done) => {
      setAppState(ngRedux, IAppStateMock.state1)
      schemaObjServcie.storeGv(new BehaviorSubject(project1), PK_DEFAULT_CONFIG_PROJECT)
      console.log(JSON.stringify(ngRedux.getState().pro))
      const q$ = service.pipeActiveProject().pipe(first())
      q$.pipe(toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(project1.pro.project)
          },
          null,
          done);
    });
  })
  describe('#pipeActiveProjectLanguage', () => {
    it('should return InfLanguage', (done) => {
      setAppState(ngRedux, IAppStateMock.state1)
      schemaObjServcie.storeGv(new BehaviorSubject(project1), PK_DEFAULT_CONFIG_PROJECT)
      const q$ = service.pipeActiveDefaultLanguage().pipe(first())
      q$.pipe(toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(project1.inf.language)
          },
          null,
          done);
    });
  })

});
