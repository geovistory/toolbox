import { TestBed } from '@angular/core/testing';

import { ActiveProjectPipesService } from './active-project-pipes.service';
import { ReduxQueriesModule } from '../redux-queries.module';
import { toArray, first } from 'rxjs/operators';
import { IAppStateMock } from '__tests__/helpers/data/IAppStateMock';
import { APP_INITIAL_STATE } from 'app/core/redux-store/redux-store.module';
import { SDKBrowserModule } from 'app/core/sdk';

fdescribe('ActiveProjectPipesService', () => {
  let service: ActiveProjectPipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        ReduxQueriesModule
      ]
    })
    TestBed.overrideProvider(APP_INITIAL_STATE, {
      useValue: IAppStateMock.state1
    })
    service = TestBed.get(ActiveProjectPipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#pkProject$ should return pkProject', (done) => {
    const q$ = service.pkProject$.pipe(first())
    q$.pipe(toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence).toEqual([IAppStateMock.state1.activeProject.pk_project])
        },
        null,
        done);
  });
});
