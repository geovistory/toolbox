import { Injectable } from '@angular/core';
import {  LoadingBarActions, WarEntityPreviewApi } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { PeItSearchExistingComponent } from '../pe-it-search-existing.component';
import { PeItSearchExistingAPIAction, PeItSearchExistingAPIActions } from './pe-it-search-existing.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class PeItSearchExistingAPIEpics {
  constructor(
    private entityPreviewApi: WarEntityPreviewApi,
    private actions: PeItSearchExistingAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: PeItSearchExistingComponent): Epic {
    return combineEpics(this.createLoadPeItSearchExistingEpic(c));
  }

  private createLoadPeItSearchExistingEpic(c: PeItSearchExistingComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(PeItSearchExistingAPIActions.SEARCH),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: PeItSearchExistingAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.entityPreviewApi.searchExisting(action.meta.pkProject, action.meta.searchString, [action.meta.pkClass], null, action.meta.limit, action.meta.page)
            /**
               * Subscribe to the api call
               */
            .subscribe((data) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());

              const persistentItems = data.data;
              const collectionSize = parseInt(data.totalCount, 10);
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.searchSucceeded(persistentItems, collectionSize));

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
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
