import { Injectable } from '@angular/core';
import { LoadingBarActions, ComQueryApi } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { QueryListComponent } from '../query-list.component';
import { QueryListAPIActions, QueryListAPIAction } from './query-list.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class QueryListAPIEpics {
  constructor(
    private comQuery: ComQueryApi,
    private actions: QueryListAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: QueryListComponent): Epic {
    return combineEpics(this.createLoadQueryListEpic(c));
  }

  private createLoadQueryListEpic(c: QueryListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(QueryListAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: QueryListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.comQuery.findPerProject(action.meta.pkProject, action.meta.limit, action.meta.offset) // <- change api call here
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
