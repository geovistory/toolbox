import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DfhClass, LoadingBarActions } from 'app/core';
import { DfhClassApi } from 'app/core/sdk/services/custom/DfhClass';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import * as Config from '../../../../../../../../common/config/Config';
import { ClassList } from '../../../backoffice.models';
import { createDfhLabelListEdit } from '../../dfh-label-list-edit/dfh-label-list-edit.component';
import { ClassListAPIActions } from './class-list.actions';

@Injectable()
export class ClassListAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private actions: ClassListAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpic(
    subStore: ObservableStore<ClassList>, until$: Subject<boolean>
  ): Epic {
    return combineEpics(this.createLoadClassListEpic(subStore, until$));
  }

  private createLoadClassListEpic(
    subStore: ObservableStore<ClassList>,
    until$: Subject<boolean>
  ): Epic {
    return (action$, store) => {
      const x = action$;
      return action$.pipe(
        ofType(ClassListAPIActions.LOAD_CLASSES),
        switchMap(() => new Observable<FluxStandardAction<any>>((globalStore) => {
          globalStore.next(this.loadingBarActions.startLoading());
          this.classApi.classesOfProfile(null)
            .subscribe((data: DfhClass[]) => {
              globalStore.next(this.loadingBarActions.completeLoading());

              const classes = data.map(cla => ({
                ...cla,
                labels: createDfhLabelListEdit(cla.labels,  Config.CLASS_LABEL, 18889)
              }))

              subStore.dispatch(this.actions.loadSucceeded(classes));
            }, error => {
              subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(until$)
      )
    }
  }
}
