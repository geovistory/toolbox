import { Injectable } from '@angular/core';
import { LoadingBarActions } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { TypeComponent } from '../type.component';
import { TypeAPIActions, TypeAPIAction } from './type.actions';

@Injectable()
export class TypeAPIEpics {
  constructor(
    // private modelApi: any, // <- change the api
    private actions: TypeAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: TypeComponent): Epic {
    return combineEpics(this.createLoadTypeEpic(c));
  }

  private createLoadTypeEpic(c: TypeComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypeAPIActions.OPEN_MODAL),
        switchMap((action: TypeAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
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
          //         /**
          //   * Emit the global action that shows some loading error message
          //   */
          //  globalStore.next(this.loadingBarActions.completeLoading());
          //  globalStore.next(this.notificationActions.addToast({
          //    type: 'error',
          //    options: {
          //      title: error.message
          //    }
          //  }));         
          //    /**
          //     * Emit the local action on loading failed
          //     */
          //     c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          //   })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  private createLoadTypeEpic(c: TypeComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypeAPIActions.LOAD),
        switchMap((action: TypeAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
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
          //         /**
          //   * Emit the global action that shows some loading error message
          //   */
          //  globalStore.next(this.loadingBarActions.completeLoading());
          //  globalStore.next(this.notificationActions.addToast({
          //    type: 'error',
          //    options: {
          //      title: error.message
          //    }
          //  }));         
          //    /**
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
