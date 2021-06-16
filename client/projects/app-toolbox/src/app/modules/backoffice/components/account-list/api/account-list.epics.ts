import { Injectable } from '@angular/core';
import { LoadingBarActions, NotificationsAPIActions, ofSubstore } from '@kleiolab/lib-redux';
import { PubAccountApi } from '@kleiolab/lib-sdk-lb3';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { AccountListComponent } from '../account-list.component';
import { AccountListAPIAction, AccountListAPIActions } from './account-list.actions';

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

          globalStore.next(this.loadingBarActions.addJob());

          this.accountApi.withRolesAndProjects()
            .subscribe((data) => {

              globalStore.next(this.loadingBarActions.removeJob());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(data));

            }, error => {
              /**
              * Emit the global action that shows some loading error message
              */
              globalStore.next(this.loadingBarActions.removeJob());
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
