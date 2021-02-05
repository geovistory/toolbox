import { Injectable } from '@angular/core';
import { LoadingBarActions } from "app/core/loading-bar/api/loading-bar.actions";
import { PubAccountApi } from "app/core/sdk";
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { AccountListComponent } from '../account-list.component';
import { AccountListAPIActions, AccountListAPIAction } from './account-list.actions';
import { ofSubstore } from 'app/core/redux-store/redux-store.module';

@Injectable()
export class AccountListAPIEpics {
  constructor(
    private accountApi: PubAccountApi,
    private actions: AccountListAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: AccountListComponent): Epic {
    return combineEpics(this.createLoadAccountListEpic(c));
  }

  private createLoadAccountListEpic(c: AccountListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(AccountListAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: AccountListAPIAction) => new Observable<Action>((globalStore) => {

          globalStore.next(this.loadingBarActions.startLoading());

          this.accountApi.withRolesAndProjects()
            .subscribe((data) => {

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
