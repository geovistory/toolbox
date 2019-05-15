import { Injectable } from '@angular/core';
import { LoadingBarActions } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { HasTypeComponent } from '../has-type.component';
import { HasTypeAPIActions, HasTypeAPIAction } from './has-type.actions';
import { ofSubstore } from 'app/core/store/module';
import { SysClassHasTypePropertyApi } from 'app/core/sdk';

@Injectable()
export class HasTypeAPIEpics {
  constructor(
    private modelApi: SysClassHasTypePropertyApi, // <- change the api
    private actions: HasTypeAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: HasTypeComponent): Epic {
    return combineEpics(this.createLoadHasTypeEpic(c));
  }

  private createLoadHasTypeEpic(c: HasTypeComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(HasTypeAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: HasTypeAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.modelApi.readableList() // <- change api call here
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
              c.localStore.dispatch(this.actions.loadSucceeded(data));

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
              c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
