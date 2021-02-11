import { Injectable } from '@angular/core';
import { LoadingBarActions } from "projects/app-toolbox/src/app/core/loading-bar/api/loading-bar.actions";
import { NotificationsAPIActions } from 'projects/app-toolbox/src/app/core/notifications/components/api/notifications.actions';
import { ofSubstore } from 'projects/app-toolbox/src/app/core/redux-store/redux-store.module';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { ListComponent } from '../components/list/list.component';
import { ListAPIAction, ListAPIActions } from './list.actions';
import { SearchResponse } from './list.models';
import { WarEntityPreviewControllerService } from 'projects/app-toolbox/src/app/core/sdk-lb4';

@Injectable()
export class ListAPIEpics {
  constructor(
    private entityPreviewApi: WarEntityPreviewControllerService,
    private actions: ListAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationsActions: NotificationsAPIActions
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
          this.entityPreviewApi.warEntityPreviewControllerSearch({
            projectId: action.meta.pkProject,
            searchString: action.meta.searchString,
            pkClasses: action.meta.pkClasses,
            entityType: action.meta.entityType,
            limit: action.meta.limit,
            page: action.meta.page
          })
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
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationsActions.addToast({
                type: 'error',
                options: {
                  title: error.message
                }
              }));

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
