import { Injectable } from '@angular/core';
import { LoadingBarActions, InfPersistentItemApi } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { ListComponent } from '../list.component';
import { ListAPIActions, ListAPIAction } from './list.actions';
import { ofSubstore } from 'app/core/store/module';
import { SearchResponse } from '../../information/api/information.models';

@Injectable()
export class ListAPIEpics {
  constructor(
    private peItApi: InfPersistentItemApi,
    private actions: ListAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: ListComponent): Epic {
    return combineEpics(this.createSearchEpic(c));
  }

  private createSearchEpic(c: ListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ListAPIActions.SEARCH),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: ListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Emit the local action that sets the loading flag to true
           */
          c.localStore.dispatch(this.actions.searchStarted());
          /**
           * Do some api call
           */
          this.peItApi.searchInProject(action.meta.pkProject, action.meta.searchString, action.meta.pkClasses, action.meta.limit, action.meta.page)
            /**
             * Subscribe to the api call
             */
            .subscribe((data: SearchResponse) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.searchSucceeded(data));

            }, error => {
              /**
               * Emit the global action that shows some loading error message
               */
              // globalStore.next(this.loadingBarActions.completeLoading());
              /**
              * Emit the local action on loading failed
              */
              c.localStore.dispatch(this.actions.searchFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

}
