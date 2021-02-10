import { Injectable } from '@angular/core';
import { LoadingBarActions } from "projects/toolbox/src/app/core/loading-bar/api/loading-bar.actions";
import { DatNamespace } from "projects/toolbox/src/app/core/sdk";
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { NamespaceListComponent } from '../namespace-list.component';
import { NamespaceListAPIActions, NamespaceListAPIAction } from './namespace-list.actions';
import { DatNamespaceApi } from 'projects/toolbox/src/app/core/sdk';

@Injectable()
export class NamespaceListAPIEpics {
  constructor(
    private namespaceApi: DatNamespaceApi, // <- change the api
    private actions: NamespaceListAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: NamespaceListComponent): Epic {
    return combineEpics(this.createLoadNamespaceListEpic(c));
  }

  private createLoadNamespaceListEpic(c: NamespaceListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(NamespaceListAPIActions.LOAD),
        switchMap((action: NamespaceListAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
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
          this.namespaceApi.find() // <- change api call here
            /**
             * Subscribe to the api call
             */
            .subscribe((data: DatNamespace[]) => {
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
