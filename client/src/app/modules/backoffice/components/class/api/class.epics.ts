import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DfhClass, LoadingBarAction, LoadingBarActions } from 'app/core';
import { DfhClassApi } from 'app/core/sdk/services/custom/DfhClass';
import { Epic, ofType } from 'redux-observable-es6-compat';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ClassDetail } from '../../../backoffice.models';
import { ClassAPIActions } from './class.actions';

@Injectable()
export class ClassAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private actions: ClassAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpic(subStore: ObservableStore<ClassDetail>, until$: Subject<boolean>) {
    return this.createLoadClassEpic(subStore, until$);
  }

  private createLoadClassEpic(subStore: ObservableStore<ClassDetail>, until$: Subject<boolean>): Epic {
    return (action$, store) => action$.pipe(

      ofType(ClassAPIActions.LOAD_CLASS_DETAILS),
      switchMap((action) => new Observable<LoadingBarAction>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());
        this.classApi.findById(action.meta.pkClass)
          .subscribe((data: DfhClass) => {
            globalStore.next(this.loadingBarActions.completeLoading());

            subStore.dispatch(this.actions.loadSucceeded(data));
          }, error => {
            subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          })
      })),
      takeUntil(until$)
    )
  }
}
