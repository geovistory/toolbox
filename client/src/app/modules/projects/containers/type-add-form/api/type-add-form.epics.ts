import { Injectable } from '@angular/core';
import { LoadingBarActions } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TypeAddFormComponent } from '../type-add-form.component';
import { TypeAddFormAPIActions, TypeAddFormAPIAction } from './type-add-form.actions';

@Injectable()
export class TypeAddFormAPIEpics {
  constructor(
    // private modelApi: any, // <- change the api
    private actions: TypeAddFormAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: TypeAddFormComponent): Epic {
    return combineEpics(this.createLoadTypeAddFormEpic(c));
  }

  private createLoadTypeAddFormEpic(c: TypeAddFormComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypeAddFormAPIActions.LOAD),
        switchMap((action: TypeAddFormAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
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
          // this.modelApi.selectedClassesOfProfile(null) // <- change api call here
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
