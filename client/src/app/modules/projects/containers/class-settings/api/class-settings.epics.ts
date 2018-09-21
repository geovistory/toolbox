import { Injectable } from '@angular/core';
import { LoadingBarActions, DfhClassApi, DfhClass } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ClassSettingsComponent } from '../class-settings.component';
import { ClassSettingsAPIActions, ClassSettingsAPIAction } from './class-settings.actions';

@Injectable()
export class ClassSettingsAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private actions: ClassSettingsAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: ClassSettingsComponent): Epic {
    return combineEpics(this.createLoadClassSettingsEpic(c));
  }

  private createLoadClassSettingsEpic(c: ClassSettingsComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ClassSettingsAPIActions.LOAD),
        switchMap((action: ClassSettingsAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Emit the local action that sets the loading flag to true
           */
          c.localStore.dispatch(this.actions.loadStarted());
          /**
           * Do some api call
           */
          this.classApi.findById(action.meta.dfhPkClass) // <- change api call here
            /**
             * Subscribe to the api call
             */
            .subscribe((data: DfhClass) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(data));

            }, error => {
              /**
               * Emit the global action that shows some loading error message
               */
              // globalStore.next(this.loadingBarActions.completeLoading());
              /**
              * Emit the local action on loading failed
              */
              c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
