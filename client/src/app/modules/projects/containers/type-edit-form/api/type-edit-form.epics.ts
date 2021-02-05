import { Injectable } from '@angular/core';
import { LoadingBarActions } from "app/core/loading-bar/api/loading-bar.actions";
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TypeEditFormComponent } from '../type-edit-form.component';
import { TypeEditFormAPIActions, TypeEditFormAPIAction } from './type-edit-form.actions';

@Injectable()
export class TypeEditFormAPIEpics {
  constructor(
    // private modelApi: any, // <- change the api
    private actions: TypeEditFormAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: TypeEditFormComponent): Epic {
    return combineEpics(this.createLoadTypeEditFormEpic(c));
  }

  private createLoadTypeEditFormEpic(c: TypeEditFormComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypeEditFormAPIActions.LOAD),
        switchMap((action: TypeEditFormAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
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
