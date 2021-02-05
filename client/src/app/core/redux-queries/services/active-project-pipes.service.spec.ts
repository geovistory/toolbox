import { TestBed } from '@angular/core/testing';

import { ActiveProjectPipesService } from './active-project-pipes.service';
import { ReduxQueriesModule } from '../redux-queries.module';
import { toArray, first } from 'rxjs/operators';
import { IAppStateMock } from '__tests__/helpers/data/IAppStateMock';
import { APP_INITIAL_STATE } from 'app/core/redux-store/redux-store.module';
import { SDKBrowserModule } from 'app/core/sdk';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/core';
import { SchemaObjectService } from 'app/core/redux-store/schema-object.service';
import { setAppState } from '__tests__/helpers/set-app-state';
import { BehaviorSubject } from 'rxjs';
import { project1 } from '__tests__/helpers/data/positive-schema-objects/project-1';
import { fieldsOfManifestationSingleton } from '__tests__/helpers/data/positive-schema-objects/fields-of-manifestation-singleton';
import { PK_DEFAULT_CONFIG_PROJECT } from '__tests__/helpers/data/auto-gen/local-model.helpers';

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
  fdescribe('#pipeActiveProject', () => {
    fit('should return ProProject', (done) => {
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
      const q$ = service.pipeActiveProject().pipe(first())
      q$.pipe(toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual([project1.pro[0]])
          },
          null,
          done);
    });
  })

});
