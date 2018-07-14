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

import { ClassList } from '../../../admin.models';
import { ClassListAPIActions } from './class-list.actions';
import { ObservableInput, Observable } from 'rxjs/Observable';
import { DfhConfig } from '../../../../information2/shared/dfh-config';




@Injectable()
export class ClassListAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private actions: ClassListAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpic(subStore: ObservableStore<ClassList>) {
    return createEpicMiddleware(this.createLoadClassListEpic(subStore));
  }

  private createLoadClassListEpic(subStore: ObservableStore<ClassList>): Epic<LoadingBarAction, IAppState> {
    return (action$, store) => action$
      .ofType(ClassListAPIActions.LOAD_CLASSES)
      .switchMap(() => new Observable<LoadingBarAction>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());
        this.classApi.selectedClassesOfProfile()
          .subscribe((data: DfhClass[]) => {
            globalStore.next(this.loadingBarActions.completeLoading());
            subStore.dispatch(this.actions.loadSucceeded(data));
          }, error => {
            subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          })
      }))
  }
}
