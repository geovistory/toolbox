import { Injectable } from '@angular/core';
import { LoadingBarActions } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { ReprosComponent } from '../repros.component';
import { ReprosAPIActions, ReprosAPIAction } from './repros.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class ReprosAPIEpics {
  constructor(
    // private modelApi: any, // <- change the api
    private actions: ReprosAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: ReprosComponent): Epic {
    return combineEpics(this.createLoadReprosEpic(c));
  }

  private createLoadReprosEpic(c: ReprosComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ReprosAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: ReprosAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
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