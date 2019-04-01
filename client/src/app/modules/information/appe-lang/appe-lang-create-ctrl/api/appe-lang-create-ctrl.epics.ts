import { Injectable } from '@angular/core';
import { LoadingBarActions } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AppeLangCreateCtrlComponent } from '../appe-lang-create-ctrl.component';
import { AppeLangCreateCtrlAPIActions, AppeLangCreateCtrlAPIAction } from './appe-lang-create-ctrl.actions';

@Injectable()
export class AppeLangCreateCtrlAPIEpics {
  constructor(
    // private modelApi: any, // <- change the api
    private actions: AppeLangCreateCtrlAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: AppeLangCreateCtrlComponent): Epic {
    return combineEpics(this.createLoadAppeLangCreateCtrlEpic(c));
  }

  private createLoadAppeLangCreateCtrlEpic(c: AppeLangCreateCtrlComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(AppeLangCreateCtrlAPIActions.LOAD),
        switchMap((action: AppeLangCreateCtrlAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
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
          // this.modelApi.classesOfProfile(null) // <- change api call here
          //   /**
          //    * Subscribe to the api call
          //    */
          //   .subscribe((data) => {
          //     /**
          //      * Emit the global action that completes the loading bar
          //      */
          //     globalStore.next(this.loadingBarActions.completeLoading());
          //     /**
          //      * Emit the local action on loading succeeded
          //      */
          //     c.localStore.dispatch(this.actions.loadSucceeded(data));

          //   }, error => {
          //     /**
          //      * Emit the global action that shows some loading error message
          //      */
          //     // globalStore.next(this.loadingBarActions.completeLoading());
          //     /**
          //     * Emit the local action on loading failed
          //     */
          //     c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          //   })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
