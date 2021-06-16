import { Injectable } from '@angular/core';
import { LoadingBarActions } from '@kleiolab/lib-redux';
import { SysSystemType, SysSystemTypeApi } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SystemTypeListComponent } from '../system-type-list.component';
import { SystemTypeListAPIAction, SystemTypeListAPIActions } from './system-type-list.actions';

@Injectable()
export class SystemTypeListAPIEpics {
  constructor(
    private systemtypeApi: SysSystemTypeApi, // <- change the api
    private actions: SystemTypeListAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: SystemTypeListComponent): Epic {
    return combineEpics(this.createLoadSystemTypeListEpic(c));
  }

  private createLoadSystemTypeListEpic(c: SystemTypeListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SystemTypeListAPIActions.LOAD),
        switchMap((action: SystemTypeListAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.addJob());
          /**
           * Emit the local action that sets the loading flag to true
           */
          c.localStore.dispatch(this.actions.loadStarted());
          /**
           * Do some api call
           */
          this.systemtypeApi.find() // <- change api call here
            /**
             * Subscribe to the api call
             */
            .subscribe((data: SysSystemType[]) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.removeJob());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(data));

            }, error => {
              /**
               * Emit the global action that shows some loading error message
               */
              globalStore.next(this.loadingBarActions.removeJob());
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
