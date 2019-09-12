import { Injectable } from '@angular/core';
import { LoadingBarActions, WarEntityPreviewApi } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { WarehouseComponent } from '../warehouse.component';
import { WarehouseAPIAction, WarehouseAPIActions } from './warehouse.actions';

@Injectable()
export class WarehouseAPIEpics {
  constructor(
    private entityPreviewApi: WarEntityPreviewApi, // <- change the api
    private actions: WarehouseAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: WarehouseComponent): Epic {
    return combineEpics(this.createLoadWarehouseEpic(c));
  }

  private createLoadWarehouseEpic(c: WarehouseComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(WarehouseAPIActions.CREATE_ALL_ENTITY_PREVIEWS),
        // filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: WarehouseAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.entityPreviewApi.createAll()
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.createAllEntityPreviewsSucceeded(data));

            }, error => {
              /**
              * Emit the global action that shows some loading error message
              */
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: error.message
                }
              }));
              /**
               * Emit the local action on loading failed
               */
              c.localStore.dispatch(this.actions.createAllEntityPreviewsFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
