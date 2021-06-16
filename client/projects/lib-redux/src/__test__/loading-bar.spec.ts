import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { moduleImports } from 'projects/lib-queries/src/__tests__/helpers/module-imports';
import { take, toArray } from 'rxjs/operators';
import { IAppState, LoadingBarActions } from '../lib/redux-store/public-api';

describe('Loading Bar Actions', () => {
  let ngRedux: NgRedux<IAppState>;
  let loadingBarActions: LoadingBarActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports
    });
    loadingBarActions = TestBed.inject(LoadingBarActions);
    ngRedux = TestBed.inject(NgRedux);
  });

  it('should init running-jobs-count with 0', (done) => {
    const q$ = ngRedux.select<number>(['loadingBar', 'runningJobsCount']);
    q$.pipe(take(1), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence[0]).toBe(0)
        },
        null,
        done);
  });



  it('should increase and decrease the running-jobs-count', (done) => {
    const q$ = ngRedux.select<number>(['loadingBar', 'runningJobsCount']);

    q$.pipe(take(5), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence[0]).toBe(0)
          expect(actualSequence[1]).toBe(1)
          expect(actualSequence[2]).toBe(2)
          expect(actualSequence[3]).toBe(1)
          expect(actualSequence[4]).toBe(0)
        },
        null,
        done);
    loadingBarActions.addJob()
    loadingBarActions.addJob()
    loadingBarActions.removeJob()
    loadingBarActions.removeJob()
  });


})
