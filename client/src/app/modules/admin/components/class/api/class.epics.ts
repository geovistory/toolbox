import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';

import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LoadingBarActions, LoadingBarAction, DfhClass } from 'app/core';
import { DfhClassApi } from 'app/core/sdk/services/custom/DfhClass';
import { IAppState } from 'app/core/store/model';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { ClassDetail } from '../../../admin.models';
import { ObservableInput, Observable } from 'rxjs/Observable';
import { ClassAPIActions, ClassAPIAction } from './class.actions';




@Injectable()
export class ClassAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private actions: ClassAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpic(subStore: ObservableStore<ClassDetail>) {
    return createEpicMiddleware(this.createLoadClassEpic(subStore));
  }

  private createLoadClassEpic(subStore: ObservableStore<ClassDetail>): Epic<FluxStandardAction<any, any>, IAppState> {
    return (action$, store) => action$
      .ofType(ClassAPIActions.LOAD_CLASS_DETAILS)
      .switchMap((action) => new Observable<LoadingBarAction>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());
        this.classApi.findById(action.meta.pkClass)
          .subscribe((data: DfhClass) => {
            globalStore.next(this.loadingBarActions.completeLoading());
            
            subStore.dispatch(this.actions.loadSucceeded(data));
          }, error => {
            subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          })
      }))
  }
}
